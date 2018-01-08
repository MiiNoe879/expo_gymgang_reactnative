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

import { getTrainTogetherMenuItems } from './data/menuItems.js';

@observer
export default class FriendsScreen extends React.Component {
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

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });

    this.setState({
      ...ObservableListStore.user,
      email: ObservableListStore.email,
      isMale: ObservableListStore.user.gender === 'Male',
      loggedIn: true,
      loaded: true
    });

    myFirebase.auth().onAuthStateChanged(user => {
      if (!user) {
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

  _goBack() {
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const friends = getTrainTogetherMenuItems(navigate);

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => goBack()} />
          <HeaderIcon type='bell' onPress={() => navigate('NotificationList')} />

          <AvatarSubInfo />

          <Badge type='trainTogether' label='train_together.train_together' top={160} />

          <View style={styles.gridLayout}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {friends.map(friend => (<ListIcon key={friend.text} {...friend} />))}
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
