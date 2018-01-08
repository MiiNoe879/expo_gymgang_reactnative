import React from 'react';
import { View, Image, Text, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export default class InfoTab extends React.Component {
  static propTypes = {
    background: PropTypes.number.isRequired,
    chatPosition: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  }

  render() {
    const { background, chatPosition, onPress } = this.props;
    const { height } = Dimensions.get('window');

    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: '#00011D' }}>
        <Image source={background} style={{ width: '100%', height: '100%', resizeMode: 'contain', position: 'relative' }}>
          <View style={[ { width: 150, height: height * 0.18, position: 'absolute' }, chatPosition ]}>
            <ScrollView>
              <Text style={{ color: 'white', backgroundColor: 'transparent' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </Text>
            </ScrollView>
          </View>

          <View style={{ position: 'absolute', top: 20, right: 0, padding: 16 }}>
            <TouchableHighlight onPress={onPress}>
              <View>
                <Text style={{ color: '#897F87' }}>SKIP</Text>
              </View>
            </TouchableHighlight>
          </View>
        </Image>
      </View>
    );
  }
}
