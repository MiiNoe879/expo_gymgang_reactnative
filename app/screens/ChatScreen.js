import React, { Component } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import ObservableListStore from '../../utils/Store';

import FirebaseLinks from '../../firebaseContext/firebase_links';

import HeaderIcon from '../components/shared/HeaderIcon';

const axios = require('axios');

export default class ChatScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      appIsReady: false,
      yourKey: '',
      recieverKey: this.props.navigation.state.params.userKey,
      itemsRef: FirebaseLinks.notifications,
      senderName: '',
      messageText: '',
      messages: [],
      lastId: 0,
      init: 0
    };
  }

  componentWillMount() {
    const { user } = ObservableListStore;

    I18n.initAsync();
    this.setState({
      appIsReady: true,
      yourKey: user.key
    });

    this.getInitialMessages(user.key);
    this.listenForItems(user.key);
  }

  handleSending = ([ message ]) => {
    const { yourKey, recieverKey } = this.state;
    const formattedMessage = { ...message };

    formattedMessage.createdAt = new Date().getTime();

    formattedMessage._id = `${FirebaseLinks.messages.child(yourKey).child(recieverKey).push().key}a`;
    // formattedMessage._id = md5(Date().now)
    FirebaseLinks.messages.child(yourKey).child(recieverKey).push(formattedMessage);

    formattedMessage._id = `${FirebaseLinks.messages.child(yourKey).child(recieverKey).push().key}b`;
    // formattedMessage._id = md5(Date().now + 1)
    FirebaseLinks.messages.child(recieverKey).child(yourKey).push(formattedMessage);

    // const senderID = message.user._id;
    const yourName = this.props.navigation.state.params.receiverName;
    const receiverID = this.props.navigation.state.params.userKey;
    const text = message.text;
    
    let userRef = myFirebase.database().ref('users');
    userRef = userRef.child(receiverID);
    userRef.once('value', (dataSnapshot) => {
      const user = dataSnapshot.val();
      const token = user.token;

      if (token) {
        const data = {
          // 'to': 'ExponentPushToken[XEG_OdN5qeZCGBhGeOmIDL]',
          'to': token,
          'title': 'New Message From ' + yourName,
          'body': text,
          'data': {
            'body': text
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

  getSender(key) {
    return myFirebase.database().ref().child('users').child(key).once('value');
  }

  getInitialMessages(key) {
    const items = [];
    const callback = (snapshot) => {
      this.setState({ init: snapshot.val() });
      snapshot.forEach((childSnapshot) => {
        const val = childSnapshot.val();

        items.push(val);

        this.setState({
          items
        });

        childSnapshot.ref.update({ read: true });
      });

      if (this.state.items && this.state.items.length > 0) {
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, this.state.items.reverse())
        }));
      }
    };

    FirebaseLinks.messages.child(key).child(this.state.recieverKey).orderByChild('createdAt').once('value', callback);
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  addMessageToChat = (snapshot) => {
    const val = [ snapshot.val() ];

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, val)
    })
    );
  }

  listenForItems = (key) => {
    let first = true;

    FirebaseLinks.messages.child(key).child(this.state.recieverKey).limitToLast(1).on('child_added', (snapshot) => {
      if (this.state.init === null) {
        this.addMessageToChat(snapshot);
        this.setState({
          init: 0
        });
      }

      if (first) {
        first = false;
      } else {
        this.addMessageToChat(snapshot);
      }

      snapshot.ref.update({ read: true });
    });
  }

  _sendMessage = (messages = []) => {
    this.handleSending(messages);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.chatContainer}>
        {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}
        <GiftedChat
          showUserAvatar={false}
          messages={this.state.messages}
          onSend={this._sendMessage}
          user={{
            _id: this.state.yourKey
          }}
        />
        {/* Added to handle proper KeyboardAvoidingView */}
        <View style={{ height: 1 }} /> 
        <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
