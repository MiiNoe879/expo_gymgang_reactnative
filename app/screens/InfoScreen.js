import React from 'react';
import { View, Dimensions } from 'react-native';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

import InfoTab from './ui_components/InfoTab.js';

import screen1 from '../assets/images/info/opis_1.png';
import screen2 from '../assets/images/info/opis_2.png';
import screen3 from '../assets/images/info/opis_3.png';
import screen4 from '../assets/images/info/opis_4.png';

@observer
export default class InfoScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const tabs = [
      { key: 'screen1', background: screen1, chatPosition: { top: height * 0.7, left: width * 0.3 } },
      { key: 'screen2', background: screen2, chatPosition: { top: height * 0.69, left: width * 0.3 } },
      { key: 'screen3', background: screen3, chatPosition: { top: height * 0.49, left: width * 0.3 } },
      { key: 'screen4', background: screen4, chatPosition: { top: height * 0.49, left: width * 0.3 } }
    ];

    return (
      <View style={{ flex: 1 }}>
        <Swiper dotColor='#897F87' activeDotColor='white' loop={false}>
          {tabs.map(tab => (<InfoTab key={tab.key} {...tab} onPress={() => this.props.navigation.navigate('Drawer')} />))}
        </Swiper>
      </View>
    );
  }
}

I18n.fallbacks = true;
