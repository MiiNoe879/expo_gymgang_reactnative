import React from 'react';
import { View, Image, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';
import moment from 'moment';

import HeaderIcon from '../components/shared/HeaderIcon';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import Button from './ui_components/Button';
import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge.js';

import { getBodyMeasurmentInputs } from './data/menuItems.js';

import bodyImage from '../assets/icons/body_measurement/body.png';
import FirebaseService from '../services/FirebaseService';

export default class BodyMeasurement extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    // this.itemsRef = myFirebase.database().ref();
    this.state = {
      dateMeasurement: '',
      chest: '',
      biceps: '',
      forearm: '',
      waist: '',
      belt: '',
      hips: '',
      thigh: '',
      calf: '',
      weight: '',
      date: new Date(),
      appIsReady: false,
      lastMeasurement: {
        dateMeasurement: '',
        chest: '',
        biceps: '',
        forearm: '',
        waist: '',
        belt: '',
        hips: '',
        thigh: '',
        calf: '',
        weight: ''
      }
    };
  }

  componentWillMount() {
    I18n.initAsync();
    this.setState({ appIsReady: true });

    // Checks if logged in
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUserEmail: user.email
        });
      }
    });

    const emailReplaced = FirebaseService.encodedEmail();
    const lastBodyMeasurementsRef = myFirebase.database().ref('userBodyMeasurements').child(emailReplaced);

    lastBodyMeasurementsRef.once('value', (snap) => {
      const userMeasurements = snap.val();
      if (userMeasurements) {
        const keys = Object.keys(userMeasurements);
        const lastMeasurementId = keys[keys.length - 1];
        const lastMeasurement = userMeasurements[lastMeasurementId];
        this.setState({ lastMeasurement });
      }
    });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  createBodyMeasurement() {
    if (this.state.dateMeasurement) {
      const usersBodyMeasurementsRef = myFirebase.database().ref('userBodyMeasurements');
      const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.currentUserEmail);

      const data = {
        dateMeasurement: moment(this.state.dateMeasurement, 'DD-MM-YYYY').format(),
        chest: this.state.chest,
        biceps: this.state.biceps,
        forearm: this.state.forearm,
        waist: this.state.waist,
        belt: this.state.belt,
        hips: this.state.hips,
        thigh: this.state.thigh,
        calf: this.state.calf,
        weight: this.state.weight
      };

      for (const item in data) {
        if (item == "dateMeasurement") continue;
        if (data[item].length == 0) {
          data[item] = this.state.lastMeasurement[item];
        }
      }

      usersBodyMeasurementsRef.child(emailReplaced).transaction((currentUserData) => {
        if (currentUserData === null) return [ data ];

        return;
      }, (error, committed, snapshot) => {
        if (!committed) {

          snapshot.ref.push(data);
        }
      });

      myFirebase.database().ref('users').child(emailReplaced).update({
        lastBodyMeasurementDate: data.dateMeasurement
      })

      Alert.alert('Notice', 'Body measurement has been saved.');

      this.props.navigation.goBack();
    } else {
      Alert.alert('Notice', 'Please, choose the date of measurement');
    }
  }

  renderInput = ({ key, placeholder, keyboardType = 'numeric', maxLength = 3, style = {} }) => {
    return (
      <FormInput
        style = {styles.textDrawerBody} keyboardType={keyboardType} placeholder = {placeholder}
        maxLength = {maxLength} textAlign = {'center'} keyboardAppearance='light'
        returnKeyType={'next'} onChangeText={(value) => {
          this.setState({ [key]: value });
        }} value={this.state[key]}
        underlineColorAndroid={'#A07CEB'} selectionColor={'#A07CEB'}
        inputStyle={[ { color: '#fff', textAlign: 'center' }, style ]}
      />
    );
  }

  renderLabeledInput = ({ key, placeholder }) => {
    return (
      <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <FormLabel labelStyle={styles.textDrawerItems}>{I18n.t(`body_measurements.${key}`)}</FormLabel>
        {this.renderInput({ key, placeholder })}
      </View>
    );
  }

  render() {
    const bodyMeasurementInputs = getBodyMeasurmentInputs();

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <BackgroundImage />

          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />


          <Badge type='measurement' label='body_measurements.body_measurements' />


          {/* DATE INPUT */}
          <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
            <FormLabel labelStyle={styles.labelHeader}>{I18n.t('body_measurements.date_measurement')}</FormLabel>
            <View style = {{ flexDirection: 'row', marginLeft: 20 }} >
              {this.renderInput({ key: 'dateMeasurement', placeholder: '', keyboardType: 'number-pad', maxLength: 10, style: { width: 100 } })}
              {/* DATEPICKER */}
              <DatePicker
                style={{ width: 30 }}
                date={this.state.date}
                mode='date'
                placeholder='select date'
                format='DD/MM/YYYY'
                hideText
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                // customStyles={{
                //   // dateIcon: {
                //   //   position: 'absolute',
                //   //   // left: 0,
                //   //   // top: 4,
                //   //   // marginLeft: 0
                //   // },
                //   // dateInput: {
                //     // marginLeft: 36
                //   // }
                // }}
                onDateChange={(date) => {
                  this.setState({ date, dateMeasurement: date });
                }}
              />
            </View>
          </View>

          {/* INPUTS */}
          <View style = {{ flexDirection: 'row' }}>
            <Image source = {bodyImage} style = {{ height:400, width: 160, marginLeft: 5 }} />
            <View style = {{ flexDirection: 'column' }}>
              {bodyMeasurementInputs.map(this.renderLabeledInput)}
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Button
              label='buttons.save'
              onPress={() => {
                this.createBodyMeasurement();
              }}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
