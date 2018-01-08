import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import Loader from './helpers/loader';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import HeaderIcon from '../components/shared/HeaderIcon';

import Badge from './ui_components/Badge';
import PlainList from './ui_components/PlainList';
import ObservableListStore from '../../utils/Store';

export default class MuscleExercisesScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.itemsRef = myFirebase.database().ref(`muscleExericises/${ObservableListStore.muscPartName}`);

    this.state = {
      spiner: true,
      Exercises: [],
      appIsReady: false,
      dataSource: null
    };
  }

  componentWillMount() {
    I18n.initAsync();
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
          name: child.val().name,
          img: String(child.val().img)
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
    this.naviToPage('MuscleExerciseStatistics', name);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView>
          <Loader activate={this.state.spiner} />

          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />
          <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

          <Badge type='stats' label='statistics.exercise_statistics' />

          {this.state.dataSource
            ? (
              <PlainList
                dataSource={this.state.dataSource}
                keys = {{
                  key: 'name',
                  avatar: 'img'
                }}
                title = 'muscle_exercises_names'
                onPressItem = {this.clickRedirect}
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
