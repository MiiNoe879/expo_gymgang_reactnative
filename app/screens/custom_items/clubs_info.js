import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import styles from '../../../styles.js';

export default class ClubInfo extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf([ 'short', 'general' ]),
    data: PropTypes.object.isRequired
  }

  static defaultProps = {
    type: 'general'
  }

  renderDataRow = (rowData) => {
    return (
      <View style={{ marginBottom: 24 }}>
        <Text style={[ styles.labelHeader, { alignSelf: 'center', backgroundColor: 'transparent' } ]}>{I18n.t(`clubs.${rowData.label}`)}</Text>
        {!Array.isArray(rowData.value)
          ? <Text style={[ styles.bodyParttext, { backgroundColor: 'transparent' } ]}>{rowData.value}</Text>
          : rowData.value.map(valueItem => (<Text key={valueItem} style={[ styles.bodyParttext, { backgroundColor: 'transparent' } ]}>{valueItem}</Text>))
        }
      </View>
    );
  }

  render() {
    const { data, type } = this.props;

    const info = [
      { label: 'locale', value: data.locale },
      { label: 'address', value: data.address },
      { label: 'schedule', value: data.schedule },
      { label: 'phone', value: data.phone }
    ];

    const infoShort = [
      { label: 'address', value: data.address }
    ];

    return (
      <View style={[ styles.itemBodyPart, { alignItems: 'center', paddingTop: 24 } ]} >
        {data.img
          ? (
            <Avatar
              large
              rounded
              source={{ uri: data.img }}
              avatarStyle={innerStyles.avatar}
              containerStyle={innerStyles.container}
            />
          )
          : <View style={{ width: 60, height: 60, borderWidth: 2, borderRadius: 30, borderColor: '#9F7EE7' }} />}


        <Text style={{ color: 'white', fontSize: 18, margin: 24, backgroundColor: 'transparent' }}>{data.name}</Text>

        {type === 'short'
          ? infoShort.map(this.renderDataRow)
          : info.map(this.renderDataRow)
        }
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  container: {
    marginBottom: 5
  },
  avatar: {
    borderColor: '#A07CEB',
    borderWidth: 2
  },
  drawerAvatarContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  textDrawerAvatar: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  textColorLight: {
    color: '#A07CEB'
  }
});
