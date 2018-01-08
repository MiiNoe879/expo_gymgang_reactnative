import React, { Component } from 'react';
import I18n from 'ex-react-native-i18n';
import string_values from './string_values.js';
import { Notifications } from 'expo';


import { HomeStack } from './app/config/router';
console.disableYellowBox = true;

export default class App extends Component {
  async componentWillMount() {
    await I18n.initAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    if (notification.origin === 'received' && notification.data) {
      const data = notification.data;

      if (data.body) {
        alert(data.body);
      }
    }
  };

  render() {
    return <HomeStack />;
  }
}

I18n.fallbacks = true;
