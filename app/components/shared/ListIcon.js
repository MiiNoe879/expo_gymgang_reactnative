import React, { Component } from 'react';
import { View, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import iconBike from '../../assets/icons/cardio_exercise/icon_bike.png';
import iconOrbitrek from '../../assets/icons/cardio_exercise/icon_orbitrek.png';
import iconStairs from '../../assets/icons/cardio_exercise/icon_stairs.png';
import iconTrack from '../../assets/icons/cardio_exercise/icon_track.png';
import iconRower from '../../assets/icons/cardio_exercise/icon_rower.png';
import iconClubs from '../../assets/icons/my_clubs/icon_clubs.png';
import iconSearchClubs from '../../assets/icons/my_clubs/icon_search_clubs.png';
import iconMuscle from '../../assets/icons/create_training/icon_muscle.png';
import iconCardio from '../../assets/icons/create_training/icon_cardio.png';
import iconFunctional from '../../assets/icons/create_training/icon_functional.png';
import iconSelected from '../../assets/icons/create_training/icon_selected.png';
import iconFavourite from '../../assets/icons/create_training/icon_favourite.png';
import iconMyFriends from '../../assets/icons/my_friends/icon_my_friends.png';
import iconSuggested from '../../assets/icons/my_friends/icon_suggested.png';
import iconFind from '../../assets/icons/my_friends/icon_find.png';
import iconBodyMeasurements from '../../assets/icons/workout_notes/icon_body_measure.png';
import iconCrossFit from '../../assets/icons/workout_notes/icon_crossfit.png';
import iconAddWorkout from '../../assets/icons/workout_notes/icon_add_workout.png';
import iconExistingTraining from '../../assets/icons/workout_notes/icon_existing_training.png';
import iconCalendar from '../../assets/icons/workout_notes/icon_calendar.png';
import iconStats from '../../assets/icons/workout_notes/icon_stats.png';
import iconTrain from '../../assets/icons/dashboard/icon_dashboard_train_together.png';
import iconWorkout from '../../assets/icons/dashboard/icon_dashboard_workout.png';
import iconFriends from '../../assets/icons/dashboard/icon_dashboard_friends.png';
import iconChat from '../../assets/icons/my_friends/usersChat.png';

import checkedIcon from '../../assets/icons/shared/checked.png';

export default class ListIcon extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    dimensions: PropTypes.object,
    style: PropTypes.oneOfType([ PropTypes.object, PropTypes.number ]),
    index: PropTypes.number,
    badge: PropTypes.number,
    disabled: PropTypes.bool,
    isBadge: PropTypes.bool,
    empty: PropTypes.bool,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  }

  static defaultProps = {
    type: 'back',
    index: 1,
    badge: 0,
    disabled: false,
    isBadge: false,
    empty: false,
    isSelected: false,
    style: {},
    dimensions: { width: 98, height: 98 }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { text, index, type, dimensions, isBadge, isSelected, badge, onPress, disabled, empty, style } = this.props;

    const icons = {
      bike: iconBike,
      elliptical: iconOrbitrek,
      stairs: iconStairs,
      track: iconTrack,
      rower: iconRower,
      myClubs: iconClubs,
      searchClubs: iconSearchClubs,
      addMuscle: iconMuscle,
      addCardio: iconCardio,
      addFunc: iconFunctional,
      showTraining: iconSelected,
      favouriteExercises: iconFavourite,
      myFriends: iconMyFriends,
      findSuggested: iconSuggested,
      findFriends: iconFind,
      bodyMeasurMuscle: iconBodyMeasurements,
      crossFit: iconCrossFit,
      createTraining: iconAddWorkout,
      existingTraining: iconExistingTraining,
      trainingsCalendar: iconCalendar,
      stats: iconStats,
      trainTogether: iconTrain,
      workout: iconWorkout,
      dashFriends: iconFriends,
      chat: iconChat
    };

    return (
      <View style={innerStyles.container}>
        <TouchableHighlight
          onPress={onPress} underlayColor='#91C02F' disabled={disabled}
        >
          <View
            style={[
              innerStyles.tileAction6,
              innerStyles[`tileAction0${index}`],
              style,
              isSelected ? innerStyles.selectedContainer : {}
            ]}
          >
            {!empty
              ? (
                <Image
                  style={[ { resizeMode: 'contain' }, dimensions ]}
                  source={icons[type]}
                />) : null
            }

            {!empty
              ? (
                <Text adjustsFontSizeToFit style={[ innerStyles.textCenter, innerStyles.tilesLabel ]}>
                  {I18n.t(text).toUpperCase()}
                </Text>
              )
              : null
            }

            {isBadge && !empty
              ? <Badge containerStyle={innerStyles.badgeTraining}><Text style={{ color: 'white' }} >{badge}</Text></Badge>
              : null
            }

            {isSelected && !empty
              ? <Image style={innerStyles.selectedBulb} source={checkedIcon} />
              : null
            }
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const innerStyles = StyleSheet.create({
  container: {
    width: '50%'
  },
  badgeTraining: {
    backgroundColor: 'transparent',
    borderWidth:2,
    borderColor:'#91C02F'
  },
  selectedContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'relative'
  },
  tileAction01: {
    borderColor: '#A07CEB',
    borderRightWidth: 1,
    borderBottomWidth: 1
  },
  tileAction02: {
    borderColor: '#A07CEB',
    borderBottomWidth: 1
  },
  tileAction03: {
    borderColor: '#A07CEB',
    borderRightWidth: 1
  },
  tileAction04: {
    borderColor: '#A07CEB'
  },
  tileAction05: {
    borderColor: '#A07CEB',
    borderRightWidth: 1,
    borderTopWidth: 1
  },
  tileAction06: {
    borderColor: '#A07CEB',
    borderTopWidth: 1
  },
  tileAction056: {
    borderColor: '#A07CEB',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  tileAction6: {
    justifyContent:'center',
    alignItems:'center',
    height: 160,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    paddingBottom: 50,
    overflow: 'hidden'
  },
  textCenter: {
    textAlign: 'center',
    color: '#fff'
  },
  tilesLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  selectedBulb: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    resizeMode: 'contain'
  }
});
