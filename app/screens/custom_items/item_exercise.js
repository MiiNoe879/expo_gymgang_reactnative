import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from '../../../styles.js';

const BLANK_IMG = 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_neck_press.png?alt=media&token=3896e77e-4c14-4f51-9b10-15310eb99378';

export default class ItemExercise extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    img: PropTypes.string
  }

  static defaultProps = {
    title: '',
    img: ''
  }

  render() {
    const { img, title } = this.props;

    return (
      <View style={styles.itemExercise}>
        <Image
          style={styles.exerciseImg}
          source={img ? { uri: img } : BLANK_IMG}
        />
        <Text style={[ styles.exerciseText, styles.text ]}>{title}</Text>
      </View>
    );
  }
}
