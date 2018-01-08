import React from 'react';
import { View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { FormLabel, Text } from 'react-native-elements';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import HeaderIcon from '../components/shared/HeaderIcon';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import TabBar from './ui_components/TabBar.js';
import ProgressChart from './ui_components/ProgressChart.js';
import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

import iconMuscle from '../assets/icons/create_training/icon_muscle.png';

@observer
export default class DashboardScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      date: new Date(),
      isMale: true,
      loggedIn: false,
      loaded: false,
      appIsReady: false,
      countryName: '',
      countryCode: '',
      regionName: '',
      city: '',
      lat: 0,
      long: 0,
      selectedBtnIndex: 0,
      data: [ { x:1, y:0 }, { x:2, y:0 } ],
      ticks: [ 1, 2 ],
      exercises: ObservableListStore.muscExercises,
      // selectedExercise: this.props.navigation.state.params.data
      yLabel: ''
    };
  }

  async componentWillMount() {
    I18n.initAsync();
    this.setState({ appIsReady: true });
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // From Auth
        const email = user.email;

        this.setState({
          email,
          chosenExercise: this.props.navigation.state.params.data,
          chosenMusclePart: ObservableListStore.muscPartName,
          chosenBodyPart: 'biceps',
          yLabel: this.checkLabel(ObservableListStore.muscPartName)
        });

        ObservableListStore.setEmail(this.state.email);

        const usersBodyMeasurementsRef = myFirebase.database().ref('userBodyMeasurements');
        const emailReplaced = this.encodeAsFirebaseKeySimple(email);
        const userBodyMeasurementsRef = usersBodyMeasurementsRef.child(emailReplaced);

        userBodyMeasurementsRef.once('value', (dataSnapshot) => {
          const data = [];
          const ticks = [];
          let index = 0;

          dataSnapshot.forEach(child => {
            data.push({
              x: index + 1,
              y: child.val()[this.state.chosenBodyPart] ? parseInt(child.val()[this.state.chosenBodyPart], 10) : 0
            });
            ticks.push(index + 1);

            index++;
          });

          this.setState({
            data: data.length ? data : this.state.data,
            ticks: ticks.length ? ticks : this.state.ticks,
            loggedIn: true,
            loaded: true
          });
          // console.log(items);
        });
      } else {
        // No user is signed in.
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

  checkLabel(bodyPart) {
    if (bodyPart === 'weight') {
      return 'kg';
    }

    return 'cm';
  }

  render() {
    return (
      <ScrollView style={styles.container} >
        <BackgroundImage />

        <View style={{ flex: 1 }}>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='stats' label='statistics.exercise_statistics' top={20} />

          {/* TOP MENU BAR */}
          <View style={styles.topMenuBar}>
            {/* Choose Exercise */}
            <TouchableHighlight
              style={[ styles.itemProfileIcon, { marginLeft:10, width: 130, paddingLeft: 10, paddingRight: 10 } ]}
              onPress={() => {
                this.props.navigation.navigate('MuscleExercisesStatistics', { data: this.state.chosenMusclePart });
              }}
              underlayColor='#A07CEB'
            >
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                <Image
                  style={{
                    width: 45,
                    height: 26,
                    marginRight: 6,
                    resizeMode: 'contain'
                  }}
                  source={iconMuscle}
                />
                <View style={{ flex: 1, flexWrap: 'wrap' }}>
                  <Text style={[ { color: '#fff', fontSize: 10 }, styles.labelTopMenu ]}>{I18n.t('statistics.choose_exercise').toUpperCase()}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>

          {/* CONTENT */}
          <View style={[ styles.profileBody, { marginTop: 20, paddingLeft: 10, paddingRight: 10 } ]}>
            <View style={{ borderBottomWidth: 6, borderColor: '#47C0EC' }}>
              <Text style={styles.textHeaderName}>{I18n.t('statistics.weight').toUpperCase()}</Text>
            </View>
            <FormLabel labelStyle={styles.labelHeader}>{I18n.t('statistics.chosen_exercise')}</FormLabel>
            <Text style={styles.textHeaderDescName}>{I18n.t(`muscle_exercises_names.${this.state.chosenExercise}`)}</Text>

            <TabBar />
            <ProgressChart ticks={this.state.ticks} data={this.state.data} yLabel={this.state.yLabel} />

          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footerRow}>
          {/* <Button
            buttonStyle={styles.btnDanger}
            textStyle={{textAlign: 'center'}}
            title={I18n.t('train_together.next')}
            onPress={() => {}}
          />
          <Button
            buttonStyle={styles.btnAction}
            textStylse={{textAlign: 'center'}}
            title={I18n.t('train_together.train_together')}
            onPress={() => {}}
          /> */}
        </View>

        {/* </View> */}
      </ScrollView>
    );
  }
}

I18n.fallbacks = true;
