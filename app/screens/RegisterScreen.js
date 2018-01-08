import React from 'react';
import { View, Image, ScrollView, Alert, KeyboardAvoidingView, Linking } from 'react-native';
import { FormLabel, FormInput, Text, CheckBox } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import FirebaseLinks from '../../firebaseContext/firebase_links';

import Button from './ui_components/Button';
import BackgroundImage from './ui_components/BackgroundImage';

import { getRegisterFormItems } from './data/menuItems.js';

import logoImage from '../assets/images/gymgang_logo.png';

const APP_VERSION = '0.7.5';
const DEFAULT_AVATAR = 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/user_card%2Fuser_blank_10.png?alt=media&token=4b7bca67-bdb5-42b3-b8b8-46a94978089e';

export default class RegisterScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.itemsRef = myFirebase.database().ref();

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      rulesAccepted: false,
      registeredNow: false
    };
  }

  componentWillMount() {
    I18n.initAsync();
    this.getGeolocation();
  }

  getGeolocation() {
    this.setState({ ...ObservableListStore.coordinates });
  }

  emaillogin() {
    const email = this.state.email;
    const password = this.state.password;

    const auth = myFirebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.catch(e => console.log(e.message));
  }

  emailregister() {
    const { username, password, confirmPassword, city, rulesAccepted } = this.state;
    const email = this.state.email.toLowerCase();

    if (confirmPassword === password) {
      FirebaseLinks.users.orderByChild('name').equalTo(username).once('value', (snap) => {
        if (!snap.val()) {
          const auth = myFirebase.auth();
          const promise = auth.createUserWithEmailAndPassword(email, password);

          promise
            .then(() => {
              this.userAdd(email, username, city, rulesAccepted); this.setState({ registeredNow: true });
            })
            .catch(e => {
              console.log(e.message); Alert.alert('Notice', e.message);
            });
        } else {
          Alert.alert(
            'Notice',
            'The username was taken. Please, change you username'
          );
        }
      });
    } else {
      Alert.alert(
        'Notice',
        'The passwords does not match'
      );
    }
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  userAdd(email, username, city) {
    const emailReplaced = this.encodeAsFirebaseKeySimple(email);

    const usersRef = myFirebase.database().ref('users');
    const userRef = usersRef.child(emailReplaced);

    userRef.set({
      appVersion: APP_VERSION,
      birthday: '',
      email,
      gender: '',
      latitude: '',
      longitude: '',
      name: username,
      picturePath : DEFAULT_AVATAR,
      rulesAccepted: this.state.rulesAccepted,
      selectedSports: '',
      city,
      timeJoined: {
        dateLogged: ''
      }
    });

    console.log('User added to Firebase Users');
  }

  addExampleKey() {
    const usersRef = myFirebase.database().ref('disciplines/' + 'examplemail@gymgang,co');

    usersRef.set({
      username: 'Fajfus'
    });
  }

  renderInput = ({ key, keyboardType = 'text', isPassword }) => {
    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <FormLabel labelStyle={styles.labelHeader}>{I18n.t(`register.${key}`)}</FormLabel>
        <FormInput
          secureTextEntry = {isPassword}
          onChangeText={(value) => {
            this.setState({ [key]: value });
          }} value={this.state[key]} keyboardType = {keyboardType}
          underlineColorAndroid={'#A07CEB'} selectionColor={'#A07CEB'} inputStyle={{ color: '#fff', textAlign: 'center' }}
        />
      </View>
    );
  }

  render() {
    const registerInputs = getRegisterFormItems();

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <BackgroundImage />

          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={logoImage}
            />

            {registerInputs.map(this.renderInput)}

            <CheckBox
              center
              title={I18n.t('general.regulation_acceptance_statement')}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.rulesAccepted}
              onPress={() => this.setState({ rulesAccepted: !this.state.rulesAccepted })}
              textStyle={styles.labelHeader}
              style={styles.checkbox}
            />
            <Text
              onPress={() => Linking.openURL('http://gymgang.co/regulamin')}
              style={styles.labelHeader}
            >
              {I18n.t('general.regulation_place')} http://gymgang.co/regulamin
            </Text>

          </View>

          <View style={styles.body}>
            <Button
              label= 'buttons.signin'
              onPress={() => this.emailregister()}
              disabled={!this.state.rulesAccepted}
            />
            <Text style={styles.textLogin}>{I18n.t('register.already_have_an_account')}</Text>
            <Button
              label= 'buttons.login'
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
