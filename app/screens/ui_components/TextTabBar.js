import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class TextTabBar extends React.Component {
  static propTypes = {
    activeTab: PropTypes.array,
    tabs: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    activeTab: 0
  }

  renderTab = (tab) => {
    const isActive = this.props.activeTab === tab.index;

    return (
      <TouchableHighlight key={tab.name} onPress={this.props.onPress.bind(null, tab)}>
        <View style={[ innerStyles.tab, isActive ? innerStyles.activeTab : {} ]}>
          <Text style={[ innerStyles.tabLabel, isActive ? innerStyles.activeTabLabel : {} ]}>
            {tab.name.toUpperCase()}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={innerStyles.inlineButtons}>
        {this.props.tabs.map(this.renderTab)}
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  inlineButtons: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tab: {
    padding: 8,
    borderBottomWidth: 2,
    borderColor: 'transparent'
  },
  activeTab: {
    borderColor: '#4988C5'
  },
  tabLabel: {
    fontSize: 16,
    color: '#7151B3',
    fontWeight: '600'
  },
  activeTabLabel: {
    color: 'white'
  }
});
