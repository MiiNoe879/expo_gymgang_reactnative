import styles from '../../../styles.js';
import CardioExercises from '../../constants/CardioExercises';

export function getWorkoutMenuItems(navigate) {
  return [
    {
      index: 1,
      onPress: () => navigate('CreateNewTraining'),
      type: 'createTraining',
      text: 'workout_notes.create_new_training',
      dimensions: { width: 79, height: 72 }
    },
    {
      index: 2,
      onPress: () => navigate('ExistingTrainings'),
      type: 'existingTraining',
      text: 'workout_notes.use_of_existing_training',
      dimensions: { width: 56, height: 70 }
    },
    {
      index: 3,
      onPress: () => navigate('CalendarOfTraining'),
      type: 'trainingsCalendar',
      text: 'workout_notes.calendar_of_training',
      dimensions: { width: 63, height: 63 }
    },
    {
      index: 4,
      onPress: () => navigate('Statistics'),
      type: 'stats',
      text: 'workout_notes.statistics',
      dimensions: { width: 75, height: 72 }
    },
    {
      index: 5,
      onPress: () => {},
      type: 'crossFit',
      text: 'workout_notes.cross_fit_training',
      dimensions: { width: 63, height: 63 },
      disabled: true,
      style: styles.disabledOpacity
    },
    {
      index: 6,
      onPress: () => navigate('BodyMeasurement'),
      type: 'bodyMeasurMuscle',
      text: 'workout_notes.body_measurements',
      dimensions: { width: 60, height: 62 }
    }
  ];
}

export function getUserCardMenuItems() {
  return [
    { title: 'user_card.clubs', value: 'clubs' },
    { title: 'user_card.disciplines', value: 'selectedSports' },
    { title: 'user_card.city', value: 'city' }
  ];
}

export function getStatisticsMenuItems(navigate) {
  return [
    {
      index: 1,
      onPress: () => navigate('MusclePart', { type: 'stat' }),
      type: 'addMuscle',
      text: 'statistics.exercise_statistics',
      dimensions: { width: 79, height: 72 }
    },
    {
      index: 2,
      onPress: () => navigate('BodyMeasurementMusclePart'),
      type: 'bodyMeasurMuscle',
      text: 'statistics.body_measurement_statistics',
      dimensions: { width: 56, height: 70 }
    },
    {
      index: 3,
      onPress: () => {},
      type: 'addCardio',
      style: styles.disabledOpacity,
      text: 'statistics.cardio_statistics',
      dimensions: { width: 63, height: 63 },
      disabled: true

    },
    {
      index: 4,
      onPress: () => {},
      type: 'crossFit',
      style: styles.disabledOpacity,
      text: 'statistics.cross_fit_statistics',
      dimensions: { width: 75, height: 72 },
      disabled: true
    }
  ];
}

export function getRegisterFormItems() {
  return [
    { key: 'username' },
    { key: 'email', keyboardType: 'email-address' },
    { key: 'password', isPassword: true },
    { key: 'confirmPassword', isPassword: true }
  ];
}

export function getFriendsMenuItems(navigate) {
  return [
    {
      index: 1,
      onPress: () => navigate('MyFriends'),
      type: 'myFriends',
      text: 'friends.my_friends',
      dimensions: { width: 60, height: 70 }
    },
    {
      index: 2,
      onPress: () => navigate('TrainTogether'),
      type: 'findSuggested',
      text: 'friends.suggested_friends',
      dimensions: { width: 60, height: 70 }
    },
    {
      index: 3,
      onPress: () => navigate('UsersChat'),
      type: 'chat',
      text: 'friends.chat',
      dimensions: { width: 60, height: 70 }
    },
    {
      index: 4,
      onPress: () => navigate('FindFriends'),
      type: 'findFriends',
      text: 'friends.find_friends',
      dimensions: { width: 63, height: 63 }
    }
  ];
}

export function getTrainTogetherMenuItems(navigate) {
  return [
    {
      index: 1,
      onPress: () => navigate('SuggestedFriends'),
      type: 'trainTogether',
      text: 'train_together.suggested_workouters',
      dimensions: { width: 79, height: 72 },
    },
    {
      index: 2,
      onPress: () => navigate('SuggestedFriends'),
      type: 'findSuggested',
      text: 'friends.suggested_friends',
      dimensions: { width: 60, height: 70 }
    },
    {
      index: 3,
      onPress: () => navigate('UsersChat'),
      type: 'chat',
      text: 'friends.chat',
      dimensions: { width: 60, height: 70 }
    },
    {
      index: 4,
      onPress: () => navigate('FindFriends'),
      type: 'findFriends',
      text: 'friends.find_friends',
      dimensions: { width: 63, height: 63 }
    },
    {
      index: 5,
      empty: true,
      text: 'empty',
      disabled: true,
      onPress: () => {}
    },
    {
      index: 6,
      onPress: () => navigate('MyFriends'),
      type: 'myFriends',
      text: 'friends.my_friends',
      dimensions: { width: 60, height: 70 }
    }
  ];
}

