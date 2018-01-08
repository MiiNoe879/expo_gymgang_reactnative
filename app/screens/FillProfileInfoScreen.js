import React from 'react';
import { View, Image, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Text, Avatar, Divider } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';
import { RNS3 } from 'react-native-aws3';
import uuid from 'uuid';

import HeaderIcon from '../components/shared/HeaderIcon';

import ObservableListStore from '../../utils/Store.js';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import awsConfig from './data/awsConfig.js';

import Button from './ui_components/Button';
import BackgroundImage from './ui_components/BackgroundImage';

import iconEditProfile from '../assets/icons/drawer/icon_edit_profile.png';

export default class FillProfileInfoScreen extends React.Component {
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
      gender: 'Male',
      selectedSports: '',
      date: new Date(),
      isMale: true,
      loggedIn: false,
      loaded: false,
      appIsReady: false,
      progress: 0,
      profileDataMissing: false
    };
  }

  componentWillMount() {
    I18n.initAsync();
    this.setState({
      appIsReady: true
    });

    const userGender = ObservableListStore.user.gender;
    const gender = userGender !== null && userGender.length ? ObservableListStore.user.gender : 'Male';

    this.setState({
      ...ObservableListStore.user,
      gender: gender,
      userfullname: ObservableListStore.user.name,
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

  getNavigationParams() {
    return this.props.navigation.state.params || {};
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  updateProfile() {
    this.uploadImage();
    const userEmail = this.state.email;
    const usersRef = myFirebase.database().ref('users');
    const emailReplaced = this.encodeAsFirebaseKeySimple(userEmail);
    const userRef = usersRef.child(emailReplaced);
    const updatedData = {
      name: this.state.userfullname,
      birthday: this.state.birthday,
      gender: this.state.gender,
      picturePath: this.state.picturePath
    };

    this.checkProfileData(updatedData);
    if (!this.state.profileDataMissing) {
      return;
    }
    ObservableListStore.updateUserData(updatedData);

    userRef.update(updatedData);
    // If empty selected sports then redirect
    if (!this.state.selectedSports.length) {
      this.props.navigation.navigate('Disciplines');
    }
    this.props.navigation.navigate('Dashboard');

  }

  checkProfileData(data) {

    if (!data.name.length) {
      this.displayAlert(I18n.t('edit_profile.warning'), I18n.t('edit_profile.name_missing'));
    } else if (!data.birthday.length) {
      this.displayAlert(I18n.t('edit_profile.warning'), I18n.t('edit_profile.birthday_missing'));
    } else {
      this.setState({ profileDataMissing: true });
    }
  }

  displayAlert(header, body) {
    Alert.alert(
      header,
      body,
      [
        { text: 'OK', onPress: () => console.log('Pressed') }
      ],
      { cancelable: true }
    );
  }

  changeGender = (gender) => {
    this.setState({
      isMale: gender === 'Male',
      gender
    });
  }

  _ImagePicker = async () => {
    const pickerResult = await Expo.ImagePicker.launchImageLibraryAsync(
      { allowsEditing: false, quality: 0.8, base64: true }
    );

    if (pickerResult.cancelled) {
      this.setState({ showProgress: false, progress: 0 });

      return;
    }
    this.setState({ picturePath: pickerResult.uri});
  }

  uploadImage() {
    const file = {
      uri: this.state.picturePath,
      name: `${uuid.v4()}.jpg`,
      type: 'image/jpeg'
    };

    const options = {
      ...awsConfig,
      keyPrefix: `${awsConfig.keyPrefix}${this.state.email}/`
    };

    RNS3.put(file, options).then(response => {
      if (response.status !== 201) throw new Error('Failed to upload image to S3');

      this.setState({ picturePath: response.body.postResponse.location, progress: 0 });

    });
  }

  render() {
    const errorMessage = null;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <BackgroundImage />

          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          {/* SUBMODULE TITLE */}
          <View style={styles.subTitle}>
            <View style={styles.inlineElements}>
              <Image source={iconEditProfile} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
              <Text style = {[ styles.textColorLight, { fontSize: 18, backgroundColor: 'transparent', color: 'white' } ]}>
                {I18n.t('edit_profile.your_profile').toUpperCase()}
              </Text>
              {/* <Text style = {[styles.textColorLight, {fontSize: 18}]}>{this.state.currentUser.email}</Text> */}
            </View>
          </View>

          <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 50, marginRight: 50, backgroundColor: '#A07CEB' }} />

          {/* AVATAR EDIT ICON */}
          <View style={styles.subScreenProfileHeader}>
            <Avatar
              xlarge
              rounded
              source={{ uri: this.state.picturePath }}
              onPress={this._ImagePicker}
              activeOpacity={0.7}
              avatarStyle={{ borderColor: '#A07CEB', borderWidth: 3 }}
            />
          </View>

          <View style={styles.profileBody}>
            {/* INPUT USER DATA */}
            <FormLabel labelStyle={styles.labelHeader}>{I18n.t('edit_profile.name')}</FormLabel>
            <FormInput
              keyboardType={'default'} keyboardAppearance='light' returnKeyType={'next'}
              onChangeText={(userfullname) => {
                this.setState({ userfullname });
              }} value={this.state.userfullname}
              underlineColorAndroid={'#A07CEB'} selectionColor={'#A07CEB'} inputStyle={{ color: '#fff', textAlign: 'center' }}
            />
            <FormValidationMessage>{errorMessage}</FormValidationMessage>

            <FormLabel labelStyle={styles.labelHeader}>{I18n.t('edit_profile.birthday')}</FormLabel>
            <View style = {{ flexDirection: 'row' }} >
              <FormInput
                maxLength={10} returnKeyType={'go'} onChangeText={(birthday) => this.setState({ birthday })}
                value={this.state.birthday} underlineColorAndroid={'#A07CEB'} selectionColor={'#A07CEB'}
                inputStyle={{ width: 200, color: '#fff', textAlign: 'center' }}
              />
              {/* DATEPICKER */}
              <DatePicker
                style={{ width: 30 }}
                date={this.state.date}
                mode='date'
                placeholder='select date'
                format='DD/MM/YYYY'
                hideText
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                // customStyles={{
                //   dateIcon: {
                //     position: 'absolute',
                //     // left: 0,
                //     // top: 4,
                //     // marginLeft: 0
                //   },
                //   // dateInput: {
                //     // marginLeft: 36
                //   // }
                // }}
                onDateChange={(date) => {
                  this.setState({ date, birthday: date });
                }}
              />
            </View>
            <FormValidationMessage>{errorMessage}</FormValidationMessage>

            {/* GENDER CHOICE */}
            <FormLabel labelStyle={styles.labelHeader}>{I18n.t('edit_profile.gender')}</FormLabel>
            <View style={styles.inlineSubLoc}>
              <Button
                type = 'select'
                label= 'edit_profile.male'
                disabled={this.state.isMale}
                disabledStyle={{ backgroundColor: '#47C0EC' }}
                onPress={() => this.changeGender('Male')}
              />
              <Button
                type = 'select'
                label= 'edit_profile.female'
                disabled={!this.state.isMale}
                disabledStyle={{ backgroundColor: '#47C0EC' }}
                onPress={() => this.changeGender('Female')}
              />
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Button
              label = 'buttons.save'
              onPress={() => {
                this.updateProfile();
              }}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
