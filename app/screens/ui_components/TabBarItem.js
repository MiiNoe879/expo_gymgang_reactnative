import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

export default class TabBarItem extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    days: PropTypes.number.isRequired,
    position: PropTypes.string,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    position: 'center',
    disabled: false
  }

  render() {
    const { index, days, position, disabled, onPress } = this.props;

    const style = {
      left: innerStyles.buttonLeft,
      right: innerStyles.buttonRight
    };

    return (
      <Button
        containerViewStyle={innerStyles.container}
        buttonStyle={[ innerStyles.button, style[position] || {} ]}
        textStyle={innerStyles.label}
        title={`${days} ${I18n.t('statistics.days')}`}
        disabled={disabled}
        disabledStyle={innerStyles.disabled}
        onPress={() => onPress(index)}
      />
    );
  }
}

const innerStyles = StyleSheet.create({
  container: {
    marginLeft: 1,
    marginRight: 1
  },
  button: {
    backgroundColor: '#9F86C9',
    borderRadius: 0,
    width: 65
  },
  buttonLeft: {
    borderRadius: 40,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  buttonRight: {
    borderRadius: 40,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  label: {
    textAlign: 'center'
  },
  disabled: {
    backgroundColor: '#47C0EC',
    margin: 0
  }
});
