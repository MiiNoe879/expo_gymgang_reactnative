import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { observer } from 'mobx-react/native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';


import AvatarSubInfo from '../components/AvatarSubInfo';
import HeaderIcon from '../components/shared/HeaderIcon.js';
import ListIcon from '../components/shared/ListIcon.js';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import Button from './ui_components/Button';
import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

import { getCreateExerciseMenuItems } from './data/menuItems.js';
import myFirebase from '../../connection';
import FirebaseService from '../services/FirebaseService';

@observer
export default class CreateNewTrainingScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      muscle: ObservableListStore.muscExercises.length,
      functional: ObservableListStore.funcExercises.length,
      cardio: ObservableListStore.cardExercises.length,
      userfullname: '',
      birthday: '',
      picturePath: '',
      gender: '',
      name: '',
      email: '',
      avatar: '',
      appIsReady: false,
      training: 0,
      readOnly: ObservableListStore.readOnly,
      editedTrainingKey: null
    };
    this.getExistingTraining();

  }

  async componentWillMount() {
    await I18n.initAsync();


    this.setState({
      ...ObservableListStore.user,
      email: ObservableListStore.email,
      isMale: ObservableListStore.user.gender === 'Male',
      appIsReady: true
    });
  }

  refreshTraining() {
    ObservableListStore.trainings.muscleExercises = [ ...ObservableListStore.muscExercises ];
    ObservableListStore.trainings.functionalExercises = [ ...ObservableListStore.funcExercises ];
    ObservableListStore.trainings.cardioExercises = [ ...ObservableListStore.cardExercises ];
  }

  _createTraining() {
    const { muscExercises, funcExercises, cardExercises } = ObservableListStore;
    const muscle = muscExercises.length;
    const cardio = cardExercises.length;
    const functional = funcExercises.length;
    const editedTrainingKey = ObservableListStore.editedTrainingKey
    if (muscle === 0 && cardio === 0 && functional === 0) {
      Alert.alert(`${I18n.t('alerts.blank_training')}`);
    } else if (editedTrainingKey) {
      this.refreshTraining();
      training = ObservableListStore.trainings
      delete training._key
      console.log('tttt',training)
      myFirebase.database().ref(`userTrainings/${FirebaseService.encodedEmail()}`).child(editedTrainingKey).set(JSON.parse(JSON.stringify(training)));
      ObservableListStore.editedTrainingKey = null;
      this.props.navigation.navigate('WorkOutNotes');
    } else {
      this.refreshTraining();
      this.props.navigation.navigate('CalendarOfCreated');
    }
  }

  getExistingTraining = () => {
    console.log('nav', this.props.navigation)
    if (!this.props.navigation.state.params) {
      return;
    }
    const training = this.props.navigation.state.params.training;
    ObservableListStore.editedTrainingKey = training._key;
    ObservableListStore.muscExercises = training.muscleExercises || [];
    ObservableListStore.funcExercises = training.functionalExercises || [];
    ObservableListStore.cardExercises = training.cardioExercises || [];
  }

  render() {
    const { navigate } = this.props.navigation;
    const { readOnly } = this.state;
    const { muscExercises, funcExercises, cardExercises } = ObservableListStore;
    const muscle = muscExercises.length;
    const cardio = cardExercises.length;
    const functional = funcExercises.length;
    const training = {
      muscleExercises: muscExercises || [],
      cardioExercises: cardExercises || [],
      functionalExercises: funcExercises || []
    };

    const trainingOptions = getCreateExerciseMenuItems(navigate, { readOnly, muscle, cardio, functional, training });

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>

          <BackgroundImage />

          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <AvatarSubInfo />

          <Badge type='training' label='create_training.create_training' top={160} />

          {/* 4X GRID BUTTONS  */}
          <View style={[ styles.gridLayout, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 42 } ]}>
            {trainingOptions.map(trainingItem => (<ListIcon key={trainingItem.text} {...trainingItem} />))}
          </View>

          <Button
            label= 'create_training.save_training'
            onPress={() => this._createTraining()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
