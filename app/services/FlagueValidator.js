import ObservableListStore from './../../utils/Store';

class FlagueValidator {

  static isFavourite(exercise) {
    let isFavourite = false;
    const favouriteExercises = ObservableListStore.favouriteExercises;

    for (const favourite of favouriteExercises) {
      if (favourite.name == exercise.name && favourite.type == exercise.type) isFavourite = true;
    }

    return isFavourite;
  }

  static existsInTraining(training, name, exerciseType) {

    switch (exerciseType) {
      case 'cardio':
        return !!training.cardioExercises.find(exercise => exercise.exerciseName === name);
        break;
      default:
        break;
    }

  }

}

module.exports = FlagueValidator;
