import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import AvatarSubInfo from '../components/AvatarSubInfo';
import HeaderIcon from '../components/shared/HeaderIcon';
import ListIcon from '../components/shared/ListIcon.js';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

import { getClubsMenuItems } from './data/menuItems.js';

@observer
export default class ClubsScreen extends React.Component {
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


  componentWillMount() {
    I18n.initAsync();

    this.setState({
      ...ObservableListStore.user,
      email: ObservableListStore.email,
      isMale: ObservableListStore.user.gender === 'Male',
      loggedIn: true,
      loaded: true,
      appIsReady: true
    });

    myFirebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // No user is signed in.
        this.setState({
          loggedIn: false,
          loaded: true
        });
      } else {
        const usersClubsRef = myFirebase.database().ref('usersClubs');
        const emailReplaced = this.encodeAsFirebaseKeySimple((user || {}).email);
        const userClubsRef = usersClubsRef.child(emailReplaced);

        userClubsRef.once('value', (snapshot) => {
          if (snapshot.numChildren() === 0) {
            this.props.navigation.navigate('SearchClubs');
          } else if (snapshot.val().selectedClubsKeys === '') {
            this.props.navigation.navigate('SearchClubs');
          }
        });
      }
    });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  render() {
    const { navigate } = this.props.navigation;
    const clubs = getClubsMenuItems(navigate);

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.navigate('Dashboard')} />
          <HeaderIcon type='bell' onPress={() => navigate('NotificationList')} />

          <AvatarSubInfo />

          <Badge type='clubs' label='clubs.clubs' top={160} />

          {/* 4X GRID BUTTONS  */}
          <View style={[ styles.gridLayout, { flexDirection: 'row' } ]}>
            {clubs.map(club => (<ListIcon key={club.text} {...club} />))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
