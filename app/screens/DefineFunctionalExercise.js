import React from 'react';
import { ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import ItemSeriesCounter from './custom_items/item_series_counter';
import ItemSeries from './custom_items/item_series';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import HeaderIcon from '../components/shared/HeaderIcon';

import Button from './ui_components/Button';
import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

import ActionBarSmall from './ui_components/ActionBarSmall';
import JsonBuilder from '../services/JsonBuilder';

@observer
export default class DefineFunctionalScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const { data, readOnly } = this.props.navigation.state.params;
    const series = (ObservableListStore.funcExercises.find(exercise =>
      exercise.exerciseName === data) || {}).series || [];
    const exercise = JsonBuilder.buildExercise(props.navigation.state.params.data, 'functional');


    ObservableListStore.setFuncSeries(series);
    this.timer = null;
    this.state = {
      spiner: true,
      readOnly,
      exercise,
      exercises: ObservableListStore.funcExercises,
      dataSource: series,
      appIsReady: false,
      exerciseName: this.props.navigation.state.params.data
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  _addRow() {
    ObservableListStore.addFuncSeriesItem(this.state.dataSource[this.state.dataSource.length - 1]);
    this.setState({
      dataSource: ObservableListStore.funcExerceiseSeries
    });
  }

  _removeRow() {
    if (ObservableListStore.funcExerceiseSeries.length > 1) {
      ObservableListStore.removeFuncSeriesItem();
      this.setState({
        dataSource: ObservableListStore.funcExerceiseSeries
      });
    }
  }

  _saveExercise() {
    const exerciseName = this.props.navigation.state.params.data;

    ObservableListStore.addFuncExercise({ exerciseName, series: this.state.dataSource });

    this.setState({
      exercises: ObservableListStore.funcExercises
    });

    ObservableListStore.clean();

    this.props.navigation.navigate('CreateNewTraining');
  }

  _setRepeat = (item, val) => {
    let num = val;

    if (val < 0 || isNaN(val) || val.length < 1) {
      num = 0;
    }

    ObservableListStore.updateFuncSeriesItemRepeat(item, parseInt(num, 10));
    this.setState({
      dataSource: ObservableListStore.funcExerceiseSeries
    });
  }

  _plusRepeat(item) {
    const repeats = ObservableListStore.funcExerceiseSeries[item.index - 1].repeats + 1;

    ObservableListStore.updateFuncSeriesItemRepeat(item, repeats);
    this.setState({
      dataSource: ObservableListStore.funcExerceiseSeries
    });
    // this.timer = setTimeout(this._plusRepeat(item), 200);
  }

  _minusRepeat(item) {
    if (ObservableListStore.funcExerceiseSeries[item.index - 1].repeats > 0) {
      const repeats = ObservableListStore.funcExerceiseSeries[item.index - 1].repeats - 1;

      ObservableListStore.updateFuncSeriesItemRepeat(item, repeats);
      this.setState({
        dataSource: ObservableListStore.funcExerceiseSeries
      });
    }
  }

  _stopTimer() {
    clearTimeout(this.timer);
  }

  _setTime = (item, val) => {
    let num = val;

    if (val < 0) {
      num = 0;
    }
    ObservableListStore.updateFuncSeriesItemTime(item, parseInt(num, 10));
    this.setState({
      dataSource: ObservableListStore.funcExerceiseSeries
    });
  }

  _plusTime(item) {
    const time = ObservableListStore.funcExerceiseSeries[item.index - 1].time + 1;

    ObservableListStore.updateFuncSeriesItemTime(item, time);
    this.setState({
      dataSource: ObservableListStore.funcExerceiseSeries
    });
  }

  _minusTime(item) {
    if (ObservableListStore.funcExerceiseSeries[item.index - 1].time > 0) {
      const time = ObservableListStore.funcExerceiseSeries[item.index - 1].time - 1;

      ObservableListStore.updateFuncSeriesItemTime(item, time);
      this.setState({
        dataSource: ObservableListStore.funcExerceiseSeries
      });
    }
  }


  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />


          <Badge type='functional' label='define_functional.define_functional' />

          <ActionBarSmall exercise={this.state.exercise} />

          {/* SERIES COUNTER */}
          <ItemSeriesCounter
            readOnly={this.state.readOnly} count={this.state.dataSource.length} plusClick={() => this._addRow()}
            minusClick={() => this._removeRow()}
          />

          {/* LIST */}
          <FlatList
            data={this.state.dataSource}
            extraData={this.state}
            renderItem={({ item }) => (
              <ItemSeries
                seriesLabel = 'define_functional.reps_count'
                counterLabel = 'define_functional.time_count'
                type = 'time'
                readOnly={this.state.readOnly}
                plus={() => this._plusRepeat(item)}
                minus={() => this._minusRepeat(item)}
                plusT={() => this._plusTime(item)}
                minusT={() => this._minusTime(item)}
                setR={this._setRepeat}
                setValue={this._setTime}
                // stopTimer={() => this._stopTimer()}
                series={item}
              />)}
          />
        </ScrollView>
        {/* <Button title="Save" onPress={this._saveExercise.bind(this)}/> */}
        <Button
          label= 'buttons.save'
          onPress={this._saveExercise.bind(this)}
        />
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
