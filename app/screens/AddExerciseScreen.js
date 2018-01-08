import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import Button from './ui_components/Button';

import I18n from 'ex-react-native-i18n';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import AvatarSubInfo from '../components/AvatarSubInfo';
import HeaderIcon from '../components/shared/HeaderIcon';
import ListIcon from '../components/shared/ListIcon.js';

import ObservableListStore from '../../utils/Store';
import logoImage from '../assets/images/gymgang_logo.png';


import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';

import { getClubsMenuItems } from './data/menuItems.js';
import { FormInput, FormLabel } from 'react-native-elements';

@observer
export default class WorkoutNotesScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      exerciseName: ''
    };
  }


  componentWillMount() {
    I18n.initAsync();
  }

  isDataZero = () => {
    return this.state.exerciseName.length === 0;
  }

  saveExercise = () => {
    const { type, bodyPart } = this.props.navigation.state.params.data;
    const { exerciseName } = this.state;

    if (exerciseName) {
      let data = null;

      switch (type) {
        case 'muscle':
          const muscleRef = myFirebase.database().ref('muscleExericises').child(bodyPart);
          data = { img: 0, name: exerciseName };
          muscleRef.push(data)
        case 'functional':
          data = { img: 0, name: exerciseName }
          myFirebase.database().ref('functionalExericises').push(data);
        case 'cardio':
          myFirebase.database().ref('cardioExercises');
          break;
        default:
          break;
      }
    }
  }


  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>

        <ScrollView>
          <BackgroundImage />
          <HeaderIcon type='back' onPress={() => goBack()} />
          <HeaderIcon type='bell' onPress={() => navigate('NotificationList')} />

          <Badge type='muscle' label='exercises.add_exercise' />

          <View style={styles.addExercise}>
            {/* <FormLabel labelStyle={styles.labelHeader}>{I18n.t('exercises.add_exercise_name')}</FormLabel> */}
            <FormInput
              keyboardType={'default'} keyboardAppearance='light' returnKeyType={'next'}
              onChangeText={(text) => this.setState({ exerciseName: text })}
              value={this.state.exerciseName} autoFocus={false} underlineColorAndroid={'#A07CEB'} selectionColor={'#A07CEB'}
              inputStyle={{ color: '#fff', textAlign: 'center' }}
              placeholder='Type Here...'
            />
          </View>
          <Button
            label= 'buttons.save'
            onPress={() => this.saveExercise()}
          />
          <Button
            label= 'buttons.cancel'
            type='default'
            onPress={() => goBack()}
          />
        </ScrollView>
        {/* {this.isDataZero()
          ? (
            <Button
              label= 'buttons.cancel'
              type = 'disabled'
              onPress={() => goBack()}
            />)
          : (
            <Button
              label= 'buttons.save'
              onPress={() => this.saveExercise()}
            />)} */}
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;


