import React from 'react';
import { View, ScrollView, Alert, KeyboardAvoidingView, FlatList } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import Loader from './helpers/loader';

import myFirebase from '../../connection.js';

import styles from '../../styles.js';

import HeaderIcon from '../components/shared/HeaderIcon';

import Calendar from './ui_components/Calendar';
import Button from './ui_components/Button';
import Badge from './ui_components/Badge';
import moment from 'moment';

@observer
export default class CalendarOfTraining extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.itemsRef = myFirebase.database().ref('functionalExericises');

    this.state = {
      trainings: '',
      email: myFirebase.auth().currentUser.providerData[0].email,
      isModalVisible: false,
      appIsReady: false,
      markedDates: {},
      dataSource: [],
      trainByDate: [],
      spiner: true
    };
  }

  componentWillMount() {
    this.setState({
      email: myFirebase.auth().currentUser.providerData[0].email
    });

    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.email);

    myFirebase.database().ref(`userTrainings/${emailReplaced}`).once('value', (snapshot) => {
      const obj = {};
      const trainbyDate = [];

      snapshot.forEach((childSnapshot) => {
        const snap = childSnapshot.val();
        const timestamp = (snap.createTimeStamp || {}).timestamp || snap.timestamp;

        for (let i = 0; i < timestamp.length; i++) {
          const timestampValue = timestamp[i];
          const date = moment(timestampValue).format('YYYY-MM-DD');

          obj[date] = { marked: true };
        }

        trainbyDate.push(snap);

        if (Array.isArray(snap.muscleExercises)) {
          this.setState({
            muscExercises: snap.muscleExercises
          });
        }

        if (Array.isArray(snap.functionalExercises)) {
          this.setState({
            funcExercises: snap.functionalExercises
          });
        }

        if (Array.isArray(snap.cardioExercises)) {
          this.setState({
            cardExercises: snap.cardioExercises
          });
        }
      });

      this.setState({
        markedDates: obj,
        trainByDate: trainbyDate,
        spiner: false
      });
    });
  }

  componentWillReceiveProps() {
    this.setState({
      markedDates: this.state.markedDates
    });
  }

  parseTimeStamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    let month = date.getMonth();
    // var day = date.getDay()
    let day = date.getUTCDate();

    if (month < 10) {
      month = `0${  month}`;
    }

    if (day < 10) {
      day = `0${  day}`;
    }

    return (`${year}-${Number(month) + 1}-${day}`);
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  _onPressExercise = (item) => {
    Alert.alert(JSON.stringify(item));
  }

  _onDayPress = (day) => {
    // var data = this.state.trainByDate.filter((item) => { return (item.timestamp.includes(day.timestamp)) })
    const data = this.state.trainByDate.filter((item) => {
      return String((item.createTimeStamp || {}).timestamp || item.timestamp).includes(day.timestamp);
    });

    console.log(data);
    if (data.length > 0) {
      this.setState({
        dataSource: data
      });
      this._showModal();
    }
  }

  _renderItem = ({ item }) => (
    <View style={{ backgroundColor: '#60449A', borderRadius: 25, marginBottom: 7 }}>
      <ListItem
        roundAvatar
        title={item.name}
        onPress={() => {
          this._goToExerciseList(item);
        }}
        wrapperStyle={{ borderColor: '#A07CEB' }}
        chevronColor={'#fff'}
        titleStyle={{ color: '#fff', fontSize: 15 }}
        subtitleStyle={{ color: '#A07CEB' }}
      />

      <View style={{ padding: 16 }}>
        {this.renderExercisesList(item.training)}
      </View>
    </View>
  );

  _goToExerciseList = (item) => {
    this._hideModal();
    this.props.navigation.navigate('CreateNewTraining', { training: item.training });
  }

  renderExercisesList = (training) => {
    const exercises = [];
    const trainingTypes = Object.keys(training);

    trainingTypes.forEach(type =>
      Array.isArray(training[type]) && training[type].forEach(exercise => exercises.push(exercise.exerciseName)));

    return exercises.map(item => {
      const exercise = item.name === undefined ? item : item.name;

      return (<View key={exercise} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 4, height: 4, marginTop: 4, borderRadius: 2, backgroundColor: 'white', marginRight: 8 }} />
        <Text style={{ color: 'white', paddingTop: 8 }}>{exercise}</Text>
      </View>);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' resetScrollToCoords={{ x: 0, y: 0 }} style={styles.container}>
        {/* MODAL */}
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            {/* LIST */}
            <FlatList
              data={this.state.dataSource}
              renderItem={this._renderItem}
              style={{ borderRadius: 25 }}
            />

            {/* FOOTER */}
            <View style={styles.footer}>
              <Button
                type='default'
                label='buttons.close'
                onPress={() => {
                  this._hideModal();
                }}
              />
            </View>
          </View>
        </Modal>

        <ScrollView>
          <Loader activate={this.state.spiner} />

          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='calendar' label='calendar_of_training.calendar_of_training' />


          {/* CALENDAR */}
          <Calendar
            markedDates={this.state.markedDates}
            onDayPress={(day) => {
              this._onDayPress(day);
            }}
          />

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
