import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { observer } from 'mobx-react/native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import ObservableListStore from '../../utils/Store';

import styles from '../../styles.js';

import HeaderIcon from '../components/shared/HeaderIcon.js';

import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';


@observer
export default class SelectedExercises extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      appIsReady: false,
      training: this.props.navigation.state.params.training,
      dataSource: null
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
    this.parseTraining(this.state.training);
  }

  parseSingleTraining = (training, { name, handler, series }) => {
    return training[name].map(exercise => {
      ObservableListStore[handler](exercise);
      ObservableListStore[series] = exercise.series;

      return exercise;
    });
  }

  parseTraining(training) {
    let arr = [];

    arr = [ ...this.parseSingleTraining(training,
      { name: 'muscleExercises', handler: 'addMuscleExercise', series: 'muscleExerciseSeries' })
    ];
    arr = [ ...arr, ...this.parseSingleTraining(training,
      { name: 'functionalExercises', handler: 'addFuncExercise', series: 'funcExerciseSeries' })
    ];
    arr = [ ...arr, ...this.parseSingleTraining(training,
      { name: 'cardioExercises', handler: 'addCardExercise', series: 'cardioExerciseSeries' })
    ];

    this.setState({
      dataSource: arr
    });
  }

  // Add item to firebase
  addItem(item) {
    this.itemsRef.push(item);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
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
              />
            )
            : null
          }
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
