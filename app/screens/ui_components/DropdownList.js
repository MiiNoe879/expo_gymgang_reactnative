import React from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import iconMedal from '../../assets/icons/user_card/medal.png';
import iconTrophy from '../../assets/icons/user_card/trophy.png';
import iconMinus from '../../assets/icons/define_exercises/icon_remove_exercise.png';
import iconPlus from '../../assets/icons/define_exercises/icon_add_exercise.png';

export default class DropdownList extends React.Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array,
    type: PropTypes.oneOf([ 'medal', 'trophy' ])
  }

  static defaultProps = {
    data: [],
    type: 'medal'
  }

  state = {
    isOpen: true
  }

  changeOpenStatus = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  renderListItem = (item) => {
    return (
      <View style={innerStyles.itemContainer} key={item}>
        <View style={innerStyles.bulb} />

        <Text style={innerStyles.itemLabel}>{item}</Text>
      </View>
    );
  }

  render() {
    const { data, type, header } = this.props;

    const icons = {
      medal: iconMedal,
      trophy: iconTrophy
    };

    return (
      <View style={{ paddingTop: 16 }}>
        <TouchableHighlight onPress={this.changeOpenStatus} underlayColor='rgba(255,255,255,0.2)'>
          <View style={innerStyles.header}>
            <Image source={icons[type]} style={innerStyles.icon} />
            <Text style={innerStyles.headerLabel}>{header.toUpperCase()}</Text>
            <Image source={this.state.isOpen ? iconMinus : iconPlus} style={innerStyles.icon} />
          </View>
        </TouchableHighlight>

        {this.state.isOpen
          ? (
            <View style={innerStyles.list}>
              {data.map(this.renderListItem)}
            </View>
          )
          : null
        }
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#7151B3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  headerLabel: {
    flex: 1,
    paddingLeft: 16,
    color: 'white',
    fontWeight: '600'
  },
  itemContainer: {
    margin: 16,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bulb: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
    backgroundColor: 'white'
  },
  itemLabel: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14
  }
});
