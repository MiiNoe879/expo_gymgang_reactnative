import React from 'react';
import { ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon';

import ItemSeriesCounter from './custom_items/item_series_counter';
import ItemSeries from './custom_items/item_series';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import Button from './ui_components/Button';
import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';
import ActionBarSmall from './ui_components/ActionBarSmall';
import JsonBuilder from '../services/JsonBuilder';


@observer
export default class DefineMuscleExerciseScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const { data, readOnly } = this.props.navigation.state.params;
    const series = (ObservableListStore.muscExercises.find(exercise =>
      exercise.exerciseName === data.name) || {}).series || [];
    ObservableListStore.setMuscleSeries(series);

    const exerciseName = props.navigation.state.params.data.name;
    const bodyPart = props.navigation.state.params.data.bodyPart;
    const exercise = JsonBuilder.buildExercise(exerciseName, 'muscle', bodyPart);
    this.state = {
      spiner: true,
      readOnly,
      exercise,
      exercises: ObservableListStore.muscExercises,
      dataSource: series,
      exerciseName
    };
  }

  _goBack() {
    this.props.navigation.navigate();
  }

  _addRow() {
    ObservableListStore.addMuscleSeriesItem(this.state.dataSource[this.state.dataSource.length - 1]);
    this.setState({
      dataSource: ObservableListStore.muscleExericeseSeries
    });
  }

  _romoveRow() {
    if (ObservableListStore.muscleExericeseSeries.length > 1) {
      ObservableListStore.removeMuscleSeriesItem();
      this.setState({
        dataSource: ObservableListStore.muscleExericeseSeries
      });
    }
  }

  _saveExercise() {
    ObservableListStore.addMuscleExercise({
      exerciseName: this.props.navigation.state.params.data.name, series: this.state.dataSource
    });

    this.setState({
      exercises: ObservableListStore.muscExercises
    });

    ObservableListStore.clean();

    this.setState({
      dataSource: ObservableListStore.muscleExericeseSeries
    });
    this.props.navigation.navigate('CreateNewTraining');
  }

  _setRepeat = (item, val) => {
    let num = val;

    if (val < 0 || isNaN(val) || val.length < 1) {
      num = 0;
    }
    ObservableListStore.updateMuscleSeriesItemRepeat(item, parseInt(num, 10));
    this.setState({
      dataSource: ObservableListStore.muscleExericeseSeries
    });
  }

  _plusRepeat(item) {
    const repeats = ObservableListStore.muscleExericeseSeries[item.index - 1].repeats + 1;

    ObservableListStore.updateMuscleSeriesItemRepeat(item, repeats);

    this.setState({
      dataSource: ObservableListStore.muscleExericeseSeries
    });
  }

  _minusRepeat(item) {
    if (ObservableListStore.muscleExericeseSeries[item.index - 1].repeats > 0) {
      const repeats = ObservableListStore.muscleExericeseSeries[item.index - 1].repeats - 1;

      ObservableListStore.updateMuscleSeriesItemRepeat(item, repeats);
      this.setState({
        dataSource: ObservableListStore.muscleExericeseSeries
      });
    }
  }

  _setWeight = (item, val) => {
    ObservableListStore.updateMuscleSeriesItemWeight(item, parseInt(val, 10));

    this.setState({
      dataSource: ObservableListStore.muscleExericeseSeries
    });
  }

  _plusWeight(item) {
    const weight = ObservableListStore.muscleExericeseSeries[item.index - 1].weight + 1;

    ObservableListStore.updateMuscleSeriesItemWeight(item, weight);
    this.setState({
      dataSource: ObservableListStore.muscleExericeseSeries
    });
  }

  _minusWeight(item) {
    if (ObservableListStore.muscleExericeseSeries[item.index - 1].weight > 0) {
      const weight = ObservableListStore.muscleExericeseSeries[item.index - 1].weight - 1;

      ObservableListStore.updateMuscleSeriesItemWeight(item, weight);
      this.setState({
        dataSource: ObservableListStore.muscleExericeseSeries
      });
    }
  }

  naviToPage = (stackPage, data) => {
    this.props.navigation.navigate(stackPage, { data });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='muscle' label='define_muscle.define_muscle' />

          <ActionBarSmall exercise={this.state.exercise} />

          {/* SERIES COUNTER */}
          <ItemSeriesCounter
            readOnly={this.state.readOnly} count={ObservableListStore.muscleExericeseSeries.length}
            plusClick={() => this._addRow()}
            minusClick={() => this._romoveRow()}
          />

          {/* LIST */}
          <FlatList
            data={this.state.dataSource}
            extraData={this.state}
            readOnly={this.state.readOnly}
            renderItem={({ item }) => (
              <ItemSeries
                seriesLabel = 'define_muscle.reps_count'
                counterLabel = 'define_muscle.weight_count'
                type = 'weight'
                plus={() => this._plusRepeat(item)}
                minus={() => this._minusRepeat(item)}
                plusT={() => this._plusWeight(item)}
                minusT={() => this._minusWeight(item)}
                setR={this._setRepeat}
                setValue={this._setWeight}
                series={item}
                readOnly={this.state.readOnly}
              />)}
          />
        </ScrollView>

        <Button
          label= 'buttons.save'
          onPress={this._saveExercise.bind(this)}
        />
      </KeyboardAvoidingView>

    );
  }
}

I18n.fallbacks = true;
