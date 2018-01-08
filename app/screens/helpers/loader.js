import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

import styles from '../../../styles.js';

export default class Loader extends React.Component {
  static propTypes = {
    activate: PropTypes.bool
  }

  static defaultProps = {
    activate: false
  }

  render() {
    return (
      <View style={styles.spiner}>
        <Spinner
          visible={this.props.activate} textContent='Loading...' overlayColor={'#A07CEB'}
          textStyle={{ color: '#FFF' }}
        />
      </View>
    );
  }
}
