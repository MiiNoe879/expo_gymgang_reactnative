import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from 'ex-react-native-i18n';

import IconButton from './IconButton';
import ObservableListStore from '../../../utils/Store';
import myFirebase from '../../../connection.js';
import FirebaseService from '../../services/FirebaseService';
import FlagueValidator from '../../services/FlagueValidator';

export default class ActionBarSmall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavourite: FlagueValidator.isFavourite(props.exercise),
      exercise: props.exercise
    };
  }

  onPressHandler() {
    const { exercise } = this.state;

    console.log(exercise);

    if (this.state.isFavourite) {
      ObservableListStore.removeFavouriteExercise(exercise);
    } else {
      ObservableListStore.addFavouriteExercise(exercise);
    }
    this.setState({
      isFavourite: !this.state.isFavourite
    });

    const dataToSave = {
      favouriteExercises: ObservableListStore.favouriteExercises
    };

    const emailReplaced = FirebaseService.encodedEmail();
    const usersFavouritesRef = myFirebase.database().ref('users').child(emailReplaced);

    usersFavouritesRef.update(dataToSave);
  }


  render() {
    const favouriteLabel = this.state.isFavourite ? I18n.t('exercises.favourite') : I18n.t('exercises.add_to_favourites');

    return (
      <View style={innerStyle.actionBarSmall} >
        <IconButton
          type='favourite'
          isChecked={this.state.isFavourite}
          label={favouriteLabel}
          onPress={() => this.onPressHandler()}
        />
      </View>
    );
  }
}

const innerStyle = StyleSheet.create({
  actionBarSmall: {
    position: 'absolute',
    top: 90,
    right: 0,
    flexDirection: 'row'
  }

});
