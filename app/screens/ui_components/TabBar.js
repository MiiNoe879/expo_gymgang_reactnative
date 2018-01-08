import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import TabBarItem from './TabBarItem.js';

import Prompt from 'react-native-prompt';

export default class TabBar extends React.Component {
  static propTypes = {
    onChangeActive: PropTypes.func.isRequired
  }

  state = {
    btnStates0: true,
    btnStates1: false,
    btnStates2: false,
    btnStates3: false,
    btnStates4: false,
    promptVisible: false
  }

  checkBtnState = async (btnIndex) => {
    await this.setState({
      btnStates0: false,
      btnStates1: false,
      btnStates2: false,
      btnStates3: false,
      btnStates4: false,
      [`btnStates${btnIndex}`]: true
    });
    if (btnIndex === 4) {
      this.setState({
        promptVisible: true
      });
    }
  }

  onSelectValue(value) {
    if (Number.isInteger(Number(value)) && Number(value) > 0) {
      this.setState({
        promptVisible: false,
        day: value
      });
    } else {
      alert('You must input integer greater than 0');
    }
  }

  render() {
    const tabs = [
      { index: 0, disabled: this.state.btnStates0, position: 'left', days: 14, onPress: this.checkBtnState },
      { index: 1, disabled: this.state.btnStates1, days: 30, onPress: this.checkBtnState },
      { index: 2, disabled: this.state.btnStates2, days: 60, onPress: this.checkBtnState },
      { index: 3, disabled: this.state.btnStates3, days: 90, onPress: this.checkBtnState },
      { index: 4, disabled: this.state.btnStates4, position: 'right', days: "Select", onPress: this.checkBtnState }
    ];

    return (
      <View style={innerStyles.inlineButtons}>
        {tabs.map(tab => (<TabBarItem key={tab.days} {...tab} />))}
        <Prompt
          title='Input Days'
          visible={this.state.promptVisible}
          onCancel={() => this.setState({
            promptVisible: false
          })}
          onSubmit={(value) => this.onSelectValue(value)}
        />
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  inlineButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
