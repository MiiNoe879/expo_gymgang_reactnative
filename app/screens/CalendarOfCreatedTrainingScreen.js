import React from 'react';
import { View, ScrollView, Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';
import moment from 'moment';

import ObservableListStore from '../../utils/Store';

import myFirebase from '../../connection.js';

import styles from '../../styles.js';

import HeaderIcon from '../components/shared/HeaderIcon.js';

import Calendar from './ui_components/Calendar';
import Button from './ui_components/Button';
import Badge from './ui_components/Badge';
import IconButton from './ui_components/IconButton';

@observer
export default class CalendarOfCreatedTraining extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      exName: ObservableListStore.trainings.name || '',
      trainings: ObservableListStore.trainings,
      email: '',
      appIsReady: false,
      markedDates: ObservableListStore.trainings && ObservableListStore.trainings.timestamp ? this.getMarkedDates() : {},
      trainingKey: (this.props.navigation.state.params ? this.props.navigation.state.params.item._key : null),
      current: {}
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  componentDidMount() {
    const currentDate = { [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`]: { selected: true } };

    myFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          email: user.email,
          markedDates: this.state.markedDates || currentDate
        });
      } else {
        // No user is signed in.
      }
    });
  }

  getMarkedDates = () => {
    const timestamp = {};

    ObservableListStore.trainings.timestamp.forEach(date => timestamp[moment(date).format('YYYY-MM-DD')] = { selected: true });

    return timestamp;
  }

  markDate(day) {
    this.setState({ current: day });
    const dateStr = day.dateString;
    const obj = this.state.markedDates || {};

    if (obj.hasOwnProperty(dateStr)) {
      delete obj[day.dateString];
    } else {
      obj[dateStr] = { selected: true };
    }

    this.setState({
      markedDates: obj
    });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  _saveTraining() {
    const arr = this.state.trainings;
    const keys = Object.keys(this.state.markedDates);
    const trainingName = this.state.exName;

    if (trainingName !== '' && keys.length) {
      ObservableListStore.trainings = {};

      const data = {
        name: trainingName,
        timestamp: [],
        training: (arr)
      };

      for (let i = 0; i < keys.length; i++) {
        data.timestamp.push(new Date(keys[i]).getTime());
      }

      if (this.props.navigation.state.params) {
        const { trainingKey } = this.state;

        data = data.timestamp;
        myFirebase.database().ref(`userTrainings/${this.encodeAsFirebaseKeySimple(this.state.email)}/${trainingKey}`).child('timestamp').set(JSON.parse(JSON.stringify(data)));
      } else {
        myFirebase.database().ref(`userTrainings/${this.encodeAsFirebaseKeySimple(this.state.email)}`).push(JSON.parse(JSON.stringify(data)));
      }

      this.props.navigation.navigate('WorkOutNotes');
    } else {
      Alert.alert(
        'Notice',
        keys.length ? 'Training name cannot be blank' : 'Please, choose the dates of training'
      );
    }
  }

  _removeTraining = () => {
    Alert.alert(
      I18n.t('existing_trainings.training_removal'),
      I18n.t('existing_trainings.removal_confirmation'),
      [
        { text: I18n.t('train_together.no'), onPress: () => console.log(''), style: 'cancel' },
        { text: I18n.t('train_together.yes'), onPress: () => this._proceedRemoval() }
      ],
      { cancelable: true }
    );
  }

  _proceedRemoval = () => {
    const { trainingKey } = this.state;

    myFirebase.database().ref(`userTrainings/${this.encodeAsFirebaseKeySimple(this.state.email)}`).child(trainingKey).remove();
    this.props.navigation.goBack();
  }

  _editTraining = () => {
    const { trainingKey } = this.state;
    const training = myFirebase.database().ref(`userTrainings/${this.encodeAsFirebaseKeySimple(this.state.email)}/${trainingKey}`);

    training.once('value', (snap) => {
      const item = snap.val();

      item._key = trainingKey;
      console.log(snap);
      this.props.navigation.navigate('CreateNewTraining', { training: item });
    });
  }

  render() {
    const errorMessage = null;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='calendar' label='calendar_of_training.calendar_of_training' />

          <View style={innerStyle.removeBtn}>
            <IconButton
              type='remove'
              label={I18n.t('existing_trainings.remove_training')}
              onPress={this._removeTraining}
            />
          </View>
          <View style={innerStyle.editBtn}>
            <IconButton
              type='edit'
              label={I18n.t('existing_trainings.edit_training')}
              onPress={this._editTraining}
            />
          </View>

          <View style={styles.header}>
            <FormLabel labelStyle={styles.labelHeader}>{I18n.t('calendar_of_training.training_name')}</FormLabel>
            <FormInput
              keyboardType={'email-address'} keyboardAppearance='light' returnKeyType={'next'}
              onChangeText={(text) => {
                this.setState({ exName: text });
              }} value={this.state.exName} autoFocus
              underlineColorAndroid={'#A07CEB'} selectionColor={'#A07CEB'} inputStyle={{ color: '#fff', textAlign: 'center' }}
            />
            <FormValidationMessage>{errorMessage}</FormValidationMessage>
          </View>

          {/* CALENDAR */}
          <Calendar
            markedDates={this.state.markedDates}
            onDayPress={(day) => {
              this.markDate(day);
            }}
            minDate = {new Date()}
            current={this.state.current}
          />
        </ScrollView>

        <Button
          label='buttons.save'
          onPress={() => this._saveTraining()}
        />
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;

const innerStyle = StyleSheet.create({
  iconButtons:{
    position: 'absolute',
    top: 90,
    flexDirection: 'row'
  },
  editBtn:{
    position: 'absolute',
    top: 90,
    right: 5,
    flexDirection: 'row'
  },
  removeBtn:{
    position: 'absolute',
    top: 90,
    left: 5,
    flexDirection: 'row'
  }
});
