import React, { Component } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import AvatarSubInfo from '../components/AvatarSubInfo';
import HeaderIcon from '../components/shared/HeaderIcon';
import ListIcon from '../components/shared/ListIcon.js';

import ObservableListStore from '../../utils/Store';

import myFirebase from '../../connection.js';

import styles from '../../styles.js';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

import { getWorkoutMenuItems } from './data/menuItems.js';

@observer
export default class WorkoutNotesScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    ObservableListStore.muscExercises = [];
    ObservableListStore.funcExercises = [];
    ObservableListStore.cardExercises = [];

    this.state = {
      name: '',
      email: '',
      avatar: '',
      appIsReady: false,
      userfullname: '',
      birthday: '',
      picturePath: '',
      gender: '',
      isMale: true,
      loggedIn: false,
      loaded: false
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });

    this.setState({
      ...ObservableListStore.user,
      email: ObservableListStore.email,
      isMale: ObservableListStore.user.gender === 'Male',
      loggedIn: true,
      loaded: true
    });

    myFirebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        });
      }
    });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  render() {
    const { navigate } = this.props.navigation;
    const trainingOptions = getWorkoutMenuItems(navigate);

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <BackgroundImage />

          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => navigate('NotificationList')} />

          {/* AVATAR HEADER */}
          <AvatarSubInfo />

          <Badge type='workout' label='workout_notes.workout_notes' top={160} />

          {/* 4X GRID BUTTONS  */}
          <View style={styles.gridLayout}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {trainingOptions.map(training => (<ListIcon key={training.text} {...training} />))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
