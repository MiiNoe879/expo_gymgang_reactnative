import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';

import iconMeasurementBadge from '../../assets/icons/body_measurement/icon_measurement_badge.png';
import iconStatisticsBadge from '../../assets/icons/statistics/icon_statistics_badge.png';
import iconCalendarBadge from '../../assets/icons/calendar_of_training/icon_calendar_badge.png';
import iconCardioExerciseBadge from '../../assets/icons/cardio_exercise/icon_cardio_badge.png';
import iconClubsBadge from '../../assets/icons/my_clubs/icon_clubs_badge.png';
import iconCreateTrainingBadge from '../../assets/icons/create_training/icon_create_training_badge.png';
import iconFunctionalBadge from '../../assets/icons/functional_exercises/icon_functional_badge.png';
import iconMuscleBadge from '../../assets/icons/muscle_exercises/icon_muscle_badge.png';
import iconDisciplinesBadge from '../../assets/icons/disciplines/icon_disciplines_badge.png';
import iconExistingTrainingsBadge from '../../assets/icons/existing_trainings/icon_existing_trainings_badge.png';
import iconFavouriteBadge from '../../assets/icons/favourite_exercises/icon_favourite_badge.png';
import iconFindFriendsBadge from '../../assets/icons/my_friends/icon_search_badge.png';
import iconFriendsBadge from '../../assets/icons/my_friends/icon_friends_badge.png';
import iconNotificationsBadge from '../../assets/icons/notifications/icon_notifications_badge.png';
import iconSelectedBadge from '../../assets/icons/selected_exercises/icon_selected_badge.png';
import iconTrainTogetherBadge from '../../assets/icons/train_together/icon_train_together_badge.png';
import iconWorkoutNotesBadge from '../../assets/icons/workout_notes/icon_workout_notes_badge.png';
import iconUsersChatBadge from '../../assets/icons/my_friends/users_chat_badge.png';

export default class Badge extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    top: PropTypes.number
  }

  static defaultProps = {
    label: 'Submit',
    type: 'measurement',
    top: 0
  }

  render() {
    const { type, label, top } = this.props;

    const icons = {
      measurement: iconMeasurementBadge,
      stats: iconStatisticsBadge,
      calendar: iconCalendarBadge,
      cardio: iconCardioExerciseBadge,
      functional: iconFunctionalBadge,
      clubs: iconClubsBadge,
      training: iconCreateTrainingBadge,
      muscle: iconMuscleBadge,
      disciplines: iconDisciplinesBadge,
      existingTraining: iconExistingTrainingsBadge,
      favourite: iconFavouriteBadge,
      findFriends: iconFindFriendsBadge,
      friends: iconFriendsBadge,
      notifications: iconNotificationsBadge,
      selected: iconSelectedBadge,
      trainTogether: iconTrainTogetherBadge,
      workout: iconWorkoutNotesBadge,
      chat: iconUsersChatBadge
    };

    const toppedStyle = top && [ innerStyles.containerTopStyle, { top } ];

    return (
      <View style={toppedStyle || innerStyles.subScreenContainer}>
        <Image
          style={innerStyles.icon}
          source={icons[type]}
        >
          <View style={innerStyles.labelContainer}>
            <Text adjustsFontSizeToFit style={[ innerStyles.label, { marginTop: 10 } ]}>
              {I18n.t(label).toUpperCase()}
            </Text>
          </View>
        </Image>
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  containerTopStyle:{
    zIndex: 9999,
    position: 'absolute',
    left: (Dimensions.get('window').width / 2) - 49
  },
  icon: {
    width: 98,
    height: 98,
    resizeMode: 'contain'
  },
  subScreenContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap:'wrap',
    marginTop: 46
  },
  label:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    width: 90,
    backgroundColor: 'transparent'
  }
});
