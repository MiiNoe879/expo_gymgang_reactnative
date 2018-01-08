import React, { Component } from 'react';
import { View, Image, ScrollView, KeyboardAvoidingView, StyleSheet, Dimensions, TouchableOpacity, Text, Linking } from 'react-native';
import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';

import styles from '../../styles.js';

import logoImage from '../assets/images/gymgang_logo.png';

import BackgroundImage from './ui_components/BackgroundImage';
import I18n from 'ex-react-native-i18n';
import profoodAd from './../assets/ads/profoodAd.jpg';

// Alex work for update shop screen
export default class Shop extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  onClickAdvertise() {
    const url = 'http://gymgang.co';

    Linking.openURL(url);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />

          <View style={styles.header}>

            <Image
              style={styles.logo}
              source={logoImage}
            />

            <View style={innerStyles.list}>
              <TouchableOpacity style={innerStyles.advertisement} onPress={() => Linking.openURL('http://profood.net.pl')}>
                <Image
                  style={innerStyles.ad}
                  source={profoodAd}
                />
              </TouchableOpacity>

              <Text style={innerStyles.label}>{I18n.t('shop.click_on_ad')}</Text>

              <TouchableOpacity style={innerStyles.advertisement} onPress={() => Linking.openURL('http://prozis.com/1jMm')}>
                <Text style={innerStyles.advertisementText}>10% na suplementy marki PROZIS/XCORE z kodem: GYMGANG10</Text>
              </TouchableOpacity>
              <TouchableOpacity style={innerStyles.advertisement} onPress={() => this.onClickAdvertise()}>
                <Text style={innerStyles.advertisementText}>{I18n.t('shop.place_for_ad')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={innerStyles.advertisement} onPress={() => this.onClickAdvertise()}>
                <Text style={innerStyles.advertisementText}>{I18n.t('shop.place_for_ad')}d</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const  width = Dimensions.get('window').width;

const innerStyles = StyleSheet.create({
  label:{
    color: 'white',
    display: 'flex',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  advertisement:{
    width: (width) - 30,
    height: (width / 2) - 30,
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'steelblue',
    backgroundColor: '#60449A',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ad: {
    width: (width) - 30,
    height: (width / 2) - 30
  },
  advertisementText: {
    color: 'white'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
});
