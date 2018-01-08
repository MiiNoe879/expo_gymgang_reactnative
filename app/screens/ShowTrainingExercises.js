import React from 'react';
import { ScrollView, KeyboardAvoidingView, TouchableHighlight, Image, View } from 'react-native';
import { observer } from 'mobx-react/native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import styles from '../../styles.js';

import ObservableListStore from '../../utils/Store';

import HeaderIcon from '../components/shared/HeaderIcon';

import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';
import Button from './ui_components/Button';

import iconCross from '../assets/icons/existing_trainings/iconCross.png';

@observer
export default class ShowTrainingExercises extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      appIsReady: false,
      readOnly: params.readOnly,
      data: params.training,
      dataSource: null,
      checkedItems: []
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
    this.parseTraining(this.state.data);
  }

  parseSingleTraining = (training, excercises) => {
    const arr = [];

    (training[excercises] || []).forEach(excercise => {
      arr.push({ ...excercise, type: excercises.substring(0, 1), category: excercises });
    });

    return arr || [];
  }

  parseTraining(training) {
    let arr = [];

    arr = [ ...this.parseSingleTraining(training, 'muscleExercises') ];
    arr = [ ...arr, ...this.parseSingleTraining(training, 'functionalExercises') ];
    arr = [ ...arr, ...this.parseSingleTraining(training, 'cardioExercises') ];

    this.setState({
      dataSource: arr.filter(item => item)
    });
  }

  deleteItem = (item) => {
    const categoryFiltered = this.state.data[item.category].filter(exercise =>
      exercise.exerciseName !== item.exerciseName);

    this.setState({
      data: { ...this.state.data, [item.category]: categoryFiltered }
    }, () => {
      ObservableListStore.removeExercise(item.exerciseName, item.category);

      this.parseTraining(this.state.data);
    });
  }

  deleteSelectedItems = () => {
    this.state.checkedItems.forEach(this.deleteItem);

    this.removeSelection();
  }

  removeSelection = () => {
    this.setState({ checkedItems: [] });
  }

  lookItem = (rowData) => {
    if (rowData.type === 'm') {
      this.props.navigation.navigate('DefineMuscleExercise', { training: this.state.data, data: rowData.exerciseName });
    }

    if (rowData.type === 'f') {
      this.props.navigation.navigate('DefineFunctional', { training: this.state.data, data: rowData.exerciseName });
    }

    if (rowData.type === 'c') {
      this.props.navigation.navigate('DefineCardio', { training: this.state.data.cardioExercises, data: rowData.exerciseName });
    }
  }

  checkItem = (item) => {
    const { checkedItems, dataSource } = this.state;
    const preparedItems = checkedItems
      && checkedItems.find(checkedItem => checkedItem.exerciseName === item.exerciseName)
      ? checkedItems.filter(checkedItem => checkedItem.exerciseName !== item.exerciseName)
      : [ ...checkedItems, item ];

    this.setState({
      checkedItems: preparedItems,
      dataSource: dataSource.map(data => preparedItems.indexOf(data) !== -1
        ? { ...data, isChecked: true }
        : { ...data, isChecked: false })
    });
  }

  renderRightControl = (item) => {
    return (<TouchableHighlight onPress={this.deleteItem.bind(null, item)}>
      <Image source={iconCross} style={{ width: 30, height: 30, marginRight: 16 }} />
    </TouchableHighlight>);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.navigate('CreateNewTraining')} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='selected' label='create_training.list_of_selected_exercises' />

          {this.state.dataSource
            ? (
              <PlainList
                dataSource={this.state.dataSource}
                keys = {{
                  key: 'exerciseName',
                  title: 'exerciseName',
                  subtitle: 'city',
                  avatar: 'avatar_url'
                }}
                checkedItems = {this.state.checkedItems}
                onPressItem = {this.lookItem}
                onLongPressItem = {this.checkItem}
                renderRightControl = {this.renderRightControl}
              />
            )
            : null
          }

        </ScrollView>

        {this.state.checkedItems.length
          ? (
            <View style={styles.footerRow}>
              <Button
                label = 'buttons.cancel'
                onPress={this.removeSelection}
              />
              <Button
                type = 'danger'
                label= 'buttons.delete'
                onPress={this.deleteSelectedItems}
              />
            </View>
          )
          : null
        }
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
