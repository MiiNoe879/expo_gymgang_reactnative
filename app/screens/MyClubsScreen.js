import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import HeaderIcon from '../components/shared/HeaderIcon';

import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';

export default class MyClubsScreen extends React.Component {
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
    myFirebase.auth().onAuthStateChanged(user => {
      const usersClubsRef = myFirebase.database().ref('usersClubs');
      const emailReplaced = this.encodeAsFirebaseKeySimple((user || {}).email);
      const userClubsRef = usersClubsRef.child(emailReplaced);

      this.listenForItems(userClubsRef);
    });
  }

  listenForItems(itemsRef) {
    itemsRef.once('value', (snap) => {
      // items are my clubs keys
      if (snap.val() !== null) {
        const itemsKeys = snap.val().selectedClubsKeys.split(',');
        const clubs = [];

        itemsKeys.forEach((itemKey, index) => {
          // Find club with itemKey
          const itemRef = myFirebase.database().ref(`clubs/${itemKey}`);

          itemRef.once('value', (snapshot) => {
            clubs.push({
              city: snapshot.val().city,
              name: snapshot.val().name,
              _key: snapshot.key
            });
            if (index === (itemsKeys.length - 1)) {
              this.setState({
                dataSource: clubs
              });
            }
          });
        });
      }
    });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  // Add item to firebase
  addItem(item) {
    this.itemsRef.push(item);
  }

  // Add item to firebase
  deleteItem(item) {
    // alert(JSON.stringify(item._key));
    this.itemsRef.child(item._key).remove();
  }

  openClubCurd = ({ _key }) => {
    this.props.navigation.navigate('Club', { data: _key });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='clubs' label='clubs.my_clubs' />

          {this.state.dataSource
            ? (
              <PlainList
                dataSource={this.state.dataSource}
                keys = {{
                  key: 'name',
                  title: 'name',
                  subtitle: 'city',
                  avatar: 'avatar_url'
                }}
                onPressItem = {this.openClubCurd}
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
