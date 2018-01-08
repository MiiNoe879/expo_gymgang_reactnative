import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Text, Divider } from 'react-native-elements';
import I18n from 'ex-react-native-i18n';

import AvatarSmallInfo from '../components/AvatarSmallInfo';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutNotesScreen from '../screens/WorkoutNotesScreen';
import FillProfileInfoScreen from '../screens/FillProfileInfoScreen';
import DisciplinesScreen from '../screens/DisciplinesScreen';
import ClubsScreen from '../screens/ClubsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import TrainTogetherScreen from '../screens/TrainTogetherScreen';
import LogoutScreen from '../screens/LogoutScreen';
import ShopScreen from './ShopScreen';

import styles from '../../styles.js';
import iconDashboard from '../assets/icons/drawer/icon_dashboard.png';
import iconTrain from '../assets/icons/drawer/icon_train.png';
import iconWorkout from '../assets/icons/drawer/icon_workout.png';
import iconClubs from '../assets/icons/drawer/icon_sport_clubs.png';
import iconFriends from '../assets/icons/drawer/icon_friends.png';
import iconEditProfile from '../assets/icons/drawer/icon_edit_profile.png';
import iconEditSports from '../assets/icons/drawer/icon_your_sports.png';
import iconLogout from '../assets/icons/drawer/icon_sign_out.png';
import iconShop from '../assets/icons/drawer/shop_icon_75x75.png';

I18n.initAsync();

/* eslint-disable react/prop-types, react/no-multi-comp */

function getOptions(label, icon) {
  return {
    drawerLabel: I18n.t(label, { locale: 'pl-PL' }).toUpperCase(),
    drawerIcon: ({ tintColor }) => (
      <Image
        source={icon}
        style={{ width: 24, height: 24, tintColor, resizeMode: 'contain' }}
      />
    )
  };
}

export default DrawerNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: getOptions('drawer.dashboard', iconDashboard)
    },
    TrainTogether: {
      screen: TrainTogetherScreen,
      navigationOptions: getOptions('drawer.train_together', iconTrain)
    },
    Workout: {
      screen: WorkoutNotesScreen,
      navigationOptions: getOptions('drawer.workout_notes', iconWorkout)
    },
    Clubs: {
      screen: ClubsScreen,
      navigationOptions: getOptions('drawer.clubs', iconClubs)
    },
    // Friends: {
    //   screen: FriendsScreen,
    //   navigationOptions: getOptions('drawer.friends', iconFriends)
    // },
    EditProfile: {
      screen: FillProfileInfoScreen,
      navigationOptions: getOptions('drawer.edit_profile', iconEditProfile)
    },
    Disciplines: {
      screen: DisciplinesScreen,
      navigationOptions: getOptions('drawer.disciplines', iconEditSports)
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: getOptions('drawer.logout', iconLogout)
    },
    Shop: {
      screen: ShopScreen,
      navigationOptions: getOptions('drawer.shop', iconShop)
    }
  },
  {
    initialRouteName: 'Dashboard',
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#A07CEB',
      inactiveTintColor: '#fff',
      style: {
        marginVertical: 0
        // opacity: 0.4
      }
    },
    contentComponent: (props) => (
      <ScrollView style={styles.drawerContainer}>
        {/* DRAWER AVATAR */}
        <AvatarSmallInfo />

        {/* DRAWER ITEMS */}
        <View style={styles.drawerItemsContainer}>
          <Text style={[ styles.textDrawerItems, styles.textColorLight ]}>{I18n.t('drawer.account')}</Text>
          <Divider style={{ marginLeft: 10, marginRight: 10, backgroundColor: '#A07CEB' }} />

          <DrawerItems
            {...props}
            items={props.items.filter((item) => item.routeName !== 'EditProfile' && item.routeName !== 'Disciplines' && item.routeName !== 'Settings' && item.routeName !== 'Logout')}
          />
          <Text style={[ styles.textDrawerItems, styles.textColorLight ]}>{I18n.t('drawer.settings')}</Text>
          <Divider style={{ marginLeft: 10, marginRight: 10, backgroundColor: '#A07CEB' }} />

          <DrawerItems
            {...props}
            items={props.items.filter((item) => item.routeName === 'EditProfile' || item.routeName === 'Disciplines' || item.routeName === 'Settings' || item.routeName === 'Logout')}
          />
        </View>
      </ScrollView>
    )
  }
);

/* eslint-enable */

I18n.fallbacks = true;
