import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import HeaderIcon from '../components/shared/HeaderIcon.js';

import ObservableListStore from '../../utils/Store';

import Loader from './helpers/loader';

import styles from '../../styles.js';


import myFirebase from '../../connection.js';

import FirebaseLinks from '../../firebaseContext/firebase_links';

import BackgroundImage from './ui_components/BackgroundImage';
import Badge from './ui_components/Badge';
import PartsList from './ui_components/PartsList';

export default class MusclePartScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      database: myFirebase,
      muscleParts: FirebaseLinks.muscleParts,
      spiner: true,
      parts: [],
      appIsReady: false
    };
  }

  componentWillMount() {
    const items = [];

    I18n.initAsync();
    this.setState({ appIsReady: true });

    const isMale = ObservableListStore.user.gender === 'Male';

    this.state.muscleParts.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const snap = childSnapshot.val();

        items.push({
          name: snap.name,
          img: snap[`${isMale ? 'maleImg' : 'femaleImg'}`]
        });
      });

      this.setState({
        parts: items,
        spiner: false
      });
    });
  }

  naviToPage = (stackPage, data) => {
    this.props.navigation.navigate(stackPage, data);
  }

  clickRedirect = ({ name }) => {
    const { type, training } = this.props.navigation.state.params;

    ObservableListStore.muscPartName = name;
    this.naviToPage(type === 'stat' ? 'MuscleExercisesStatistics' : 'MuscleExercise', { name: ObservableListStore.muscPartName, training });
  }

  render() {
    const { type } = this.props.navigation.state.params;
    const badges = {
      muscle: { type: 'muscle', label: 'muscle_exercises.muscle_part' },
      stat: { type: 'stats', label: 'statistics.exercise_statistics' }
    };

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <BackgroundImage />

        <ScrollView>
          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge {...badges[type]} />

          <Loader activate={this.state.spiner} />

          <PartsList
            label = 'muscle_parts'
            items = {this.state.parts}
            onPressItem = {this.clickRedirect}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
