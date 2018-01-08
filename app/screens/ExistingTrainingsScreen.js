 import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';

@observer
export default class ExistingTrainings extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      appIsReady: false,
      email: myFirebase.auth().currentUser.providerData[0].email,
      dataSource: null
    };

    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.email);

    this.itemsRef = myFirebase.database().ref().child(`userTrainings/${emailReplaced}`);
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      const items = [];


      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          timestamp: child.val().timestamp,
          _key: child.key
        });
      });

      this.setState({
        dataSource: items
      });
    });
  }


  // Add item to firebase
  addItem(item) {
    this.itemsRef.push(item);
  }

  // Add item to firebase
  deleteItem(item) {
    // alert(JSON.stringify(item._key));
    this.itemsRef.child(item._key).remove();
  }

  _goToCalendar = (item) => {
    ObservableListStore.trainings = item;
    this.props.navigation.navigate('CalendarOfCreated', { item });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='existingTraining' label='existing_trainings.existing_trainings' />

          {this.state.dataSource
            ? (
              <PlainList
                dataSource={this.state.dataSource}
                keys = {{
                  key: 'name',
                  title: 'name',
                  subtitle: 'city',
                  avatar: 'avatar_url'
                }}
                onPressItem = {this._goToCalendar}
              />
            )
            : null
          }

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
