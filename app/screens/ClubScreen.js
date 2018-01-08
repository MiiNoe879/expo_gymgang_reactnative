import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FormLabel, Text } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';

import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import Button from './ui_components/Button';
import TopBackgroundImage from './ui_components/TopBackgroundImage';
import Badge from './ui_components/Badge';
import IconButton from './ui_components/IconButton';
import ScoreItem from './ui_components/ScoreItem.js';

import ClubInfo from './custom_items/clubs_info.js';
import FirebaseService from '../services/FirebaseService';

const SCHEDULE = [
  `${I18n.t('week.sunday')} 08:00 - 21:00`,
  `${I18n.t('week.monday')} 08:00 - 21:00`,
  `${I18n.t('week.tuesday')} 08:00 - 21:00`,
  `${I18n.t('week.wednesday')} 08:00 - 21:00`,
  `${I18n.t('week.thursday')} 08:00 - 21:00`,
  `${I18n.t('week.friday')} 08:00 - 21:00`,
  `${I18n.t('week.saturday')} 08:00 - 21:00`
];

export default class ClubScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      id: '',
      name: '',
      city: '',
      street: '',
      phone: '',
      dataSelectedClubsKeys: '',
      isMine: false,
      loaded: false,
      appIsReady: false,
      isCheckedIn: false,
      isRatedByUser: false,
      averageRate: 0
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({
      appIsReady: true,
      data: this.props.navigation.state.params.data,
      isCheckedIn: this.props.navigation.state.params.checkedIn
    });

    // Checks if logged in
    myFirebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUserEmail: user.email
        });
      }

      // User clubs info
      const usersClubsRef = myFirebase.database().ref('usersClubs');
      const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.currentUserEmail);
      const userClubsRef = usersClubsRef.child(emailReplaced);
      // Current club info
      const clubsRef = myFirebase.database().ref('clubs');
      const clubKey = this.state.data;
      const clubRef = clubsRef.child(clubKey);

      clubRef.once('value', (dataSnapshot) => {
        this.setState({
          id: dataSnapshot.val().id,
          name: dataSnapshot.val().name,
          city: dataSnapshot.val().city,
          street: dataSnapshot.val().street,
          phone: dataSnapshot.val().phone,
          raiting: dataSnapshot.val().raiting,
          _key: dataSnapshot.key,
          loaded: true
        });

        this.getScoresHistory();

        userClubsRef.once('value', (snap) => {
          // // If clubKey exist in array

          if (snap.val() === null) {
            this.setState({
              isMine: false
            });
          } else if (snap.val() !== null) {
            const itemsKeys = snap.val().selectedClubsKeys.split(',');

            if (itemsKeys.indexOf(this.state._key) > -1) {
              this.setState({ isMine: true });
            } else {
              this.setState({ isMine: false });
            }
          }
        });
      });
    });
  }

  getScoresHistory = () => {
    const clubsHistoryRef = myFirebase.database().ref('clubsRaitingHistory');
    const clubHistoryRefById = clubsHistoryRef.child(this.state.id);

    clubHistoryRefById.once('value', (dataSnapshot) => {
      const history = [];
      let averageRate = 0;

      dataSnapshot.forEach(child => {
        history.push(child.val());
      });

      history.forEach(score => {
        let tmpRate = 0;

        score.raiting.forEach(rate => tmpRate += rate.score);

        averageRate += tmpRate / score.raiting.length;
      });

      avarageRate = (averageRate / history.length).toFixed(2);

      this.setState({
        isRatedByUser: !!history.find(item => item.userEmail === ObservableListStore.email) || false,
        averageRate
      });
    });
  }

  getNavigationParams() {
    return this.props.navigation.state.params || {};
  }

  encodeAsFirebaseKey(string) {
    return (string || '').replace(/\%/g, '%25')
      .replace(/\./g, '%2E')
      .replace(/\#/g, '%23')
      .replace(/\$/g, '%24')
      .replace(/\//g, '%2F')
      .replace(/\[/g, '%5B')
      .replace(/\]/g, '%5D');
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  addToMyClubs(clubKey) {
    const usersClubsRef = myFirebase.database().ref('usersClubs');
    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.currentUserEmail);
    const userClubsRef = usersClubsRef.child(emailReplaced);
    let selectedClubsKeys = [];

    userClubsRef.once('value', (snap) => {
      // if response is not null
      if (snap.val() !== null) {
        this.setState({
          dataSelectedClubsKeys: snap.val().selectedClubsKeys
        });
        selectedClubsKeys = this.state.dataSelectedClubsKeys; // string
        selectedClubsKeys = selectedClubsKeys.split(','); // array
      }
      // If clubKey doesnt exist in array
      if (selectedClubsKeys.indexOf(clubKey) === -1) {
        selectedClubsKeys.push(clubKey);
      }

      userClubsRef.update({
        selectedClubsKeys: selectedClubsKeys.join() // string
      });

      this.props.navigation.navigate('MyClubs');
    });
  }

  // Delete item from firebase
  deleteFromMyClubs(clubKey) {
    const usersClubsRef = myFirebase.database().ref('usersClubs');
    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.currentUserEmail);
    const userClubsRef = usersClubsRef.child(emailReplaced);
    let selectedClubsKeys = [];

    userClubsRef.once('value', (snap) => {
      // if response is not null
      if (snap.val() !== null) {
        this.setState({
          dataSelectedClubsKeys: snap.val().selectedClubsKeys
        });
        selectedClubsKeys = this.state.dataSelectedClubsKeys; // string
        selectedClubsKeys = selectedClubsKeys.split(','); // array
      }
      // If clubKey exist in array
      if (selectedClubsKeys.indexOf(clubKey) > -1) {
        const index = selectedClubsKeys.indexOf(clubKey);

        if (index > -1) {
          selectedClubsKeys.splice(index, 1);
        }
      }

      userClubsRef.update({
        selectedClubsKeys: selectedClubsKeys.join() // string
      });

      this.props.navigation.navigate('MyClubs');
    });
  }

  changeCheckedIn = () => {
    if (this.state.isCheckedIn) {
      this.removeCheckedClub();
      ObservableListStore.currentClubKey = '';
      ObservableListStore.currentClubName = '';
      ObservableListStore.currentClubCity = '';
      this.props.navigation.navigate('Dashboard');
    } else {
      this.saveCheckedClub();
    }

    this.setState({ isCheckedIn: !this.state.isCheckedIn });
  }

  removeCheckedClub = () => {
    myFirebase.database().ref(`users/${FirebaseService.encodedEmail()}`).child('inClub').remove();
  }

  saveCheckedClub = () => {
    const { name, city } = this.state;
    const data = {
      id: this.props.navigation.state.params.data,
      club: {
        name,
        city
      }
    };

    myFirebase.database().ref(`users/${FirebaseService.encodedEmail()}`).child('inClub').update(data);

    ObservableListStore.currentClubKey = data.id;
    ObservableListStore.currentClubName = data.club.name;
    ObservableListStore.currentClubCity = data.club.city;
  }

  renderClubDataItem = ({ label, value }) => {
    return (<View style={{ width: '100%', alignItems: 'center' }}>
      <FormLabel labelStyle={styles.labelHeader}>{I18n.t(label)}</FormLabel>
      <Text style={styles.textHeaderName}>{value}</Text>
    </View>);
  }

  render() {
    const { averageRate, name, city, street, phone, isMine, isCheckedIn, isRatedByUser } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <TopBackgroundImage />

          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <View style={{ marginBottom: 120 }} />

          <Badge type='clubs' label='clubs.clubs' />

          <View style={{ position: 'absolute', top: 200, left: -8, paddingTop: 16, alignItems: 'center' }}>
            <ScoreItem id='total' size='small' score={averageRate} />
            <Text style={{ color: 'white' }}>Rate: {averageRate}</Text>
          </View>

          <View style={{ position: 'absolute', top: 200, right: 0, flexDirection: 'row' }}>
            <IconButton
              type='share'
              isChecked={isCheckedIn}
              isLeft
              label={I18n.t('clubs.check_in')}
              onPress={this.changeCheckedIn}
            />
            <IconButton
              type='rate'
              label={I18n.t('clubs.rate')}
              isChecked = {isRatedByUser}
              onPress={() => this.props.navigation.navigate('ClubRaiting', this.state)}
            />
          </View>

          <ClubInfo
            data={{
              name,
              locale: city,
              address: `${city}, ${street}`,
              schedule: SCHEDULE,
              phone
            }}
          />

          {/* FOOTER */}
          <View style={styles.footerRow}>
            <Button
              type = 'bg'
              label= 'buttons.cancel'
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />

            {isMine
              ? (
                <Button
                  type = 'danger'
                  label= 'clubs.delete_from_my_clubs'
                  onPress={() => {
                    this.deleteFromMyClubs(this.state._key);
                  }}
                />
              )
              : (
                <Button
                  label= 'clubs.add_to_my_clubs'
                  onPress={() => {
                    this.addToMyClubs(this.state._key);
                  }}
                />
              )
            }

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
