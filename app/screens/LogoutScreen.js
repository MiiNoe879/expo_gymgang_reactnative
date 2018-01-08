import React from 'react';
import { View, Image, Alert, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import ObservableListStore from '../../utils/Store';

import BackgroundImage from './ui_components/BackgroundImage';

import logoImage from '../assets/images/gymgang_logo.png';

export default class LogoutScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  componentWillMount() {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'NO', onPress: () => this.props.navigation.goBack() },
        { text: 'YES', onPress: () => this.emailsignout() }
      ],
      { cancelable: false }
    );
  }

  emailsignout() {
    // myFirebase.auth().signOut();
    myFirebase.auth().signOut().then(() => {
      AsyncStorage.removeItem('user');

      ObservableListStore.clean();
    }).then(() => {
      myFirebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log(firebaseUser);
          this.props.navigation.navigate('Dashboard');
        } else {
          console.log('Not logged in');
          this.props.navigation.navigate('Login');
        }
      });
    }).catch(() => {
      // An error happened.
    });
  }

  render() {
    return (
      <View style={styles.allCentered}>
        <BackgroundImage />

        {/* GYMGANG LOGO */}
        <Image
          style={{
            width: 300,
            height: 250,
            resizeMode: 'contain'
          }}
          source={logoImage}
        />

      </View>
    );
  }
}
