import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from 'ex-react-native-i18n';
import IconButton from './IconButton';

export class AddButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={innerStyles.addBtn}>
        <IconButton
          type={this.props.type}
          label={this.props.label}
          onPress={this.props.onPress}
        />
      </View>
    )
  }
}

const innerStyles = StyleSheet.create({
  addBtn:{
    position: 'absolute',
    top: 85,
    right: 0,
    flexDirection: 'row'
  }
})
