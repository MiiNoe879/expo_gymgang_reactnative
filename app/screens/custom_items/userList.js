import React from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from 'ex-react-native-i18n';
import SquareGrid from 'react-native-square-grid';
import InfiniteScroll from 'react-native-infinite-scroll';
import PropTypes from 'prop-types';

import ItemUser from './item_user';

import Loader from '../helpers/loader';

import SearchBar from '../ui_components/SearchBar';

import myFirebase from '../../../connection.js';

import FirebaseLinks from '../../../firebaseContext/firebase_links';

export default class UserList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      database: myFirebase,
      userList: FirebaseLinks.users,
      dataSource: [],
      defaultData: [],
      searchParam: 0,
      spiner: true,
      users: [],
      _start: 0,
      _count: 9,
      _countKey: 0
    };
  }

  componentWillMount() {
    let chr = '';

    for (let i = 0; i < 3; ++i) {
      chr += String.fromCharCode(97 + Math.floor(Math.random() * 24));
    }


    this.state.userList.orderByKey().startAt(chr).limitToFirst(this.state._count).once('value', this.itemsFilter.bind(null, { isInitial: true }));
  }

  itemsFilter = ({ items = [], isInitial = false, isChained = false }, snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const snap = childSnapshot.val();

      if (!this.state.dataSource.length || !this.state.dataSource.find(item => item.key === childSnapshot.key)) {
        items.push({
          name: snap.name,
          img: snap.picturePath,
          key: childSnapshot.key
        });
      }
    });

    this.setState({
      dataSource: isChained ? [ ...this.state.dataSource, ...items ] : items,
      _start: items[items.length - 1].name,
      _countKey: (this.state._countKey + this.state._count)
    });

    if (isInitial) {
      this.setState({
        defaultData: items,
        spiner: false
      });
    }
  }

  loadUsers = ({ child, start, limitToFirst, items = [], isChained }) => {
    const usersRef = this.state.userList.orderByChild(child).startAt(start);

    usersRef.limitToFirst(limitToFirst).once('value', this.itemsFilter.bind(null, { items, isChained }));

    return usersRef;
  }

  loadMorePage() {
    const { dataSource, _start, _count } = this.state;

    const params = { child: 'name', start: _start, limitToFirst: _count + 5, items: dataSource };

    this.loadUsers(params);
    this.loadUsers({ ...params, child: 'email' });
  }

  searchAction(param) {
    const params = { child: 'name', start: param, limitToFirst: this.state._count };

    const result = this.loadUsers(params).limitToFirst(1);

    result.once('value', (snap) => {
      const user = snap.val();
      const userKey = Object.keys(user)[0];
      const userName = user[userKey].name;

      if (userName != param) {
        const tempParams = { child: 'email', start: param.toLowerCase(), limitToFirst: this.state._count };

        this.loadUsers(tempParams);

        return;
      }
    });

    // this.loadUsers({ ...params, child: 'email' });
  }

  naviToPage = (stackPage, data) => {
    this.props.navigation.navigate(stackPage, { data });
  }

  goToUserCard = (key) => {
    this.naviToPage('UserCard', { userKey: key });
  }

  renderRow(rowData) {
    return (
      <ItemUser
        style={innerStyles.item}
        click={() => {}}
        title={rowData.name}
        img={rowData.img}
      />
    );
  }

  render() {
    return (
      <View>
        {/* SEARCHBAR */}
        <SearchBar
          showLoadingIcon={this.state.spiner}
          onChangeText={(text) => {
            if (text.length > 0) {
              this.searchAction(text);
            } else {
              this.setState({ dataSource: this.state.defaultData });
            }
          }}
        />

        {/* <View> */}
        <InfiniteScroll
          horizontal={false}
          onLoadMoreAsync={this.loadMorePage.bind(this)}
          distanceFromEnd={2}
        >
          <Loader activate={this.state.spiner} />
          <SquareGrid
            style={innerStyles.userList} columns={3} items={this.state.dataSource}
            renderItem={(item) =>
              <ItemUser click={() => this.goToUserCard(item.key)} title={item.name} img={item.img} />
            }
          />
        </InfiniteScroll>
        {/* </View> */}
      </View>
    );
  }
}


const innerStyles = StyleSheet.create({
  userList: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap'
  },
  item: {
    margin: 3,
    width: 100
  }
});


I18n.fallbacks = true;
