import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import iconShare from '../../assets/icons/my_clubs/share.png';
import iconsShareChecked from '../../assets/icons/my_clubs/shareChecked.png';
import iconRate from '../../assets/icons/my_clubs/rate.png';
import iconRateChecked from '../../assets/icons/my_clubs/rateChecked.png';
import removeIcon from '../../assets/icons/existing_trainings/remove_icon.png';
import editIcon from '../../assets/icons/existing_trainings/edit_icon.png';
import addIcon from '../../assets/icons/shared/addIcon.png';

export default class IconButton extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf([ 'share', 'rate' ]),
    isLeft: PropTypes.bool,
    isChecked: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    label: 'Submit',
    type: 'action',
    isLeft: false,
    isChecked: false
  }

  render() {
    const { label, type, isLeft, isChecked, onPress } = this.props;

    const icons = {
      share: isChecked ? iconsShareChecked : iconShare,
      rate: isChecked ? iconRateChecked : iconRate,
      favourite: isChecked ? iconRateChecked : iconRate,
      edit: editIcon,
      remove: removeIcon,
      add: addIcon
    };

    return (
      <TouchableHighlight onPress={onPress} underlayColor='rgba(255,255,255,0.2)'>
        <View style={[ innerStyles.container, isLeft ? innerStyles.containerLeft : {} ]}>
          <Image source={icons[type]} style={innerStyles.icon} />

          <Text style={innerStyles.label} adjustsFontSizeToFit={false}>{label}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const innerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8
  },
  containerLeft: {
    borderRightWidth: 1,
    borderColor: '#9E80F6'
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  label: {
    color: 'white',
    fontSize: 12
  }
});
