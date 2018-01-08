import React, { Component } from 'react';
import { View, TouchableHighlight, Image, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';

import ObservableListStore from '../../../utils/Store';

import iconBell from '../../assets/icons/dashboard/icon_navigation_bell.png';
import iconBack from '../../assets/icons/drawer/icon_back_2x.png';
import iconDrawer from '../../assets/icons/dashboard/icon_navigation_drawer_2x.png';

@observer
export default class HeaderIcon extends Component {
  static propTypes = {
    type: PropTypes.string,
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    type: 'back'
  }

  render() {
    const { type, onPress } = this.props;

    const icons = {
      back: iconBack,
      bell: iconBell,
      menu: iconDrawer
    };

    const badgeValue = type === 'bell' ? ObservableListStore.notificationsCount : 0;

    return (
      <View style={[ innerStyles.container, type !== 'bell' ? innerStyles.containerLeft : innerStyles.containerRight ]}>
        <TouchableHighlight onPress={onPress} underlayColor='#A07CEB'>
          <Image
            style={[ innerStyles.icon, type !== 'bell' ? innerStyles.iconLarge : innerStyles.iconSmall ]}
            source={icons[type]}
          />
        </TouchableHighlight>

        {badgeValue && type === 'bell'
          ? <View style={innerStyles.badge}>
            <Text style={innerStyles.badgeText}>{badgeValue}</Text>
          </View>
          : null
        }
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 26,
    zIndex: 1000
  },
  containerLeft: {
    left: 10
  },
  containerRight: {
    right: 20
  },
  icon: {
    height: 27,
    resizeMode: 'contain'
  },
  iconLarge: {
    width: 35
  },
  iconSmall: {
    width: 24
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#A07CEB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 8
  }
});
