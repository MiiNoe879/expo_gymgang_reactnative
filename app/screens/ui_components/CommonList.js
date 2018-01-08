import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

export default class CommonList extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onPressItem: PropTypes.func
  }

  static defaultProps = {
    data: [],
    onPressItem: () => {}
  }

  renderItem = (item) => {
    return (
      <TouchableHighlight onPress={this.props.onPressItem.bind(null, item)} underlayColor='rgba(255,255,255,0.2)'>
        <View style={innerStyles.itemContainer}>
          <Avatar
            large
            rounded
            source={item.picturePath}
            activeOpacity={0.7}
            avatarStyle={innerStyles.avatar}
          />

          <Text style={innerStyles.header}>{item.name}</Text>
          {item.city
            ? <Text style={innerStyles.subtitle}>{item.city}</Text>
            : <Text style={innerStyles.subheader}>{I18n.t('user_card.friends').toUpperCase()}</Text>
          }
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow : 1, justifyContent : 'center' }} horizontal showsHorizontalScrollIndicator={false}>
        <View style={innerStyles.container}>
          {this.props.data.length
            ? this.props.data.map(this.renderItem)
            : <Text style={innerStyles.subtitle}>No mutual data</Text>}
        </View>
      </ScrollView>
    );
  }
}

const innerStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 32
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 24
  },
  avatar: {
    borderColor: '#A07CEB',
    borderWidth: 3
  },
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600'
  },
  subheader: {
    color: '#4D7DBE',
    fontSize: 14,
    fontWeight: '600'
  }
});
