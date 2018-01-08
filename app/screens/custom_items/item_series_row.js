import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormInput } from 'react-native-elements';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import ItemIcon from './item_icon.js';

import iconAdd from '../../assets/icons/define_exercises/icon_add_exercise.png';
import iconRemove from '../../assets/icons/define_exercises/icon_remove_exercise.png';

@observer
export default class ItemSeriesRow extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    readOnly: PropTypes.bool,
    keyboardDisabled: PropTypes.bool,
    minus: PropTypes.func.isRequired,
    plus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    label: '',
    type: 'main',
    readOnly: false,
    keyboardDisabled: false
  }

  render() {
    const { label, value, type, readOnly, keyboardDisabled, plus, minus, onChange } = this.props;

    return (
      <View style={type !== 'sub' ? innerStyles.itemSeries : innerStyles.subSeries}>
        <View style={innerStyles.seriesWrap}>
          <Text style={[ innerStyles.seriesText, { backgroundColor: 'transparent' } ]}>{label}</Text>
        </View>

        <View style={[ innerStyles.seriesWrap, { justifyContent: 'flex-end' } ]}>
          <View style={innerStyles.seriesTextWrapCounter}>
            {!keyboardDisabled
              ? (
                <FormInput
                  style = {[ innerStyles.textDrawerBody, innerStyles.seriesTextCounter, innerStyles.seriesText ]}
                  keyboardType={'numeric'}
                  placeholder = {''}
                  maxLength={3}
                  textAlign={'center'}
                  keyboardAppearance='light'
                  returnKeyType={'next'}
                  onChangeText={(repeats) => {
                    onChange(repeats);
                  }}
                  value={value}
                  underlineColorAndroid={'#A07CEB'}
                  selectionColor={'#A07CEB'}
                  inputStyle={{ color: '#fff', textAlign: 'center' }}
                />
              )
              : <Text style={[ innerStyles.seriesText, innerStyles.seriesTextCounter, { backgroundColor: 'transparent' } ]}>{value}</Text>
            }
          </View>

          <ItemIcon
            icon = {iconAdd}
            onPress = {plus}
            readOnly = {readOnly}
          />

          <ItemIcon
            icon = {iconRemove}
            onPress = {minus}
            readOnly = {readOnly}
          />
        </View>
      </View>
    );
  }
}


const innerStyles = StyleSheet.create({
  itemSeries: {
    borderColor: '#fff',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  seriesTextWrapCounter: {
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    flexDirection:'row',
    marginRight: 10
  },
  seriesWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection:'row'
  },
  subSeries: {
    marginBottom: 20,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  seriesText: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10
  },
  seriesTextCounter: {
    color: '#88C3E9'
  },
  itemSeriesCount: {
    paddingBottom: 10
  },
  textDrawerBody: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 1,
    width: 80
  }
});
