import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import FirebaseLinks from '../../firebaseContext/firebase_links';

import UserList from './custom_items/userList';
import HeaderIcon from '../components/shared/HeaderIcon';

import Badge from './ui_components/Badge';

export default class FindFriendsScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      database: myFirebase,
      userList: FirebaseLinks.users,
      spiner: false,
      appIsReady: false
    };
  }

  componentWillMount() {
    I18n.initAsync();
    this.setState({ appIsReady: true });
    // this.getInitialState();
  }

  naviToPage = (stackPage, data) => {
    this.props.navigation.navigate(stackPage, { data });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
        <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

        <Badge type='findFriends' label='friends.find_friends' />

        <UserList navigation={this.props.navigation} />
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
