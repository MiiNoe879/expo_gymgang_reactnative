import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import AvatarSubInfo from '../components/AvatarSubInfo';
import HeaderIcon from '../components/shared/HeaderIcon.js';
import ListIcon from '../components/shared/ListIcon.js';

import styles from '../../styles.js';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

import { getStatisticsMenuItems } from './data/menuItems.js';

export default class StatisticsScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    // this.itemsRef = myFirebase.database().ref();
    this.state = {
      appIsReady: false
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  render() {
    const { navigate } = this.props.navigation;
    const statistics = getStatisticsMenuItems(navigate);

    return (
      <View style = {styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => navigate('NotificationList')} />

          <AvatarSubInfo />

          <Badge type='stats' label='statistics.statistics' top={160} />

          {/* 4X GRID BUTTONS  */}
          <View style={styles.gridLayout}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {statistics.map(stat => <ListIcon key={stat.text} {...stat} />)}
            </View>
          </View>

          {/* <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={circ} style = {styles.bodyPartList}/>
            <Image source={graph} style = {styles.bodyPartList}/>

            <Text style = {{ color: '#fff', fontSize: 16,
            flexWrap:'wrap', width: 100, textAlign: 'center',
             justifyContent: 'center'}}>Training Calendar</Text>
          </View> */}

        </ScrollView>
      </View>

    );
  }
}

I18n.fallbacks = true;
