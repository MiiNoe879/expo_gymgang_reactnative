import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default class LoaderImage extends Component {
  render() {
    return (
      <View style={{ borderColor: '#A07CEB', borderWidth: 3, width: 75, height: 75, borderRadius: 38, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color='white' />
      </View>
    );
  }
}
