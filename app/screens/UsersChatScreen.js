import React from 'react';
import { ScrollView, View } from 'react-native';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';

import ObservableListStore from '../../utils/Store';

import FirebaseLinks from '../../firebaseContext/firebase_links';

import styles from '../../styles.js';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';

@observer
export default class UsersChat extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    dataSource: null
  }

  componentWillMount() {
    this.getChats(ObservableListStore.user.key);
  }

  getChats = (key) => {
    FirebaseLinks.messages.child(key).once('value', (snap) => {
      const items = [];

      snap.forEach((childSnap) => {
        let unreadCount = 0;

        childSnap.forEach((messageSnap) => {
          if (!messageSnap.val().read) {
            unreadCount += 1;
          }
        });

        items.push({ userKey: childSnap.key, badge: unreadCount });
      });

      this.setState({ dataSource: items });
    });
  }

  openChat = ({ userKey }) => {
    this.props.navigation.navigate('Chat', { userKey });
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flex:1 }}>
        <BackgroundImage />

        {/* BODY */}
        <View style={{ flex: 1 }}>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='chat' label='friends.chat' />

          {this.state.dataSource
            ? (
              <PlainList
                dataSource={this.state.dataSource}
                keys = {{
                  key: 'userKey',
                  title: 'userKey'
                }}
                onPressItem = {this.openChat}
                containerStyle={styles.rowNormal}
              />
            )
            : null
          }
        </View>
      </ScrollView>
    );
  }
}

I18n.fallbacks = true;
