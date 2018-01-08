import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import styles from '../../styles.js';

import ObservableListStore from '../../utils/Store';

import myFirebase from '../../connection.js';

import HeaderIcon from '../components/shared/HeaderIcon';

import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';

export default class MyFriendsScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    appIsReady: false,
    dataSource: null
  }

  componentWillMount() {
    I18n.initAsync();
    this.setState({ appIsReady: true });

    // Checks if logged in
    const FriendsRef = myFirebase.database().ref('friends');
    const emailReplaced = this.encodeAsFirebaseKeySimple(ObservableListStore.email);
    const myFriendsRef = FriendsRef.child(emailReplaced);

    this.listenForItems(myFriendsRef);
  }

  // Keys with friendKeys
  listenForItems(itemsRef) {
    itemsRef.once('value').then((snap) => {
      // var itemsKeys = snap.val().selectedClubsKeys.split(",");
      console.log('Snap:');
      console.log(snap);
      const friends = [];

      // items are my friends keys
      snap.forEach(itemKey => {
        const friendKey = itemKey.val().friendKey;
        // Find user with friendKey
        const itemRef = myFirebase.database().ref(`users/${friendKey}`);

        itemRef.once('value', (snapshot) => {
          console.log(snapshot.val().name);
          friends.push({
            name: snapshot.val().name,
            picturePath: snapshot.val().picturePath,
            email: snapshot.val().email,
            _key: snapshot.key
          });

          this.setState({
            dataSource: [ ...friends ]
          });
        });

        // if (snap.val().indexOf())
      });
    });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  openUserCard = ({ _key }) => {
    this.props.navigation.navigate('UserCard', { data: { userKey: _key, myFriends: this.state.dataSource } });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='friends' label='friends.my_friends' />

          {this.state.dataSource
            ? (
              <PlainList
                dataSource={this.state.dataSource}
                keys = {{
                  key: 'name',
                  title: 'name',
                  subtitle: 'email',
                  avatar: 'picturePath'
                }}
                onPressItem = {this.openUserCard}
                containerStyle={styles.rowNormal}
              />
            )
            : null
          }

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
