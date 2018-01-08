import React, { Component } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import AvatarSubInfo from '../components/AvatarSubInfo';
import HeaderIcon from '../components/shared/HeaderIcon';
import ListIcon from '../components/shared/ListIcon.js';

import styles from '../../styles.js';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

import { getCardioExercisesMenuItems } from './data/menuItems.js';

export default class CardioExerciseScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false
    };
  }

  componentWillMount() {
    I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  checkIfExistInTraining = (name) => {
    const { training } = this.props.navigation.state.params;
    return !!training.cardioExercises.find(exercise => exercise.exerciseName.name === name);
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const exercises = getCardioExercisesMenuItems(navigate);

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => goBack()} />
          <HeaderIcon type='bell' onPress={() => navigate('NotificationList')} />

          <AvatarSubInfo />

          <Badge type='cardio' label='cardio_exercise.cardio_exercise' top={160} />

          {/* 4X GRID BUTTONS  */}
          <View style={styles.gridLayout}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {exercises.map(exercise => (
                <ListIcon key={exercise.text} {...exercise} isSelected={this.checkIfExistInTraining(exercise.type)} />))
              }
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
