import React from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator, Image } from 'react-native';
import PropTypes from 'prop-types';

import searchIcon from '../../assets/icons/shared/search.png';

export default class CustomSearchBar extends React.Component {
  static propTypes = {
    showLoadingIcon: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired
  }

  static defaultProps = {
    showLoadingIcon: false
  }

  render() {
    const { showLoadingIcon, onChangeText } = this.props;

    return (

      <View style={innerStyles.searchContainer}>
        <Image source={searchIcon} style={innerStyles.icon} tintColor='grey' />

        {!showLoadingIcon
          ? (
            <TextInput
              style={innerStyles.searchInput}
              placeholder='Type Here...'
              onEndEditing={(e) => onChangeText(e.nativeEvent.text)}
              underlineColorAndroid = 'transparent'
            />
          )
          : <ActivityIndicator />}
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 16,
    padding: 4,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: {
    color: 'grey',
    width: '90%'
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8
  }
});
