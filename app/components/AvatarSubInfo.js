import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Icon } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';

import ObservableListStore from '../../utils/Store';

import myFirebase from '../../connection.js';

import LoaderImage from './LoaderImage.js';

export default class AvatarSubInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      picturePath: '',
      countryName: '',
      countryCode: '',
      regionName: '',
      city: '',
      loggedIn: false,
      loaded: false,
      appIsReady: false
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
    this.getGeolocation();

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

  getGeolocation() {
    this.setState({ ...ObservableListStore.coordinates });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  render = () => {
    return (
      <View style={innerStyles.subScreenHeader}>
        {this.state.picturePath
          ? (
            <Avatar
              large
              rounded
              source={{ uri: this.state.picturePath }}
              activeOpacity={0.7}
              avatarStyle={{ borderColor: '#A07CEB', borderWidth: 3 }}
            />
          )
          : <LoaderImage />
        }
        <View style={innerStyles.inlineSubLoc}>
          <Icon name='place' color='#fff' size={20} />
          <Text style={innerStyles.textHeaderLoc}>{this.state.city}, {this.state.countryName}</Text>
        </View>
        <Text style={innerStyles.textHeaderName}>{this.state.name}</Text>
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  subScreenHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  inlineSubLoc: {
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textHeaderLoc: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  textHeaderName: {
    color: '#fff',
    marginTop: 4,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  }
});

I18n.fallbacks = true;
