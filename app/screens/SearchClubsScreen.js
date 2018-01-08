import React from 'react';
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, Text, View } from 'react-native';
import I18n from 'ex-react-native-i18n';
import PropTypes from 'prop-types';

import Loader from './helpers/loader';

import styles from '../../styles.js';

import myFirebase from '../../connection.js';

import HeaderIcon from '../components/shared/HeaderIcon.js';

import Badge from './ui_components/Badge';
import CheckPlainList from './ui_components/CheckPlainList';
import SearchBar from './ui_components/SearchBar';

export default class SearchClubsScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.itemsRef = myFirebase.database().ref().child('clubs').limitToFirst(50);

    this.state = {
      appIsReady: false,
      dataSource: null,
      searchParam: 0,
      spiner: false,
      loading: true,
      recordFound: false,
      noClubs: false
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
    myFirebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // No user is signed in.
        this.setState({
          loggedIn: false,
          loaded: true,
          currentUserEmail: user.email
        });
      } else {
        this.setState({
          currentUserEmail: user.email
        });
        const usersClubsRef = myFirebase.database().ref('usersClubs');
        const emailReplaced = this.encodeAsFirebaseKeySimple((user || {}).email);
        const userClubsRef = usersClubsRef.child(emailReplaced);

        const items = [];

        userClubsRef.once('value', (snapClubs) => {
          itemsRef.on('value', (snap) => {
            snap.forEach((child) => {
              // // If clubKey exist in array
              if (snapClubs.val() === null) {
                items.push({
                  city: child.val().city,
                  name: child.val().name,
                  id: child.val().id,
                  _key: child.key,
                  selected: false
                });
              } else if (snapClubs.val() !== null) {
                const itemsKeys = snapClubs.val().selectedClubsKeys.split(',');

                if (itemsKeys.indexOf(child.key) > -1) {
                  items.push({
                    city: child.val().city,
                    name: child.val().name,
                    id: child.val().id,
                    _key: child.key,
                    selected: true
                  });
                } else {
                  items.push({
                    city: child.val().city,
                    name: child.val().name,
                    id: child.val().id,
                    _key: child.key,
                    selected: false
                  });
                }
              }
            });
            this.setState({
              items,
              dataSource: items,
              loading: false,
              spiner: false
            });
          });
        });
      }
    });
  }

  searchAction =(param) => {
    this.setState({ spinner: true });
    let items = this.state.items;
    let capitalize = (temp) => {
      temp = param;
      return temp.charAt(0).toUpperCase() + temporary.slice(1);
    };

    items = items.filter((value) => { return value.name.includes(param) });

    let cities = this.state.items;
    cities = cities.filter((value) => { return value.city.includes(param) });

    cities.map((item) => items.push(item));

    this.setState({
      dataSource: items,
      spinner: false
    });
  }

  // Add item to firebase
  addItem(item) {
    this.itemsRef.push(item);
  }

  // Add item to firebase
  deleteItem(item) {
    // alert(JSON.stringify(item._key));
    this.itemsRef.child(item._key).remove();
  }

  openClubCard = ({ _key }) => {
    this.props.navigation.navigate('Club', { data: _key });
  }

  encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }

  onCheck = (_data) => {
    if (_data.selected) {
      this.deleteFromMyClubs(_data._key);
    } else {
      this.addToMyClubs(_data._key);
    }
  }

  addToMyClubs(clubKey) {
    const usersClubsRef = myFirebase.database().ref('usersClubs');
    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.currentUserEmail);
    const userClubsRef = usersClubsRef.child(emailReplaced);
    let selectedClubsKeys = [];

    userClubsRef.once('value', (snap) => {
      // if response is not null
      if (snap.val() !== null) {
        selectedClubsKeys = snap.val().selectedClubsKeys; // string
        selectedClubsKeys = selectedClubsKeys.split(','); // array
      }

      let count = selectedClubsKeys.length;

      if (selectedClubsKeys[0] === '') {
        count--;
      }
      if (count >= 5) {
        alert('You are not allowed to select more than 5 clubs');

        return;
      }
      // If clubKey doesnt exist in array
      if (selectedClubsKeys.indexOf(clubKey) === -1) {
        selectedClubsKeys.push(clubKey);
      }

      userClubsRef.update({
        selectedClubsKeys: selectedClubsKeys.join() // string
      });
      this.itemsRef = myFirebase.database().ref().child('clubs').limitToFirst(50);
      this.listenForItems(this.itemsRef);
    });
  }

  // Delete item from firebase
  deleteFromMyClubs(clubKey) {
    const usersClubsRef = myFirebase.database().ref('usersClubs');
    const emailReplaced = this.encodeAsFirebaseKeySimple(this.state.currentUserEmail);
    const userClubsRef = usersClubsRef.child(emailReplaced);
    let selectedClubsKeys = [];

    userClubsRef.once('value', (snap) => {
      // if response is not null
      if (snap.val() !== null) {
        selectedClubsKeys = snap.val().selectedClubsKeys; // string
        selectedClubsKeys = selectedClubsKeys.split(','); // array
      }
      // If clubKey exist in array
      if (selectedClubsKeys.indexOf(clubKey) > -1) {
        const index = selectedClubsKeys.indexOf(clubKey);

        if (index > -1) {
          selectedClubsKeys.splice(index, 1);
        }
      }

      userClubsRef.update({
        selectedClubsKeys: selectedClubsKeys.join() // string
      });
      this.itemsRef = myFirebase.database().ref().child('clubs').limitToFirst(50);
      this.listenForItems(this.itemsRef);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Loader activate={this.state.loading} />

        <HeaderIcon type='back' onPress={() => this.props.navigation.navigate('Clubs')} />
        <HeaderIcon type='bell' onPress={() => this.props.navigation.navigate('NotificationList')} />

        <Badge type='clubs' label='clubs.search_clubs' />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', marginBottom: 20 }}>{I18n.t('clubs.no_more_clubs')}</Text>
        </View>
        {/* SEARCHBAR */}
        <SearchBar
          showLoadingIcon={this.state.spiner}
          onChangeText={(text) => this.searchAction(text)}
        />

        {/* LIST */}
        <ScrollView>
          {this.state.dataSource && !this.state.spiner
            ? (
              <CheckPlainList
                dataSource={this.state.dataSource}
                keys = {{
                  key: 'name',
                  title: 'name',
                  subtitle: 'city',
                  avatar: 'avatar_url'
                }}
                onCheck = {this.onCheck}
                onPressItem = {this.openClubCard}
                containerStyle={styles.rowNormal}
              />
            )
            : <ActivityIndicator size='large' color='white' style={{ marginTop: 36 }} />
          }
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

I18n.fallbacks = true;
