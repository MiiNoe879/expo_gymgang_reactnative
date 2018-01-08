import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { Text, Avatar, Icon } from 'react-native-elements';
import { observer } from 'mobx-react/native';
import I18n from 'ex-react-native-i18n';

import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';
import ListIcon from '../components/shared/ListIcon.js';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import BackgroundImage from './ui_components/BackgroundImage';

import FirebaseService from './../services/FirebaseService';
import BodyMeasurementReminder from './../services/BodyMeasurementReminder';

import { getDashboardMenuItems } from './data/menuItems.js';
import BodyMeasurement from './BodyMeasurementScreen';

@observer
export default class DashboardScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);


    FirebaseService.fetchFavouriteExercises();
    this.getUserCheckIn();

    this.state = {
      email: '',
      name: '',
      birthday: '',
      picturePath: '',
      avatar: '',
      gender: '',
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
      clubName: '',
      clubCity: ''
    };
  }


  async componentWillMount() {
    I18n.initAsync();
    this.setState({ appIsReady: true });
    this.getCheckIn();
    this.getGeolocation();


    this.setState({
      ...ObservableListStore.user,
      inClub: ObservableListStore.inClub,
      email: ObservableListStore.email,
      loggedIn: true,
      loaded: true
    });


    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (this.state.gender === '' || this.state.birthday === '') {
          this.props.navigation.navigate('EditProfile');
        } else if (this.state.selectedSports === '') {
          this.props.navigation.navigate('Disciplines');
        }
        // });
      } else {
        // No user is signed in.
        this.setState({
          loggedIn: false,
          loaded: true
        });
      }
    });
  }

  getUserCheckIn() {
    const userEmail = FirebaseService.encodedEmail();
    const user = myFirebase.database().ref('users').child(userEmail);
    if (ObservableListStore.currentClubCity.length) return;
    user.once('value', (snap) => {
      if (snap.val()) {
        if (!snap.val().inClub) return;
        ObservableListStore.currentClubName = snap.val().inClub.club.name;
        ObservableListStore.currentClubCity = snap.val().inClub.club.city;
        ObservableListStore.currentClubKey = snap.val().inClub.id;
        this.setState({ clubName: snap.val().inClub.club.name, clubCity: snap.val().inClub.club.city });
      }

    });
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`;

        fetch(url)
          .then((response) => response.json())
          .then((response) => {
            const city = response.results[0].address_components[2].long_name;
            const country = response.results[0].address_components[5].long_name;
            const country_code = response.results[0].address_components[5].short_name;
            const region = response.results[0].address_components[4].long_name;
            const coordinates = {
              countryName: country,
              countryCode: country_code,
              regionName: region,
              city: city
            };
            ObservableListStore.setCoordinates(coordinates);
            this.setState({ ...coordinates });
          });
      }

    );



    this.setState({ ...ObservableListStore.coordinates });
  }

  getCheckIn() {
    this.setState({
      clubName: ObservableListStore.currentClubName,
      clubCity: ObservableListStore.currentClubCity
    });
  }

  checkOutFromClub() {
    this.props.navigation.navigate('Club', { data: ObservableListStore.currentClubKey, checkedIn: true });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  render() {
    const { navigate } = this.props.navigation;
    const dashOptions = getDashboardMenuItems(navigate);

    BodyMeasurementReminder.perform();

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <BackgroundImage />

          <View style={styles.header}>
            <View style={styles.inlineLoc}>
              <Icon name='place' color='#fff' size={20} />
              <Text style={styles.textHeaderLoc}>{this.state.city}, {this.state.countryName}</Text>
            </View>
            <Text style={styles.textHeaderName}>{this.state.name}</Text>

            {this.state.clubName.length ?
              <View style={styles.banner}>
                <TouchableHighlight onPress={() => this.checkOutFromClub()}>
                  <View style={styles.bannerInner}>
                    <Text style={styles.bannerHeader}>Jesteś obecnie w:</Text>
                    <Text style={styles.bannerText}>{`${I18n.t('clubs.club')} ${this.state.clubName}, ${this.state.clubCity}`}</Text>
                  </View>
                </TouchableHighlight>
              </View>
              : null
            }



          </View>

          {/* GRID BUTTONS */}
          <View style={styles.gridLayout}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {dashOptions.map(option => (<ListIcon key={option.text} {...option} />))}
            </View>
          </View>

          <HeaderIcon type='menu' onPress={() => navigate('DrawerOpen')} />
          <HeaderIcon type='bell' onPress={() => navigate('NotificationList')} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
