import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export default class ScaledImage extends Component {
  static propTypes = {
    originalHeight: PropTypes.number,
    originalWidth: PropTypes.number,
    source: PropTypes.oneOfType([ PropTypes.object, PropTypes.number ]).isRequired
  }

  static defaultProps = {
    originalHeight: 40,
    originalWidth: 40
  }

  render() {
    const { originalHeight, originalWidth, source } = this.props;
    const windowWidth = Dimensions.get('window').width;
    const widthChange = (windowWidth) / originalWidth;
    const newWidth = originalWidth * widthChange;
    const newHeight = originalHeight * widthChange;

    return (
      <Image source={source} style={{ width: newWidth, height: newHeight }} />
    );
  }
}
