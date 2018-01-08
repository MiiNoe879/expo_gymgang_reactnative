import React from 'react';
import { View, ScrollView } from 'react-native';
import { FormLabel, Text } from 'react-native-elements';
import moment from 'moment';

import { observer } from 'mobx-react/native';
import I18n from 'ex-react-native-i18n';

import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import TabBar from './ui_components/TabBar';
import ProgressChart from './ui_components/ProgressChart.js';
import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

@observer
export default class BodyPartStatistics extends React.Component {
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
      daysCount: 14,
      data: [ { x:1, y:0 }, { x:2, y:0 } ],
      fullData: [ { x:1, y:0 }, { x:2, y:0 } ],
      dates: [],
      ticks: [ 1, 2 ]
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });

    this.setState({
      email : ObservableListStore.email,
      chosenBodyPart: ObservableListStore.muscPartName,
      yLabel: this.checkLabel(ObservableListStore.muscPartName)
    }, () => {
      const usersBodyMeasurementsRef = myFirebase.database().ref('userBodyMeasurements');
      const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.email);
      const userBodyMeasurementsRef = usersBodyMeasurementsRef.child(emailReplaced).orderByChild('dateMeasurement');

      userBodyMeasurementsRef.once('value', (dataSnapshot) => {
        const data = [];
        const dates = [];
        let index = 0;

        dataSnapshot.forEach(child => {
          data.push({
            x: index + 1,
            y: child.val()[this.state.chosenBodyPart] ? parseInt(child.val()[this.state.chosenBodyPart], 10) : 0
          });

          dates.push(moment(child.val().dateMeasurement));

          index++;
        });

        this.setState({
          dates,
          fullData: data.length ? data : this.state.data,
          loggedIn: true,
          loaded: true
        }, () => {
          const preparedData = data.length ? this.filterDataByDays() : this.state.data;

          this.setState({
            data: preparedData,
            ticks: preparedData.map((item, itemIndex) => itemIndex + 1)
          });
        });
      });
    });
  }

  handleChangeActive = (days) => {
    const data = this.filterDataByDays(days);

    this.setState({
      daysCount: days,
      data,
      ticks: data.map((item, index) => index + 1)
    });
  }

  filterDataByDays = (days = 0) => {
    const { daysCount } = this.state;
    const lastAvailableDay = moment().add(-1 * (days || daysCount), 'days');
    const fullData = [ ...this.state.fullData ];
    let startIndex = 0;

    this.state.dates.find((date, index) => {
      startIndex = date > lastAvailableDay ? index : 0;

      return date > lastAvailableDay;
    });

    return fullData.slice(startIndex).map((data, index) => ({ ...data, x: (index + 1) }));
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
      <ScrollView style={styles.container} contentContainerStyle={{ flex:1 }}>
        <BackgroundImage />

        {/* BODY */}
        <View style={{ flex: 1 }}>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='stats' label='statistics.body_part_statistics' top={20} />

          {/* CONTENT */}
          <View style={[ styles.profileBody, { marginTop: 140 } ]}>
            <FormLabel labelStyle={styles.labelHeader}>{I18n.t('statistics.chosen_body_part')}</FormLabel>
            <Text style={[ styles.textHeaderName, { backgroundColor: 'transparent' } ]}>{I18n.t(`body_parts.${ObservableListStore.muscPartName}`)}</Text>

            <TabBar onChangeActive={this.handleChangeActive} />

            <ProgressChart ticks={this.state.ticks} data={this.state.data} yLabel={this.state.yLabel} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

I18n.fallbacks = true;
