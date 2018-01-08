import React from 'react';
import { View } from 'react-native';

import ScaledImage from '../../components/ScaledImage';

import bgImage from '../../assets/images/foto_bg.jpg';

export default class BackgroundImage extends React.Component {
  render() {
    return (
      <View style={{ position: 'absolute' }}>
        <ScaledImage
          style={{ resizeMode: 'cover' }}
          source={bgImage}
          originalWidth={865}
          originalHeight={1536}
        />
      </View>
    );
  }
}
