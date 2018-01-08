import React from 'react';
import { ScrollView, KeyboardAvoidingView, View, Text } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import HeaderIcon from '../components/shared/HeaderIcon.js';

import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';
import ObservableListStore from '../../utils/Store';
import JsonBuilder from '../services/JsonBuilder';
import CardioExercises from '../constants/CardioExercises'
import ListIcon from '../components/shared/ListIcon';


export default class FavouriteExercises extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.itemsRef = myFirebase.database().ref().child('clubs');

    this.state = {
      appIsReady: false,
      favouriteExercises: ObservableListStore.favouriteExercises,
      dataSource: {
        functional: [],
        muscle: [],
        cardio: []
      }
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  componentDidMount() {
    const { favouriteExercises } = this.state;
    let dataSource = {
      functional: [],
      muscle: [],
      cardio: []
    };
    let itemRef = null;
    let favourites = []

    const builder = new JsonBuilder();


    favouriteExercises.map((item) => {
      switch (item.type) {
        case 'cardio':
          if (item.name == CardioExercises[item.name].type) {
            favourites = item;
          }
          dataSource.cardio = [...dataSource.cardio, favourites];
          this.setState({dataSource});
          break;
        case 'muscle':
          itemRef = myFirebase.database().ref(`muscleExericises/${item.bodyPart}`);
          itemRef.on('value', (snap) => {
            favourites = (snap.val().filter((exercise) => {
              item.img = exercise.img;
              return exercise.name == item.name;
            }))
            dataSource.muscle = [...dataSource.muscle, favourites[0]];
            this.setState({dataSource});
          });
          break;
        case 'functional':
          const itemsRef = myFirebase.database().ref(`functionalExericises`);

          itemsRef.on('value', (snap) => {
            favourites = (snap.val().filter((exercise) => {
              return exercise.name == item.name;
            }));
            dataSource.functional = [...dataSource.functional, favourites[0]];
            this.setState({dataSource});
          });
          break;
        default:
          break;
      }

    });
  }

  _goBack() {
    this.props.navigation.navigate('CreateNewTraining');
  }

  checkSelectedMuscle = (name) => {
    const { training } = this.props.navigation.state.params;

    return !!training.muscleExercises.find(exer => exer.exerciseName === name);
  }

  checkSelectedFunctional = (name) => {
    const { training } = this.props.navigation.state.params;

    return !!training.functionalExercises.find(exer => exer.exerciseName === name);
  }

  checkSelectedCardio = (name) => {
    const { training } = this.props.navigation.state.params;
    return !!training.cardioExercises.find(exer => exer.exerciseName.name === name);
  }

  naviToPage = (stackPage, data) => {
    this.props.navigation.navigate(stackPage, { data });
  }

  clickRedirectMuscle = ({ name, bodyPart} ) => {
    this.naviToPage('DefineMuscleExercise', {name, bodyPart});
  }

  clickRedirectFunctional = ({ name }) => {
    this.naviToPage('DefineFunctional', name);
  }

  clickRedirectCardio = ({ name }) => {
    this.props.navigation.navigate('DefineCardio', { data: name });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='favourite' label='create_training.list_of_favourite_exercises' />
          <PlainList
            keys={{
              key: 'name',
              avatar: 'cardioImg',
            }}
            title= 'cardio_exercise'
            dataSource={this.state.dataSource.cardio}
            onCheckSelected={this.checkSelectedCardio}
            onPressItem={this.clickRedirectCardio}
          />
          <PlainList
            keys={{
              key: 'name',
              avatar: 'img'
            }}
            title= 'muscle_exercises_names'
            dataSource={this.state.dataSource.muscle}
            onCheckSelected={this.checkSelectedMuscle}
            onPressItem={this.clickRedirectMuscle}
          />
          <PlainList
            keys={{
              key: 'name',
              avatar: 'img'
            }}
            title= 'functional_exercises_names'
            dataSource={this.state.dataSource.functional}
            onCheckSelected={this.checkSelectedFunctional}
            onPressItem={this.clickRedirectFunctional}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
