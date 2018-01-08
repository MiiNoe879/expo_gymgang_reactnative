import React from 'react';
import { ListView, StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native';
import { List } from 'react-native-elements';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import checkedIcon from '../../assets/icons/shared/checked.png';
import uncheckedIcon from '../../assets/icons/shared/unchecked.png';

export default class CheckPlainList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    keys: PropTypes.object.isRequired,
    dataSource: PropTypes.array.isRequired,
    onPressItem: PropTypes.func,
    onCheck: PropTypes.func
  }

  static defaultProps = {
    title: '',
    onPressItem: () => {},
    onCheck: () => {}
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
    if (nextProps.dataSource !== this.props.dataSource) {
      this.updateData(nextProps.dataSource);
    }
  }

  updateData = (dataSource) => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows((dataSource || this.props.dataSource).filter(item => item))
    });
  }

  renderRow = (rowData) => {
    const { title, keys, onPressItem, onCheck } = this.props;
    const isChecked = rowData.selected ? rowData.selected : false;

    return (
      <View style={innerStyles.container}>
        <TouchableOpacity onPress={onCheck.bind(null, rowData)}>
          {isChecked ?
            <Image source={checkedIcon} style={innerStyles.icon} /> :
            <Image source={uncheckedIcon} style={innerStyles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressItem.bind(null, rowData)}>
          <Text style={innerStyles.title}>{title ? I18n.t(`${title}.${rowData.name}`) : rowData[keys.title || 'exerciseName']}</Text>
          <Text style={innerStyles.subtitle}>{keys.subtitle ? rowData[keys.subtitle || 'city'] : ''}</Text>
        </TouchableOpacity>
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
  container: {
    backgroundColor: '#60449A',
    borderBottomColor: '#A07CEB',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderWidth: 1,
    flexDirection: 'row',
    height: 60,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5
  },
  checkedContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  wrapper : { borderColor: '#A07CEB' },
  title: { color: '#fff' },
  subtitle: { color: '#A07CEB' },
  icon: {
    width: 50,
    height: 50,
    marginRight: 4,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
});
