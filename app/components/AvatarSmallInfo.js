import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';

import ObservableListStore from '../../utils/Store';

import myFirebase from '../../connection.js';

import LoaderImage from './LoaderImage.js';

export default class AvatarSmallInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      picturePath: '',
      loggedIn: false,
      loaded: false,
      appIsReady: false
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

  render = () => {
    return (
      <View style={innerStyles.drawerAvatarContainer}>
        {this.state.picturePath
          ? (
            <Avatar
              large
              rounded
              source={{ uri: this.state.picturePath }}
              activeOpacity={0.7}
              avatarStyle={innerStyles.avatar}
              containerStyle={innerStyles.container}
            />
          )
          : <LoaderImage />
        }
        <Text style={innerStyles.textDrawerAvatar}>{this.state.name}</Text>
        <Text style={[ innerStyles.textDrawerAvatar, innerStyles.textColorLight ]}>{this.state.email}</Text>
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  container: {
    marginBottom: 5
  },
  avatar: {
    borderColor: '#A07CEB',
    borderWidth: 2
  },
  drawerAvatarContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  textDrawerAvatar: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  textColorLight: {
    color: '#A07CEB'
  }
});

I18n.fallbacks = true;
