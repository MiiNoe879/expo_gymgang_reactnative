import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

export default class TypedButton extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf([ 'action', 'default', 'danger', 'select', 'disabled', 'bg' ]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    buttonStyle: PropTypes.oneOfType([ PropTypes.object, PropTypes.number ]),
    disabledStyle: PropTypes.oneOfType([ PropTypes.object, PropTypes.number ]),
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    label: 'Submit',
    type: 'action',
    disabled: false,
    loading: false,
    buttonStyle: null,
    disabledStyle: null
  }

  render() {
    const { label, type, disabled, loading, disabledStyle, buttonStyle, onPress } = this.props;

    const style = {
      action: innerStyles.btnAction,
      default: innerStyles.btnDefault,
      danger: innerStyles.btnDanger,
      select: innerStyles.btnSelect,
      disabled: innerStyles.btnDisabled,
      bg: innerStyles.btnBg
    };

    return (
      <Button
        buttonStyle = {buttonStyle || [ innerStyles.btnContainer, style[type] ]}
        disabledStyle = {disabledStyle || {}}
        disabled={disabled}
        textStylse={innerStyles.textStyle}
        title={I18n.t(label)}
        onPress={onPress}
        loading={loading}
      />
    );
  }
}

const innerStyles = StyleSheet.create({
  btnContainer: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 30,
    overflow: 'hidden'
  },
  btnDisabled: {
    backgroundColor: '#E1E1E1'
  },
  btnAction: {
    backgroundColor: '#91C02F'
  },
  btnDanger: {
    backgroundColor: '#ff0000'
  },
  btnDefault: {
    backgroundColor: '#47C0EC'
  },
  btnBg: {
    backgroundColor: '#7C5CC4'
  },
  btnSelect: {
    backgroundColor: '#9F86C9',
    borderRadius: 40,
    marginTop: 10,
    width: 100
  },
  textStyle: {
    textAlign: 'center'
  }
});
