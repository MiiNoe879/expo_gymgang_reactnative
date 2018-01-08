import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import Loader from './helpers/loader';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import HeaderIcon from '../components/shared/HeaderIcon';

import Badge from './ui_components/Badge';
import  PlainList from './ui_components/PlainList';
import SearchBar from './ui_components/SearchBar';
import { AddButton } from './ui_components/AddButton';

export default class FunctionalExercisesScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.itemsRef = myFirebase.database().ref('functionalExericises');

    this.state = {
      spiner: true,
      Exercises: [],
      dataSource: null,
      appIsReady: false,
      dataFiltered: []
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      const items = [];

      snap.forEach((child) => {
        items.push({
          name: child.val().name
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

  clickRedirect = ({ name }) => {
    this.naviToPage('DefineFunctional', name);
  }

  checkSelected = (name) => {
    const { training } = this.props.navigation.state.params;

    return !!training.functionalExercises.find(exer => exer.exerciseName === name);
  }

  searchAction = (exerciseName) => {
    this.setState({ dataFiltered: this.state.dataSource.filter(exercise =>
      exercise.name.toLowerCase().includes(exerciseName.toLowerCase()))
    });
  }

  addExercise = () => {
    const type = 'functional';
    const data = { type };
    this.props.navigation.navigate('AddExercise', { data } );
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <Loader activate={this.state.spiner} />

          <HeaderIcon type='back' onPress={() => navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => navigation.navigate('NotificationList')} />

          <Badge type='functional' label='create_training.functional_exercises' />
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
                title = 'functional_exercises_names'
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