export function getDashboardMenuItems(navigate) {
  return [
    {
      index: 1,
      onPress: () => navigate('TrainTogether'),
      type: 'trainTogether',
      text: 'dashboard.train_together',
      dimensions: { width: 79, height: 72 },
      style: { height: 215 }
    },
    {
      index: 2,
      onPress: () => navigate('Workout'),
      type: 'workout',
      text: 'dashboard.workout_notes',
      dimensions: { width: 56, height: 70 },
      style: { height: 215 }
    },
    {
      index: 3,
      onPress: () => navigate('Clubs'),
      type: 'myClubs',
      text: 'dashboard.sport_clubs',
      dimensions: { width: 63, height: 63 },
      style: { height: 215 }
    }
    // {
    //   index: 4,
    //   onPress: () => navigate('Friends'),
    //   type: 'dashFriends',
    //   text: 'dashboard.friends',
    //   dimensions: { width: 75, height: 72 },
    //   style: { height: 215 }
    // }
  ];
}

export function getCreateExerciseMenuItems(navigate, params) {
  return [
    {
      index: 1,
      onPress: () => navigate('MusclePart', { type: 'muscle', training: params.training }),
      type: 'addMuscle',
      text: 'create_training.add_muscle_exercise',
      dimensions: { width: 74, height: 72 },
      disabled: params.readOnly,
      badge: params.muscle,
      isBadge: true
    },
    {
      index: 2,
      onPress: () => navigate('CardioExercise', { training: params.training }),
      type: 'addCardio',
      text: 'create_training.add_cardio_exercise',
      dimensions: { width: 56, height: 70 },
      disabled: params.readOnly,
      badge: params.cardio,
      isBadge: true
    },
    {
      index: 3,
      onPress: () => navigate('FunctionalExercises', { training: params.training }),
      type: 'addFunc',
      text: 'create_training.functional_exercises',
      dimensions: { width: 63, height: 63 },
      disabled: params.readOnly,
      badge: params.functional,
      isBadge: true
    },
    {
      index: 4,
      onPress: () => navigate('ShowTrainingExer', { readOnly: params.readOnly, training: params.training }),
      type: 'showTraining',
      text: 'create_training.list_of_selected_exercises',
      dimensions: { width: 75, height: 72 },
      badge: params.functional + params.muscle + params.cardio,
      isBadge: true
    },
    {
      index: 56,
      onPress: () => navigate('FavouriteExercises', { training: params.training }),
      type: 'favouriteExercises',
      text: 'create_training.list_of_favourite_exercises',
      dimensions: { width: 63, height: 63, opacity: 0.4 },
      disabled: false
      // style: styles.disabledOpacity
    }
  ];
}

export function getClubsMenuItems(navigate) {
  return [
    {
      index: 1,
      onPress: () => navigate('MyClubs'),
      type: 'myClubs',
      text: 'clubs.my_clubs',
      dimensions: { width: 60, height: 70 }
    },
    {
      index: 2,
      onPress: () => navigate('SearchClubs'),
      type: 'searchClubs',
      text: 'clubs.search_clubs',
      dimensions: { width: 60, height: 70 }
    }
  ];
}

export function getClubDataMenuItems(params) {
  return [
    { label: 'clubs.name', value: params.name },
    { label: 'clubs.city', value: params.city },
    { label: 'clubs.address', value: `${params.street}, ${params.city}` },
    { label: 'clubs.phone', value: `${params.phone}${params.isMine}` }
  ];
}

export function getCardioExercisesMenuItems(navigate) {
  return [
    {
      index: 1,
      onPress: () => navigate('DefineCardio', { data: CardioExercises.bike.type }),
      type: CardioExercises.bike.type,
      text: CardioExercises.bike.text,
      dimensions: { width: 98, height: 98 }
    },
    {
      index: 2,
      onPress: () => navigate('DefineCardio', { data: CardioExercises.track.type }),
      type: CardioExercises.track.type,
      text: CardioExercises.track.text,
      dimensions: { width: 56, height: 70 }
    },
    {
      index: 3,
      onPress: () => navigate('DefineCardio', { data: CardioExercises.stairs.type }),
      type: CardioExercises.stairs.type,
      text: CardioExercises.stairs.text,
      dimensions: { width: 63, height: 63 }
    },
    {
      index: 4,
      onPress: () => navigate('DefineCardio', { data: CardioExercises.elliptical.type }),
      type: CardioExercises.elliptical.type,
      text: CardioExercises.elliptical.text,
      dimensions: { width: 75, height: 72 }
    },
    {
      index: 5,
      onPress: () => navigate('DefineCardio', { data: CardioExercises.rower.type }),
      type: CardioExercises.rower.type,
      text: CardioExercises.rower.text,
      dimensions: { width: 75, height: 72 }
    },
    {
      index: 6,
      empty: true,
      text: 'empty',
      disabled: true,
      onPress: () => {}
    }
  ];
}

export function getBodyMeasurmentInputs() {
  return [
    { key: 'chest', placeholder: 'cm' },
    { key: 'biceps', placeholder: 'cm' },
    { key: 'forearm', placeholder: 'cm' },
    { key: 'waist', placeholder: 'cm' },
    { key: 'belt', placeholder: 'cm' },
    { key: 'hips', placeholder: 'cm' },
    { key: 'thigh', placeholder: 'cm' },
    { key: 'calf', placeholder: 'cm' },
    { key: 'weight', placeholder: 'kg' }
  ];
}
