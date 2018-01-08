import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import bgImageSmall from '../../assets/images/top_bg.png';
import bgImageMedium from '../../assets/images/top_bg_medium.png';
import bgImageLarge from '../../assets/images/top_bg_large.png';

export default class TopBackgroundImage extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf([ 'small', 'medium', 'large' ])
  }

  static defaultProps = {
    type: 'medium'
  }

  render() {
    const { type } = this.props;
    const heights = {
      small: 100,
      medium: 200,
      large: 250
    };
    const icons = {
      small: bgImageSmall,
      medium: bgImageMedium,
      large: bgImageLarge
    };

    return (
      <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#604798' }}>
        <Image
          style={{ width: '100%', resizeMode: 'cover', height: heights[type] }}
          source={icons[type]}
        />
      </View>
    );
  }
}
