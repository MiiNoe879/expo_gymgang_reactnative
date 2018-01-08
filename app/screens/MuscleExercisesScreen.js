import React from 'react';
import { ScrollView, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import Loader from './helpers/loader';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import HeaderIcon from '../components/shared/HeaderIcon';

import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';
import SearchBar from './ui_components/SearchBar';
import IconButton from './ui_components/IconButton';
import { AddButton } from './ui_components/AddButton';
export default class MuscleExercisesScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.itemsRef = myFirebase.database().ref(`muscleExericises/${this.props.navigation.state.params.name}`);
    this.state = {
      spiner: true,
      Exercises: [],
      appIsReady: false,
      dataSource: null,
      dataFiltered: [],
      bodyPart: this.props.navigation.state.params.name
    };
  }

  componentWillMount() {
    I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  componentDidMount() {
    this.listenForItems();
  }

  listenForItems = () => {
    this.itemsRef.on('value', (snap) => {
      const items = [];

      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          img: String(child.val().img),
          bodyPart: this.state.bodyPart
        });
      });

      this.setState({
        dataSource: items,
        spiner: false
      });
    });
  }

  naviToPage = (stackPage, data) => {
    this.props.navigation.navigate(stackPage, { data });
  }

  clickRedirect = ({ name, bodyPart }) => {
    this.naviToPage('DefineMuscleExercise', {name, bodyPart});
  }

  checkSelected = (name) => {
    const { training } = this.props.navigation.state.params;

    return !!training.muscleExercises.find(exer => exer.exerciseName === name);
  }

  searchAction = (exerciseName) => {
    this.setState({ dataFiltered: this.state.dataSource.filter(exercise =>
      exercise.name.toLowerCase().includes(exerciseName.toLowerCase()))
    });
  }

  addExercise = () => {
    const { bodyPart } = this.state;
    const type = 'muscle';

    const data = {
      bodyPart,
      type
    }

    this.props.navigation.navigate('AddExercise', { data } );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <Loader activate={this.state.spiner} />

          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='muscle' label='muscle_exercises.muscle_exercises' />

          <AddButton type='add' label={I18n.t('exercises.add_exercise')} onPress={this.addExercise}/>

          <SearchBar onChangeText={(text) => this.searchAction(text)} />
          {this.state.dataSource
            ? (
              <PlainList
                dataSource={this.state.dataFiltered.length ? this.state.dataFiltered : this.state.dataSource}
                keys = {{
                  key: 'name',
                  avatar: 'img'
                }}
                title = 'muscle_exercises_names'
                bodyPart = {this.state.bodyPart}
                onPressItem = {this.clickRedirect}
                onCheckSelected = {this.checkSelected}
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


