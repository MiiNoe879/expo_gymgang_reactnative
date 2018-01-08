import React from 'react';
import { Image, TouchableHighlight, StyleSheet } from 'react-native';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

@observer
export default class ItemIcon extends React.Component {
  static propTypes = {
    readOnly: PropTypes.bool,
    icon: PropTypes.object,
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    readOnly: false,
    icon: {}
  }

  render() {
    const { readOnly, onPress, icon } = this.props;

    return (
      <TouchableHighlight
        disabled={readOnly}
        onPress={onPress}
        underlayColor='#91C02F'
      >
        <Image
          style={[ innerStyles.icon, { opacity: readOnly ? 0.5 : 1 } ]}
          source={icon}
        />
      </TouchableHighlight>
    );
  }
}

const innerStyles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    marginBottom: 10,
    resizeMode: 'contain'
  }
});

I18n.fallbacks = true;
