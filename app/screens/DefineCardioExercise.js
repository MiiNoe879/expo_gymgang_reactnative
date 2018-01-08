import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { Text } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import ItemCardSeries from './custom_items/item_cardio_series';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import HeaderIcon from '../components/shared/HeaderIcon';

import Button from './ui_components/Button';
import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge.js';

import ActionBarSmall from './ui_components/ActionBarSmall';

import { CARDIO_EXERCISE_PARAMS, CARDIO_ADDITIONAL_PARAMS } from './data/consts.js';
import JsonBuilder from '../services/JsonBuilder';

@observer
export default class DefineCardioScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const { data, readOnly, training } = this.props.navigation.state.params;

    const dataSource = training
      ? training.find(card => card.exerciseName === data)
      : ObservableListStore.cardExercises.find(card => card.exerciseName.name === data);
    const exercise = JsonBuilder.buildExercise(props.navigation.state.params.data, 'cardio');

    this.state = {
      readOnly,
      exercise,
      appIsReady: false,
      exercise: exercise,
      exerciseName: this.props.navigation.state.params.data,
      dataSource: (dataSource || {}).series || {
        length: 0,
        time: 0,
        level: 0,
        fastPace: 0,
        slowPace: 0,
        repeats: 0
      }
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  _saveExercise() {
    const { exercise, dataSource } = this.state;
    const existingExercise = ObservableListStore.cardExercises.find(card => card.exerciseName.name === exercise.name);
    if (existingExercise) {
      const ar = ObservableListStore.cardExercises
      ar.map((item) => {
        if (item.exerciseName.name === existingExercise.exerciseName.name) {
          item.series = dataSource;
          return
        }
      })
    } else {
      ObservableListStore.addCardExercise({ exerciseName: exercise, series: dataSource });
    }

    this.props.navigation.navigate('CreateNewTraining');
  }

  _set = (item, val) => {
    this.setState({
      dataSource: { ...this.state.dataSource, [item]: parseInt(val, 10) }
    });
  }

  _plus(item) {
    const { dataSource } = this.state;

    this.setState({
      dataSource: { ...dataSource, [item]: dataSource[item] + 1 }
    });
  }

  _minus(item) {
    const { dataSource } = this.state;

    if (dataSource[item] > 0) {
      this.setState({
        dataSource: { ...dataSource, [item]: dataSource[item] - 1 }
      });
    }
  }

  isDataZero = () => {
    const { dataSource } = this.state;

    return !Object.keys(dataSource).find(key => dataSource[key]);
  }

  renderListItem = (title) => {
    const { readOnly, dataSource } = this.state;

    return (
      <ItemCardSeries
        readOnly={readOnly}
        item={dataSource[title]}
        title={title}
        set={this._set}
        plus={() => this._plus(title)}
        minus={() => this._minus(title)}
      />
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='cardio' label='define_cardio.define_cardio' />

          <ActionBarSmall exercise={this.state.exercise} />

          {/* LIST */}
          {CARDIO_EXERCISE_PARAMS.map(this.renderListItem)}

          <Text style={{ width: '100%', textAlign: 'center', fontSize: 18, color: '#fff', marginTop: 18, marginBottom: 10, backgroundColor: 'transparent' }}>
            {I18n.t('cardio_exercise.intervals')}
          </Text>

          {CARDIO_ADDITIONAL_PARAMS.map(this.renderListItem)}
        </ScrollView>

        {this.isDataZero()
          ? (
            <Button
              type = 'disabled'
              label= 'buttons.cancel'
              onPress={() => this.props.navigation.goBack()}
            />)
          : (
            <Button
              label= 'buttons.save'
              onPress={this._saveExercise.bind(this)}
            />)}

      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
