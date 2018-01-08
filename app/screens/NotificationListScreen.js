import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import FirebaseLinks from '../../firebaseContext/firebase_links';

import ObservableListStore from '../../utils/Store';

import HeaderIcon from '../components/shared/HeaderIcon';

import Button from './ui_components/Button';
import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';

export default class MyClubsScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      appIsReady: false,
      dataSource: null,
      yourKey: '',
      itemsRef: FirebaseLinks.notifications,
      senderName: ''
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
    });

    this.listenForItems(this.state.itemsRef, user.key);
  }

  getSender(key) {
    return myFirebase.database().ref().child('users').child(key).once('value');
  }

  async setPopUpData(data) {
    await this.setState({
      title: data.title,
      key: data.SenderKey,
      userKey: data.SenderKey,
      itemKey: data.itemKey,
      type: data.type
    });
  }

  recognizeReq = (type, name) => {
    if (type === 'fr') {
      return (`Friend request from ${name}`);
    }

    if (type === 'tt') {
      return (`${name} wants train together with you`);
    }
  }

  listenForItems(itemsRef, key) {
    const items = [];

    itemsRef.child(key).on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const val = childSnapshot.val();

        if (val.from) {
          this.getSender(val.from).then((snap) => {
            items.push({
              title: (this.recognizeReq(val.type, snap.val().name)),
              type: val.type,
              SenderKey: snap.key,
              itemKey: childSnapshot.key
            });

            this.setState({
              dataSource: [ ...items ]
            });
          }).catch(e => {
            console.log(e.message);
          });
        }
      });
    });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  deleteItem = (key) => {
    this.popupDialog.dismiss();
    FirebaseLinks.notifications.child(this.state.yourKey).child(key).remove();
    this.listenForItems(this.state.itemsRef, this.state.yourKey);
  }

  answerReq = (type) => {
    const receiverEmail = this.state.yourKey;
    const userName = this.state.yourName;
    const userKey = this.state.userKey;

    if (type === 'fr') {
      this.addToFriendList();
    }

    if (type === 'tt') {
      this.trainTogether();
      this.props.navigation.navigate('Chat', { userKey: userKey, receiverEmail: receiverEmail, yourName: userName });
    }
  }

  addToFriendList = () => {
    this.deleteItem(this.state.itemKey);
    FirebaseLinks.friends.child(this.state.yourKey).push({ friendKey: this.state.key });
    FirebaseLinks.friends.child(this.state.key).push({ friendKey: this.state.yourKey });

    this.popupDialog.dismiss();
  }

  trainTogether = () => {
    this.addToFriendList();
    this.props.navigation.navigate('Chat', { userKey: this.state.userKey });
  }

  clickRequest = (data) => {
    this.setPopUpData(data);
    this.popupDialog.show();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        {/* DIALOG WINDOW */}
        <PopupDialog
          dialogTitle={<DialogTitle title={this.state.title} />}
          ref={(popupDialog) => {
            this.popupDialog = popupDialog;
          }}
        >
          <View>
            <Button
              label= 'train_together.yes'
              onPress={() => this.answerReq(this.state.type)}
            />
            <Button
              type = 'danger'
              label= 'train_together.no'
              onPress={() => this.deleteItem(this.state.itemKey)}
            />
            {/* <Button title="Yes" onPress={ () => this.addToFriendList() }/>
            <Button title="No" onPress={ () => this.deleteItem(this.state.itemKey) }/> */}
          </View>
        </PopupDialog>

        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />

          <Badge type='notifications' label='notifications.notifications' />

          {this.state.dataSource
            ? (
              <PlainList
                dataSource={this.state.dataSource}
                keys = {{
                  key: 'title',
                  title: 'title'
                }}
                onPressItem = {this.clickRequest}
                containerStyle={[ styles.rowNormal, { width: '100%' } ]}
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
