import React from 'react';
import { View, Image, ScrollView, Alert, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Text, SocialIcon, Divider } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import ObservableListStore from '../../utils/Store';
import Utility from '../../utils/utility';

import FirebaseLinks from '../../firebaseContext/firebase_links';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import Button from './ui_components/Button';
import BackgroundImage from './ui_components/BackgroundImage';

import logoImage from '../assets/images/gymgang_logo.png';

import registerForPushNotificationsAsync from '../../utils/registerForPushNotificationsAsync';
import FirebaseService from '../services/FirebaseService';

export default class LoginScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    // this.itemsRef = myFirebase.database().ref();
    this.state = { email: '', password: '' };
  }

  async componentWillMount() {
    I18n.initAsync();
    this.getGeolocation();

    const user = await AsyncStorage.getItem('user');

    if (user) {
      const userObj = JSON.parse(user);
      if (!userObj.key) {
        myFirebase.database().ref('users').orderByChild('email').equalTo(userObj.email).once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            userObj.key = childSnapshot.key;
            AsyncStorage.setItem('user', JSON.stringify(userObj));

            this.getNotifications(childSnapshot.key);
            ObservableListStore.setUserData(userObj);
          });
        });
      } else {
        this.getNotifications(userObj.key);
      }

      ObservableListStore.setEmail(userObj.email);
      ObservableListStore.setUserData(userObj);

      const emailReplaced = this.encodeAsFirebaseKeySimple(userObj.email);

      registerForPushNotificationsAsync(emailReplaced);

      this.props.navigation.navigate('Drawer');
    } else {
      myFirebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          Utility.setCurrentUser(firebaseUser);

          ObservableListStore.setEmail(firebaseUser.email);

          const usersRef = myFirebase.database().ref('users');
          // For tests
          // var email_replaced = '-KuVhZs2CgeZ9H92I0GT';
          // For production
          const emailReplaced = this.encodeAsFirebaseKeySimple(firebaseUser.email);
          const userRef = usersRef.child(emailReplaced);

          userRef.once('value', (dataSnapshot) => {
            ObservableListStore.setUserData({
              key: dataSnapshot.key,
              userfullname: dataSnapshot.val().name,
              name: dataSnapshot.val().name,
              email: dataSnapshot.val().email,
              birthday: dataSnapshot.val().birthday,
              gender: dataSnapshot.val().gender,
              inClub: dataSnapshot.val().inClub,
              selectedSports: dataSnapshot.val().selectedSports,
              picturePath: dataSnapshot.val().picturePath,
              avatar: dataSnapshot.val().picturePath,
              loggedIn: true,
              loaded: true
            });

            const { lastSignInTime, creationTime } = firebaseUser.metadata;
            const selectedSports = dataSnapshot.val().selectedSports;

            registerForPushNotificationsAsync(emailReplaced);

            this.getGeolocation();
            this.getNotifications(dataSnapshot.key);

            this.props.navigation.navigate(lastSignInTime === creationTime && !selectedSports ? 'Disciplines' : 'Info');
          });
        } else {
          console.log('Not logged in');
        }
      });
    }

  }

  getNotifications = (key) => {
    FirebaseLinks.notifications.child(key).once('value', (snap) => {
      ObservableListStore.setNotificationsCount(snap.numChildren());
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
  }

  async facebookLogin() {
    console.log('facebookLogin Pressed');

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1194307064036790', {
      permissions: [ 'public_profile', 'email', 'user_friends', 'user_location' ]
    });

    console.log('type', type);

    if (type === 'success') {
      // Alert.alert('Notice', 'Logged in from Facebook');
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,gender,birthday,picture,location`);
      // The whole response
      const fbResponse = await response.json();

      console.log('fbResponse', fbResponse);

      const email = fbResponse.email;
      const password = 'gymgang_user';
      const auth = myFirebase.auth();
      const promise = auth.signInWithEmailAndPassword(email, password);

      promise
        .then(() => {
          console.log('Logged in from FB');
        })
        .catch(e => {
          console.log(e.message); this.emailregister(fbResponse);
        });
    } else {
      Alert.alert('Alert', 'Logging in from Facebook unsuccessful');
    }
  }

  emaillogin({ emailFb = '', passwordFb = '' }) {
    const email = emailFb || this.state.email;
    const password = passwordFb || this.state.password;

    console.log(`Email: ${  email}`);
    console.log(`Password: ${  password}`);
    const auth = myFirebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.catch(e => {
      console.log(e.message); Alert.alert('Notice', e.message);
    });
  }

  emailregister(fbResponse) {
    const email = fbResponse.email;
    const password = 'gymgang_user';
    const city = this.state.city || fbResponse.location.name;

    const auth = myFirebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .then(() => {
        this.userAdd(fbResponse, city);
      })
      .catch(e => {
        console.log(e.message); Alert.alert('Notice', e.message);
      });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  firstToUpperCase(string) {
    return string.substr(0, 1).toUpperCase() + string.substr(1);
  }

  fixFacebookBirthday(string) {
    const birthdayArr = string.split('/');
    const birthday = `${birthdayArr[1]}/${birthdayArr[0]}/${birthdayArr[2]}`;


    return birthday;
  }

  userAdd(fbResponse, city) {
    const id = fbResponse.id;
    const username = fbResponse.name;
    const email = fbResponse.email;
    const gender = this.firstToUpperCase(fbResponse.gender);
    // var picturePath = fbResponse.picture.data.url;
    const picturePath = `https://graph.facebook.com/${id}/picture?type=large`;

    const usersRef = myFirebase.database().ref('users');
    const emailReplaced = this.encodeAsFirebaseKeySimple(email);
    const userRef = usersRef.child(emailReplaced);
    debugger;
    userRef.set({
      appVersion: '0.7.5',
      birthday: '',
      email,
      gender,
      latitude: '',
      longitude: '',
      name: username,
      picturePath,
      selectedSports: '',
      city,
      timeJoined: {
        dateLogged: ''
      }
    });

    console.log('User added to Firebase Users');
  }

  render() {
    const errorMessage = null;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <BackgroundImage />

          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={logoImage}
            />

            <FormLabel labelStyle={styles.labelHeader}>Email</FormLabel>
            <FormInput
              keyboardType={'email-address'} keyboardAppearance='light' returnKeyType={'next'} onChangeText={(email) => {
                this.setState({ email: email.toLowerCase() });
              }} value={this.state.email} autoFocus={false} underlineColorAndroid={'#A07CEB'} selectionColor={'#A07CEB'} inputStyle={{ color: '#fff', textAlign: 'center' }}
            />
            <FormValidationMessage>{errorMessage}</FormValidationMessage>

            <FormLabel labelStyle={styles.labelHeader}>{I18n.t('login.password')}</FormLabel>
            <FormInput
              secureTextEntry returnKeyType={'go'} onChangeText={(password) => this.setState({ password })}
              value={this.state.password} underlineColorAndroid={'#A07CEB'} selectionColor={'#A07CEB'}
              inputStyle={{ color: '#fff', textAlign: 'center' }}
            />
            <FormValidationMessage>{errorMessage}</FormValidationMessage>
          </View>

          <View style={styles.body}>
            <Button
              label='buttons.login'
              onPress={() => this.emaillogin({})}
            />
            <Text style={styles.textLogin}>{I18n.t('login.dont_have_an_account')}</Text>
            <Button
              label='buttons.signin'
              onPress={() => this.props.navigation.navigate('Register')}
            />
          </View>

          <Divider style={{ marginTop: 20, marginBottom: 20, backgroundColor: '#A07CEB' }} />

          <View style={styles.socialBar}>
            <SocialIcon
              button
              iconSize={20}
              type='facebook'
              onPress={() => this.facebookLogin()}
              style={{ width: 100, height: 40, borderTopRightRadius: 0, borderBottomRightRadius: 0, margin: 0 }}
              iconStyle={{ padding: 0, margin: 0 }}
            />
            <SocialIcon
              button
              iconSize={20}
              type='google-plus-official'
              onPress={() => this.googleLogin()}
              style={{ width: 100, height: 40, borderRadius: 0, margin: 0, opacity: 0.2 }}
              iconStyle={{ padding: 0, margin: 0 }}
              disabled
            />
            <SocialIcon
              button
              iconSize={20}
              type='twitter'
              onPress={() => this.twitterlogin}
              style={{
                width: 100, height: 40, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, margin: 0, opacity: 0.2
              }}
              iconStyle={{ padding: 0, margin: 0 }}
              disabled
            />
          </View>
          <Text style={styles.textLoginFooter}>{I18n.t('login.log_in_to_your_social_media_account')}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
