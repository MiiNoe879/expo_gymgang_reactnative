import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import TextTabBar from './ui_components/TextTabBar.js';
import { observer } from 'mobx-react/native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';

import ObservableListStore from '../../utils/Store';

import Loader from './helpers/loader';

import FirebaseLinks from '../../firebaseContext/firebase_links';
import myFirebase from '../../connection.js';

import styles from '../../styles.js';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

import PartsList from './ui_components/PartsList';

@observer
export default class TrainTogetherScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      userfullname: '',
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
      users: [],
      prevKey: 0,
      loading: true,
      exist: true,
      activeTab: 0,
      usersByLocation: [],
      userFriends: []
    };
  }

  async componentWillMount() {
    I18n.initAsync();
    this.setState({ appIsReady: true });
    this.getGeolocation();

    this.setState({
      ...ObservableListStore.user,
      email: ObservableListStore.email,
      loggedIn: true,
      loaded: true
    });
    let temporary = false;

    await myFirebase.database().ref('usersClubs').once('value').then((snapshot) => {
      snapshot.forEach((user) => {
        if (user.key === this.encodeAsFirebaseKeySimple(this.state.email)) {
          temporary = true;
        }
      });
      this.setState({
        exist: temporary
      });
    });
    myFirebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        });
      }
    });
    if (this.state.exist) {
      const val = await this.getUsers();

      this.updateUsersList(val.byClub, false);
      this.updateUsersList(val.byLocation, true);
    } else {
      this.state.loading = false;
    }
  }

  async getUsers() {
    return new Promise(async (resolve) => {
      let loggedUserClubs = [];
      const matchingUsersEmails = [];
      const currentUserEmail = this.encodeAsFirebaseKeySimple(this.state.email);
      const userFriendsRef = myFirebase.database().ref('friends').child(currentUserEmail)
      const userFriends = []

      userFriendsRef.once('value')
        .then((snap) => {
          snap.forEach((friend) => {
            userFriends.push(friend.val().friendKey);
          })
          this.setState({ userFriends })
        })



      FirebaseLinks.usersClubs.orderByKey().startAt(currentUserEmail).limitToFirst(1).once('value')
        .then((snapshot) => {
          snapshot.forEach((item) => {
            const temp = item.val().selectedClubsKeys;

            loggedUserClubs = temp.split(',');
          });
        });

      FirebaseLinks.usersClubs.once('value')
        .then((snapshot) => {
          snapshot.forEach((item) => {
            let temp = item.val().selectedClubsKeys;

            if (temp.includes(',')) {
              temp = temp.split(',');
            }

            loggedUserClubs.map((club) => {
              if (temp.includes(club) && !(matchingUsersEmails.includes(item.key))) {
                matchingUsersEmails.push(item.key);
              }
            });
          });

          while (matchingUsersEmails.includes(currentUserEmail)) {
            const index = matchingUsersEmails.indexOf(currentUserEmail);

            matchingUsersEmails.splice(index, 1);
          }
        });

      let matchingUsers = {};
      let matchingUsersByGeolocation = {};

      FirebaseLinks.users.once('value').then((snapshot) => {
        matchingUsersEmails.map((mail) => {
          const temporary = snapshot.child(`${mail}`).val();
          const temp = { [`${mail}`]: temporary };

          Object.assign(matchingUsers, temp);
        });

        const city = ObservableListStore.coordinates !== {} ? ObservableListStore.coordinates.regionName : null;

        snapshot.forEach((user) => {
          if (user.val().city === city) {
            const temporary = user.val();
            const temp = { [`${user.key}`]: temporary };

            Object.assign(matchingUsersByGeolocation, temp);
          }
        });
        matchingUsersByGeolocation = { byLocation: matchingUsersByGeolocation };
        matchingUsers = { byClub: matchingUsers };
        Object.assign(matchingUsers, matchingUsersByGeolocation);

        resolve(matchingUsers);
      });
    });
  }

  getGeolocation() {
    this.setState({ ...ObservableListStore.coordinates });
  }

  updateUsersList(val, isLocation) {
    let items = Object.keys(val).map(valKey => ({ ...val[valKey], userKey: valKey }));

    items = items.filter((item) => !this.state.userFriends.includes(item.email.replace('.', ',')));

    if (isLocation) {
      this.setState({
        usersByLocation: [ ...this.state.usersByLocation, ...items ],
        loading: false
      });
    } else {
      this.setState({
        users: [ ...this.state.users, ...items ],
        loading: false
      });
    }
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  changeActiveTab = ({ index }) => {
    this.setState({ activeTab: index });
  }

  personPicture = (item) => {
    return item.picturePath;
  }

  _trainTogether = (item) => {
    // this.sendTTRequest()
    const data = { userKey: item.userKey };

    this.props.navigation.navigate('UserCard', { data });
  }

  render() {
    const tabs = [
      { index: 0, name: I18n.t('train_together.club') },
      { index: 1, name: I18n.t('train_together.location') }
    ];
    const activeTab = this.state.activeTab;


    return (this.state.exist ? (<ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
        <Loader activate={this.state.loading} />

        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', paddingBottom: 16, marginBottom: 100 }}>

            <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
            <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

            <Badge type='trainTogether' label='train_together.train_together' top={20} />

          </View>
          <TextTabBar tabs={tabs} activeTab={activeTab} onPress={this.changeActiveTab} />
          <PartsList
            label={'people'}
            items={this.state.activeTab ? this.state.usersByLocation : this.state.users}
            onPressItem={this._trainTogether}
            isPerson
            handleImage={this.personPicture}
          />
        </View>
      </ScrollView>) : (
        <View>
          <BackgroundImage />
          <HeaderIcon onPress={() => this.props.navigation.navigate('Dashboard')} />
          {Alert.alert(
            'Nie wybrano żadnego klubu!',
            'Gdzie chcesz się przenieść?',
            [
              { text: I18n.t('drawer.dashboard'), onPress: () => this.props.navigation.navigate('Dashboard') },
              { text: I18n.t('clubs.search_clubs'), onPress: () => this.props.navigation.navigate('SearchClubs') }
            ],
            { cancelable: false }
          )}
        </View>
      )
    );
  }
}

I18n.fallbacks = true;
