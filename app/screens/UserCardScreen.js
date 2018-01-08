import React, { Component } from 'react';
import { ScrollView, View, Image, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import { FormLabel, Text, Avatar, Icon } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';

import styles from '../../styles.js';

import ObservableListStore from '../../utils/Store';

import FirebaseLinks from '../../firebaseContext/firebase_links';
import myFirebase from '../../connection.js';

import Button from './ui_components/Button';
import TopBackgroundImage from './ui_components/TopBackgroundImage';
import TextTabBar from './ui_components/TextTabBar.js';
import DropdownList from './ui_components/DropdownList';
import CommonList from './ui_components/CommonList';

import errImg from '../assets/images/blank_avatar.png';
import iconTrainTogether from '../assets/icons/user_card/icon_train_together.png';
import iconChat from '../assets/icons/user_card/icon_chat.png';
import iconStar from '../assets/icons/user_card/star.png';
import iconStarFull from '../assets/icons/user_card/starFull.png';

const axios = require('axios');

const noImagePath = 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/blank_avatar.png?alt=media&token=d2fa3207-5c51-4ad0-8590-cea65f5768f0';

export default class UserCardScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      picturePath: noImagePath,
      selectedSports: '',
      avatar: errImg,
      itemsRef: FirebaseLinks.users,
      errImg,
      userKey: this.props.navigation.state.params.data.userKey,
      myFriends: this.props.navigation.state.params.data.myFriends || [],
      yourEmail: '',
      yourName: '',
      yourKey: '',
      friendSent: false,
      isMine: false,
      clubs: '',
      city: '',
      TTsend: false,
      inFriendList: false,
      dataLoaded: false,
      activeTab: 0,
      commonFriends: [],
      commonClubs: []
    };
  }

  componentWillMount() {
    I18n.initAsync();
    this.setState({ appIsReady: true });

    const { user, email } = ObservableListStore;

    this.setState({
      yourEmail: email,
      yourKey: user.key,
      yourName: user.name
    })

    this.checkFriendExistance(user.key);
    this.checkFriendNotificationSent(user.key);
  }

  componentDidMount() {
    this.listenForItems(this.state.itemsRef);
  }

  setUserData(user) {
    this.setState({
      name: user.name,
      email: user.email,
      picturePath: this.checkAvatar(user.picturePath),
      selectedSports: user.selectedSports,
      city: user.city
    });

    this.getFriendsInCommon();
    this.getClubs(this.state.yourEmail);
    this.getClubs(this.state.email);
  }

  getFriendsInCommon() {
    const FriendsRef = myFirebase.database().ref('friends');
    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.email);
    const myFriendsRef = FriendsRef.child(emailReplaced);

    myFriendsRef.once('value').then((snap) => {
      snap.forEach((itemKey, index) => {
        const friendKey = itemKey.val().friendKey;
        // Find user with friendKey
        const itemRef = myFirebase.database().ref(`users/${friendKey}`);

        itemRef.once('value', (snapshot) => {
          if ((this.state.myFriends || []).find(friend => friend.email === snapshot.val().email)) {
            this.setState({
              commonFriends: [ ...this.state.commonFriends, {
                name: snapshot.val().name,
                picturePath: this.checkAvatar(snapshot.val().picturePath),
                email: snapshot.val().email,
                _key: snapshot.key
              } ]
            });
          }
        });
      });
    });
  }

  getClubs(email) {
    const usersClubsRef = myFirebase.database().ref('usersClubs');
    const emailReplaced = this.encodeAsFirebaseKeySimple(email);
    const userClubsRef = usersClubsRef.child(emailReplaced);

    userClubsRef.once('value', (snap) => {
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
                [`clubs${email}`]: clubs || []
              });
            }

            if (email === this.state.email) {
              this.getClubsInCommon();
            }
          });
        });
      } else {
        this.setState({ dataLoaded: true });
      }
    });
  }

  getClubsInCommon() {
    const { email, yourEmail } = this.state;

    const myClubs = this.state[`clubs${yourEmail}`];
    const userClubs = this.state[`clubs${email}`];

    if (userClubs && myClubs) {
      this.setState({
        commonClubs: userClubs.filter(club => myClubs.find(myClub => myClub._key === club._key)),
        dataLoaded: true
      });
    }
  }

  listenForItems(itemsRef) {
    const userClubsRef = myFirebase.database().ref('usersClubs');

    itemsRef.child(this.state.userKey).once('value', (snapshot) => {
      const user = snapshot.val();
      // Find User data

      this.setUserData(user);
      // Find User Clubs data
      userClubsRef.child(this.encodeAsFirebaseKeySimple(user.email)).once('value').then((snap) => {
        // items are my clubs keys
        let itemsKeys = '';
        const clubs = [];
        // if (snap.val().selectedClubsKeys != 'undefined') {

        itemsKeys = snap.val().selectedClubsKeys.split(',');
        // }

        itemsKeys.forEach((itemKey, index) => {
          // Find club with itemKey
          const itemRef = myFirebase.database().ref(`clubs/${itemKey}`);

          itemRef.once('value', itemSnap => {
            // clubs.push({
            //   clubCity: itemSnap.val().city,
            //   name: itemSnap.val().name,
            //   _key: itemSnap.key
            // });
            clubs.push(
              // clubCity: itemSnap.val().city,
              itemSnap.val().name
              // _key: itemSnap.key
            );
            // Update at last key
            if (index === itemsKeys.length - 1) {
              this.setState({
                clubs
              });
            }
          });
        });
      })
        .catch(() => {
          this.setState({
            clubs: I18n.t('user_card.no_selected_clubs')
          });
        });
    });
  }

  // Delete item from firebase
  deleteFromMyFriends(itemKey) {
    // User clubs info
    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.yourEmail);
    const userFriendsRef = myFirebase.database().ref(`friends/${emailReplaced}`);
    const friendFriendsRef = myFirebase.database().ref(`friends/${itemKey}`);

    userFriendsRef.once('value', (snap) => {
      const friends = snap.val();
      const uids = Object.keys(friends);

      for (const uid of uids) {
        if (friends[uid].friendKey == itemKey) {
          userFriendsRef.child(uid).remove();
          return;
        }
      }
    });

    friendFriendsRef.once('value', (snap) => {
      const friends = snap.val();
      const uids = Object.keys(friends);

      for (const uid of uids) {
        if (friends[uid].friendKey == emailReplaced) {
          friendFriendsRef.child(uid).remove();
          return;
        }
      }
    });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  checkAvatar(img) {
    if (img !== undefined) {
      return img;
    }

    return noImagePath;
  }

  checkImg(img) {
    if ((img || 0) !== 0) {
      return { uri: img };
    }

    return this.state.errImg;
  }

  checkFriendExistance(key) {
    FirebaseLinks.friends.child(key).orderByChild('friendKey').equalTo(this.state.userKey).once('value', (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.toJSON();
        const snapKey = Object.keys(data)[0];

        this.setState({
          inFriendList: true,
          isFavourite: data[snapKey].isFavourite || false
        });
      }
    });
  }

  checkFriendNotificationSent(key) {
    FirebaseLinks.notifications.child(this.state.userKey).orderByChild('from').equalTo(key).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();

        if (item.type === 'fr') {
          this.setState({
            friendSent: true
          });
        }
      });
    });
  }

  sendFriendRequestNotification() {
    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.email);
    let userRef = myFirebase.database().ref('users');

    userRef = userRef.child(emailReplaced);
    userRef.once('value', (dataSnapshot) => {
      const user = dataSnapshot.val();
      const token = user.token;

      if (token) {
        const data = {
          'to': token,
          'title': 'Friend Request',
          'body': 'I hope to be Friend',
          'data': {
            'body': this.state.yourName + ' want to be Friend.'
          }
        };

        axios.post('https://exp.host/--/api/v2/push/send',
          JSON.stringify(data), {
            headers: {
              'accept': 'application/json',
              'accept-encoding': 'gzip, deflate',
              'content-type': 'application/json'
            }
          });
      }
    });
  }

  checkTTNotificationSent(key) {
    FirebaseLinks.notifications.child(this.state.userKey).orderByChild('from').equalTo(key).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();

        if (item.type === 'tt' && item.from === key) {
          this.setState({
            TTsend: true
          });
        }
      });
    });
  }

  addToFavourite = () => {
    this.setState({ isFavourite: !this.state.isFavourite });

    FirebaseLinks.friends.child(this.state.yourKey).orderByChild('friendKey').equalTo(this.state.userKey).once('value').then((snap) => {
      const data = snap.toJSON();
      const snapKey = Object.keys(data)[0];

      snap.ref.update({
        [snapKey] : {
          ...data[snapKey],
          isFavourite: this.state.isFavourite
        }
      });
    });
  }

  sendNewNotification(type) {
    FirebaseLinks.notifications.child(this.state.userKey).push(
      {
        type,
        from: this.state.yourKey
      }
    );

    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.email);
    let userRef = myFirebase.database().ref('users');

    userRef = userRef.child(emailReplaced);
    userRef.once('value', (dataSnapshot) => {
      const user = dataSnapshot.val();
      const token = user.token;

      if (token && type === 'tt') {
        const data = {
          // 'to': 'ExponentPushToken[XEG_OdN5qeZCGBhGeOmIDL]',
          'to': token,
          'title': 'Train Together',
          'body': 'I hope to Train Together',
          'data': {
            'body': this.state.yourName + ' want to train together.'
          }
        };

        axios.post('https://exp.host/--/api/v2/push/send',
          JSON.stringify(data), {
            headers: {
              'accept': 'application/json',
              'accept-encoding': 'gzip, deflate',
              'content-type': 'application/json'
            }
          });
      }
    });
  }

  sendTTRequest() {
    this.sendNewNotification('tt');
    this.checkTTNotificationSent(this.state.yourKey);
  }

  sendFriendRequest() {
    this.setState({ friendKey: true });
    this.sendNewNotification('fr');
    this.checkFriendNotificationSent(this.state.yourKey);
    this.sendFriendRequestNotification();
  }

  sendMessageNotification() {
    this.sendNewNotification('ms');
  }

  clickTrainTogether = () => {
    Alert.alert('Notice', 'Train Together request was sent');
    this.checkTTNotificationSent(this.state.yourKey);
    this.sendTTRequest();
  }

  clickAddToFriends = () => {
    this.sendFriendRequest();
    Alert.alert('Notice', 'Sended Friend Request to user');
  }

  clickGoToChat = () => {
    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.email);
    this.props.navigation.navigate('Chat', { userKey: this.state.userKey, receiverEmail: emailReplaced, yourName: this.state.yourName });
  }

  encodeAsFirebaseKeySimple(string) {
    return string.replace(/\./g, ',');
  }

  changeActiveTab = ({ index }) => {
    this.setState({ activeTab: index });
  }

  openUserCard = (item) => {
    this.props.navigation.navigate('UserCard', { data: { userKey: item._key, myFriends: this.state.myFriends } });
  }

  openClubCard = (item) => {
    this.props.navigation.navigate('Club', { data: item._key });
  }

  renderProfileData = ({ title, value }) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <FormLabel labelStyle={styles.labelHeader}>{I18n.t(title)}</FormLabel>
        <Text style={styles.textHeaderName}>{this.state[value]}</Text>
      </View>
    );
  }

  renderIconedButton = ({ icon, label, disabled, onPress, isVisible = true }) => {
    return isVisible
      ? (
        <TouchableHighlight
          style={styles.itemProfileIcon}
          onPress={onPress}
          disabled={disabled}
          underlayColor='#A07CEB'
        >
          <View style={{ flexDirection: 'column', alignItems: 'center' }} >
            <Image
              style={{
                width: 80,
                height: 50,
                margin: 8,
                resizeMode: 'contain'
              }}
              source={icon}
            />
            <Text style={[ styles.textFooterName, { fontSize: 14, marginTop: 0 } ]}>{I18n.t(label)}</Text>
          </View>
        </TouchableHighlight>
      )
      : null;
  }

  render() {
    const { inFriendList, name, picturePath, city, friendSent, userKey, TTsend, activeTab, isFavourite } = this.state;
    const iconedButtons = [
      { label: 'user_card.train_together', icon: iconTrainTogether, disabled: TTsend, onPress: this.clickTrainTogether },
      { label: 'user_card.chat', icon: iconChat, onPress: this.clickGoToChat, isVisible: inFriendList },
      { label: 'user_card.favourite', icon: isFavourite ? iconStarFull : iconStar, onPress: this.addToFavourite, isVisible: inFriendList }
    ];
    const tabs = [
      { index: 0, name: I18n.t('user_card.tab_friends') },
      { index: 1, name: I18n.t('user_card.tab_clubs') }
    ];

    return (
      <ScrollView style={styles.container}>
        <TopBackgroundImage type='large' />

        <View style={{ flex: 1 }}>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          {/* AVATAR */}
          <View style={{ alignItems: 'center', marginTop: 20, paddingBottom: 16 }}>
            <Avatar
              large
              rounded
              source={picturePath ? { uri: picturePath } : errImg}
              activeOpacity={0.7}
              avatarStyle={{ borderColor: '#A07CEB', borderWidth: 3 }}
            />

            <View style={{ flexDirection: 'row', marginTop: 16 }}>
              {city ? <Icon name='place' color='#fff' size={20} /> : null}
              <Text style={[ styles.textFooterName, { fontSize: 14 } ]}>{city || ''}</Text>
            </View>

            <Text style={[ styles.textFooterName, { fontSize: 24, marginTop: 0, lineHeight: 28 } ]}>
              {name}
            </Text>

            <Text style={[ styles.textFooterName, { fontSize: 14, marginTop: 0, color: '#239BDA' } ]}>
              {inFriendList ? I18n.t('user_card.friends') : ''}
            </Text>
          </View>

          {/* CONTENT */}
          <View style={styles.profileMenu}>
            {iconedButtons.map(this.renderIconedButton)}
          </View>

          <TextTabBar tabs={tabs} activeTab={activeTab} onPress={this.changeActiveTab} />

          {this.state.dataLoaded
            ? (
              <CommonList
                data={activeTab ? this.state.commonClubs : this.state.commonFriends}
                onPressItem={activeTab ? this.openClubCard : this.openUserCard}
              />
            )
            : <View style={{ width: '100%', height: 120, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color='white' size='large' />
            </View>
          }

          <DropdownList header={I18n.t('user_card.achievements')} type='medal' data={[ 'Test 1', 'Test 2', 'Test 3' ]} />
          <DropdownList header={I18n.t('user_card.challenges')} type='trophy' data={[ 'Test 1', 'Test 2', 'Test 3' ]} />
        </View>

        {inFriendList
          ? (<View style={[ styles.footer, { marginBottom: 16 } ]}>
            <Button
              type = 'danger'
              label= 'friends.delete_from_my_friends'
              onPress={() => {
                this.deleteFromMyFriends(userKey);
              }}
              disabled={!inFriendList}
            />
          </View>)
          : (<View style={[ styles.footer, { marginBottom: 16 } ]}>
            <Button
              label= 'friends.add_to_friends'
              onPress={this.clickAddToFriends}
              disabled={friendSent}
            />
            {friendSent
              ? <Text style={{ width: '100%', textAlign: 'center', color: 'white' }}>Friend request is pending</Text>
              : null
            }
          </View>)
        }
      </ScrollView>
    );
  }
}

I18n.fallbacks = true;
