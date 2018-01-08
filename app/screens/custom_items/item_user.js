import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from '../../../styles.js';

import blankAvatar from '../../assets/images/blank_avatar.png';

export default class ItemUser extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    img: PropTypes.string,
    click: PropTypes.func
  }

  static defaultProps = {
    title: '',
    img: '',
    click: () => {}
  }

  render() {
    const { img, title, click } = this.props;

    return (
      <TouchableHighlight onPress={click} style={{ height: 125, borderRadius: 0 }} underlayColor='#91C02F'>
        <View style={styles.itemUser}>
          <Image
            style={styles.exerciseImage}
            source={img ? { uri: img } : blankAvatar}
          />
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
