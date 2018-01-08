import React from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from '../../../styles.js';

export default class ItemBodyPart extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    img: PropTypes.string,
    click: PropTypes.func,
    isPerson: PropTypes.boolean
  }

  static defaultProps = {
    title: '',
    img: '',
    click: () => {},
    isPerson: false
  }

  render() {
    const { img, title, click } = this.props;

    return (
      <TouchableHighlight onPress={click} style={{ borderRadius: 0 }} underlayColor='#91C02F'>
        <View style={styles.itemBodyPart} >
          <Image
            style={styles.exerciseImage}
            source={{ uri: img }}
          />
          <Text style={this.props.isPerson ? innerStyles.header : styles.bodyParttext}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const innerStyles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
  }
})
