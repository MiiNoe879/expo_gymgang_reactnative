import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import Loader from './helpers/loader';

import styles from '../../styles.js';
import myFirebase from '../../connection.js';
import FirebaseLinks from '../../firebaseContext/firebase_links';

import ObservableListStore from '../../utils/Store';

import HeaderIcon from '../components/shared/HeaderIcon';

import Button from './ui_components/Button';
import Badge from './ui_components/Badge';
import PartsList from './ui_components/PartsList';

export default class DisciplinesScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired

  }

  constructor(props) {
    super(props);
    this.itemsRef = myFirebase.database().ref('disciplines');

    this.state = {
      database: myFirebase,
      // muscleParts: FirebaseLinks.muscleParts,
      disciplines: FirebaseLinks.disciplines,
      email: this.encodeAsFirebaseKeySimple(myFirebase.auth().currentUser.providerData[0].email),
      spiner: true,
      parts: [],
      SelectedDisciplines: [],
      appIsReady: false
    };
  }


  componentWillMount() {
    const items = [];
    let item = {};

    I18n.initAsync();
    this.setState({ appIsReady: true });
    this.state.disciplines.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const snap = childSnapshot.val();
        const name = snap.name.toLowerCase();

        item = {};

        item[name] = {
          name,
          imgUnchecked: snap.img_unchecked,
          imgChecked: snap.img_checked,
          checked: false
        };
        item.name = name;
        items.push(item);
      });

      FirebaseLinks.users.child(this.state.email).once('value', (snap) => {
        const selected = snap.val().selectedSports.split(',').map((str) => {
          return str.toLowerCase();
        });

        let parts = [];

        parts = items.map((part) => {
          const partName = this.getPrimaryKey(part);

          return selected.includes(partName)
            ? { [partName]: { ...part[partName], checked: true } }
            : part;
        });

        this.setState({ parts });
      });
    });
  }

  componentDidMount() {
    this.setLoaded();
  }

  setLoaded = () => {
    this.setState({
      spiner: false
    });
  }

  getPrimaryKey(obj) {
    return Object.keys(obj)[0];
  }

  getNavigationParams() {
    return this.props.navigation.state.params || {};
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  naviToPage = (stackPage, data) => {
    this.props.navigation.navigate(stackPage, { data });
  }

  clickRedirect = () => {
    this.naviToPage('Dashboard');
  }

  selectToggle = (data) => {
    const { parts } = this.state;
    const toRep = parts.indexOf(data);
    const partName = this.getPrimaryKey(data);

    parts[toRep][partName].checked = !(parts[toRep][partName].checked);

    this.setState({ parts });
  }

  isChecked = (item) => {
    const data = item[this.getPrimaryKey(item)];

    return data.checked ? data.imgChecked : data.imgUnchecked;
  }

  addDisciplineKey() {
    const checked = this.state.parts.filter((item) => {
      return item[this.getPrimaryKey(item)].checked;
    }).map((item) => {
      return this.getPrimaryKey(item);
    }).join(',');

    const updates = { '/selectedSports': checked };

    ObservableListStore.updateUserData({ selectedSports: checked });

    FirebaseLinks.users.child(this.state.email).update(updates);
    this.clickRedirect();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='disciplines' label='disciplines.disciplines' />

          <Loader activate={this.state.spiner} />

          <PartsList
            label = 'disciplines'
            items = {this.state.parts}
            handleImage = {this.isChecked}
            onPressItem = {this.selectToggle}
          />

          {/* FOOTER */}
          <View style={styles.footer}>
            <Button
              label= 'buttons.save'
              onPress={() => {
                this.addDisciplineKey();
              }}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
