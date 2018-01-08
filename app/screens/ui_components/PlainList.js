import React from 'react';
import { ListView, StyleSheet, Image, View, Text, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import checkedIcon from '../../assets/icons/shared/checked.png';
import iconCircle from '../../assets/icons/shared/iconCircle.png';

export default class PlainList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    containerStyle: PropTypes.object,
    keys: PropTypes.object.isRequired,
    checkedItems: PropTypes.array,
    dataSource: PropTypes.array.isRequired,
    renderRightControl: PropTypes.func,
    onPressItem: PropTypes.func,
    onCheckSelected: PropTypes.func,
    onLongPressItem: PropTypes.func
  }

  static defaultProps = {
    title: '',
    containerStyle: null,
    renderRightControl: null,
    checkedItems: [],
    onPressItem: () => {},
    onCheckSelected: () => {},
    onLongPressItem: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  }

  componentWillMount() {
    this.updateData();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource || nextProps.checkedItems !== this.props.checkedItems) {
      this.updateData(nextProps.dataSource);
    }
  }

  updateData = (dataSource) => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows((dataSource || this.props.dataSource).filter(item => item))
    });
  }

  renderItem = () => {

  }

  renderAvatar(keys, rowData) {
    if (keys.avatar === 'cardioImg') {
      switch (rowData.name) {
        case 'bike':
          return require('../../assets/icons/cardio_exercise/icon_bike.png');
          break;
        case 'track':
          return require('../../assets/icons/cardio_exercise/icon_track.png');
          break;
        case 'elliptical':
          return require('../../assets/icons/cardio_exercise/icon_orbitrek.png');
          break;
        case 'stairs':
          return require('../../assets/icons/cardio_exercise/icon_stairs.png');
          break;
        case 'rower':
          return require('../../assets/icons/cardio_exercise/icon_rower.png');
          break;
        default:
          break;
      }
    } else {
      if (rowData[keys.avatar] == 0){
        return null;
      }

      return keys.avatar ? { uri:rowData[keys.avatar || 'avatar_url'] } : null;
    }
  }

  renderRow = (rowData) => {
    const { title, keys, containerStyle, checkedItems, renderRightControl,
      onPressItem, onLongPressItem, onCheckSelected } = this.props;
    const isChecked = onCheckSelected ? onCheckSelected(rowData.name) : false;

    const isCheckedRow = !!checkedItems.find(item => rowData.exerciseName === item.exerciseName);
    const windowWidth = Dimensions.get('window').width;
    return (
      <View style={[ innerStyles.itemContainer, isCheckedRow ? innerStyles.checkedContainer : {} ]} key={rowData[keys.key || 'exerciseName']}>
        <ListItem
          roundAvatar
          key={rowData[keys.key || 'exerciseName']}
          titleNumberOfLines={0}
          title={title ? I18n.t(`${title}.${rowData.name}`, {defaultValue: rowData.name}) : rowData[keys.title || 'exerciseName']}
          bodyPart={this.props.bodyPart ? this.props.bodyPart : null}
          subtitle={keys.subtitle ? rowData[keys.subtitle || 'city'] : ''}
          avatar={this.renderAvatar(keys, rowData)}
          onPress={checkedItems.length ? onLongPressItem.bind(null, rowData) : onPressItem.bind(null, rowData)}
          onLongPress={onLongPressItem.bind(null, rowData)}
          containerStyle={[
            containerStyle || innerStyles.container,
            isChecked ? innerStyles.checkedContainer : {},
            isCheckedRow ? { backgroundColor: 'transparent' } : {},
            renderRightControl || checkedItems.length || rowData.badge !== undefined ? { width: windowWidth - 50 } : {}
          ]}
          wrapperStyle={innerStyles.wrapper}
          chevronColor={'#fff'}
          underlayColor = 'transparent'
          rightIcon = {isChecked ? <Image source={checkedIcon} style={innerStyles.icon} /> : { name: 'chevron-right' }}
          titleStyle={innerStyles.title}
          subtitleStyle={innerStyles.subtitle}
        />

        {renderRightControl && !checkedItems.length ? renderRightControl(rowData) : null}

        {checkedItems.length
          ? <Image source={isCheckedRow ? checkedIcon : iconCircle} style={innerStyles.checkedIcon} />
          : null
        }

        {rowData.badge !== undefined
          ? <View style={[ innerStyles.badgeContainer, !rowData.badge ? { borderColor: 'white' } : {} ]}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }} >{rowData.badge}</Text>
          </View>
          : null
        }
      </View>
    );
  }

  render() {
    return (
      <List containerStyle={innerStyles.listContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </List>
    );
  }
}

const innerStyles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#60449A',
    borderColor: '#A07CEB'
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#A07CEB'
  },
  container: {
    backgroundColor: '#60449A',
    borderBottomWidth: 0,
    width: '100%'
  },
  checkedContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  wrapper : { borderColor: '#A07CEB' },
  title: { color: '#fff' },
  subtitle: { color: '#A07CEB' },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  checkedIcon: {
    width: 30,
    height: 30,
    marginRight: 16
  },
  badgeContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#91C02F',
    borderWidth: 2,
    marginRight: 22,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
