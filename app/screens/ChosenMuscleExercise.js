import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import ItemExercise from './custom_items/item_exercise';

import Loader from './helpers/loader';

const styles = require('../../styles.js');

const myFirebase = require('../../connection.js');

export default class ChosenMuscleExercise extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      spiner: true,
      musclePart: params.data,
      exercisesLink: myFirebase.database().ref(`muscleExericises/${params.data}`),
      exercises: []
    };
  }

  componentWillMount() {
    const items = [];

    this.state.exercisesLink.on('value', (snapshot) => {
      // console.log(snapshot);

      snapshot.forEach((childSnapshot) => {
        const snap = childSnapshot.val();

        items.push({
          name: snap.name,
          img: snap.img
        });
      });

      this.setState({
        exercises: items,
        spiner: false
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader activate={this.state.spiner} />
        <FlatList
          data={this.state.exercises}
          renderItem={({ item }) => <ItemExercise img={item.img} title={item.name} />}
        />
      </View>
    );
  }
}
