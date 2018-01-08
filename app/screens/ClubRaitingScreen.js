import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import ObservableListStore from '../../utils/Store';

import myFirebase from '../../connection.js';

import HeaderIcon from '../components/shared/HeaderIcon.js';

import TopBackgroundImage from './ui_components/TopBackgroundImage.js';
import Badge from './ui_components/Badge.js';
import ScoreItem from './ui_components/ScoreItem.js';
import Button from './ui_components/Button.js';

import ClubInfo from './custom_items/clubs_info.js';

export default class ClubRaitingScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    scores: [],
    scoresHistory: [],
    categories: []
  }

  async componentWillMount() {
    await I18n.initAsync();

    this.getTotalScores();
    this.getScoresHistory();
    this.getRaitingCategories();
  }

  getTotalScores = () => {
    const clubKey = this.props.navigation.state.params.data;
    const clubsRef = myFirebase.database().ref('clubs');
    const clubRef = clubsRef.child(clubKey);

    clubRef.once('value', (dataSnapshot) => {
      this.setState({
        raiting: dataSnapshot.val().raiting || []
      });
    });
  }

  getScoresHistory = () => {
    const clubsHistoryRef = myFirebase.database().ref('clubsRaitingHistory');
    const clubHistoryRefById = clubsHistoryRef.child(this.props.navigation.state.params.id);

    clubHistoryRefById.once('value', (dataSnapshot) => {
      const history = [];

      dataSnapshot.forEach(child => {
        history.push(child.val());
      });

      this.setState({ scoresHistory: history });
    });
  }

  getRaitingCategories = () => {
    const raitingCategoriesRef = myFirebase.database().ref('clubsRaitingCategories');

    raitingCategoriesRef.once('value', (dataSnapshot) => {
      const categories = [];

      dataSnapshot.forEach(child => {
        categories.push(child.val());
      });

      this.setState({ categories });

      this.prepareTotalScores();
    });
  }

  prepareTotalScores = () => {
    const { raiting = [] } = this.state;

    this.setState({ scores: this.state.categories.map(category =>
      ({ ...category, ...(raiting.find(rate => rate.key === category.id) || { score: 0 }) }))
    });
  }

  updateRaitingHistory = () => {
    const clubsHistoryRef = myFirebase.database().ref('clubsRaitingHistory');
    const clubHistoryRefById = clubsHistoryRef.child(this.props.navigation.state.params.id);
    const dataToSave = {
      userEmail: ObservableListStore.email,
      raiting: this.state.scores.map(score => ({ key: score.id, score: score.score }))
    };

    clubHistoryRefById.transaction((currentData) => {
      if (currentData === null) {
        return [ dataToSave ];
      }

      return;
    }, (error, committed, snapshot) => {
      if (!committed) {
        const newChildRef = snapshot.ref.push();

        newChildRef.set(dataToSave);
      }
    });
  }

  updateTotalScores = () => {
    const clubKey = this.props.navigation.state.params.data;
    const clubsRef = myFirebase.database().ref('clubs');
    const clubRef = clubsRef.child(clubKey);
    const dataToSave = [ ...this.state.scores.map(score => ({ key: score.id, score: score.score })) ];
    const updatedHistory = [ ...this.state.scoresHistory, {
      userEmail: ObservableListStore.email,
      raiting: dataToSave
    } ];

    clubRef.child('raiting').transaction((currentData) => {
      if (currentData === null) {
        this.setState({
          isLoading: false,
          scoresHistory: updatedHistory,
          scores: dataToSave
        });

        return dataToSave;
      }

      return;
    }, (error, committed, snapshot) => {
      if (!committed) {
        const totalScores = [];

        snapshot.forEach(childSnap => {
          const countOfScores = this.state.scoresHistory.length;
          let totalScore = (dataToSave.find(score => score.key === childSnap.val().key) || {}).score;

          totalScore = (childSnap.val().score * countOfScores + totalScore) / (countOfScores + 1);

          totalScores.push({
            key: childSnap.val().key,
            score: totalScore
          });
        });

        snapshot.ref.set(totalScores);

        this.setState({
          isLoading: false,
          scoresHistory: updatedHistory,
          scores: totalScores
        });
      }
    });
  }

  onChangeScore = (item, value) => {
    const isFilledByUser = this.state.scoresHistory.find(score => score.userEmail === ObservableListStore.email);

    if (!this.state.isLoading && !isFilledByUser) {
      this.setState({
        scores: this.state.scores.map(score => score.id === item ? { ...score, score: value } : score)
      });
    }
  }

  onSave = () => {
    const isFilledByUser = this.state.scoresHistory.find(score => score.userEmail === ObservableListStore.email);

    if (!isFilledByUser) {
      this.setState({ isLoading: true });

      this.updateRaitingHistory();
      this.updateTotalScores();
    }
  }

  render() {
    const { name, city, street } = this.props.navigation.state.params;
    const { scores, isLoading, scoresHistory } = this.state;
    const isFilledByUser = scoresHistory.find(score => score.userEmail === ObservableListStore.email);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <TopBackgroundImage />

          <HeaderIcon type='back' onPress={() => this.props.navigation.goBack()} />

          <View style={{ marginBottom: 120 }} />

          <Badge type='clubs' label='clubs.clubs' />

          {scores.length
            ? scores.map(score => (<ScoreItem key={score.id} {...score} onPress={this.onChangeScore} />))
            : <View style={{ alignItems: 'center', padding: 30, marginBottom: 16 }}>
              <ActivityIndicator color='white' size='large' />
            </View>
          }

          <View style={{ flex: 1, margin: 24, marginTop: 0, backgroundColor: '#A07FE8', height: 2 }} />

          <Button
            label= 'buttons.save'
            onPress={this.onSave}
            loading = {isLoading}
            disabled = {isFilledByUser}
          />

          <ClubInfo
            type='short'
            data={{
              name,
              address: `${city}, ${street}`
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

I18n.fallbacks = true;
