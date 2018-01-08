import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';

import ObservableListStore from '../../utils/Store';

import Loader from './helpers/loader';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import FirebaseLinks from '../../firebaseContext/firebase_links';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';
import PartsList from './ui_components/PartsList';

export default class BodyMeasurementMusclePartScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      database: myFirebase,
      maleParts: FirebaseLinks.maleBodyParts,
      femaleParts: FirebaseLinks.femaleBodyParts,
      spiner: true,
      parts: [],
      appIsReady: false
    };
  }

  componentWillMount() {
    const items = [];

    I18n.initAsync();
    this.setState({ appIsReady: true });

    const isMale = ObservableListStore.user.gender === 'Male';

    this.state[isMale ? 'maleParts' : 'femaleParts'].on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const snap = childSnapshot.val();

        items.push({
          name: snap.name,
          img: snap.img
        });
      });

      this.setState({
        parts: items,
        spiner: false
      });
    });
  }

  naviToPage = (stackPage, data) => {
    this.props.navigation.navigate(stackPage, { data });
  }

  clickRedirect = ({ name }) => {
    ObservableListStore.muscPartName = name;
    this.naviToPage('BodyPartStatistics', ObservableListStore.muscPartName);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='measurement' label='body_parts.body_parts' />

          <Loader activate={this.state.spiner} />

          <PartsList
            label = 'body_parts'
            items = {this.state.parts}
            onPressItem = {this.clickRedirect}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
