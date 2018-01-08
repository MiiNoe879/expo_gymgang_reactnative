import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DrawerScreen from '../screens/DrawerScreen';
import BodyMeasurementMusclePartScreen from '../screens/BodyMeasurementMusclePartScreen';
import BodyPartStatisticsScreen from '../screens/BodyPartStatisticsScreen';
import MusclePartScreen from '../screens/MusclePartScreen';
import MuscleExercisesStatisticsScreen from '../screens/MuscleExercisesStatisticsScreen';
import MuscleExerciseStatisticsScreen from '../screens/MuscleExerciseStatisticsScreen';
import CreateNewTrainingScreen from '../screens/CreateNewTrainingScreen';
import CardioExerciseScreen from '../screens/CardioExerciseScreen';
import CalendarOfTrainingScreen from '../screens/CalendarOfTrainingScreen';
import SelectedExercisesScreen from '../screens/SelectedExercisesScreen';
import FavouriteExercisesScreen from '../screens/FavouriteExercisesScreen';
import ExistingTrainingsScreen from '../screens/ExistingTrainingsScreen';
import MuscleExercisesScreen from '../screens/MuscleExercisesScreen';
import ShowTrainingExercises from '../screens/ShowTrainingExercises';
import DefineMuscleExerciseScreen from '../screens/DefineMuscleExerciseScreen';
import FunctionalExercisesScreen from '../screens/FunctionalExercisesScreen';
import DefineFunctionalScreen from '../screens/DefineFunctionalExercise';
import DefineCardioExercise from '../screens/DefineCardioExercise';
import CalendarOfCreatedTraining from '../screens/CalendarOfCreatedTrainingScreen';
import WorkoutNotesScreen from '../screens/WorkoutNotesScreen';
import ClubsScreen from '../screens/ClubsScreen';
import MyClubsScreen from '../screens/MyClubsScreen';
import ClubScreen from '../screens/ClubScreen';
import ClubRaitingScreen from '../screens/ClubRaitingScreen';
import SearchClubsScreen from '../screens/SearchClubsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import MyFriendsScreen from '../screens/MyFriendsScreen';
import FindFriendsScreen from '../screens/FindFriendsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import BodyMeasurementScreen from '../screens/BodyMeasurementScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TrainTogetherScreen from '../screens/TrainTogetherScreen';
import UserCardScreen from '../screens/UserCardScreen';
import NotificationListScreen from '../screens/NotificationListScreen';
import ChatScreen from '../screens/ChatScreen';
import Shop from '../screens/ShopScreen';
import InfoScreen from '../screens/InfoScreen';
import UsersChat from '../screens/UsersChatScreen.js';
import SuggestedFriendsScreen from '../screens/SuggestedFriendsScreen';
import AddExerciseScreen from '../screens/AddExerciseScreen';


export const HomeStack = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
      title: 'Log In'
    }
  },
  Drawer: {
    screen: DrawerScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  UserCard: {
    screen: UserCardScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  NotificationList: {
    screen: NotificationListScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  ShowTrainingExer: {
    screen: ShowTrainingExercises,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  FindFriends:{
    screen: FindFriendsScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  CardioExercise: {
    screen: CardioExerciseScreen,
    navigationOptions: {
      header: null,
      title: 'Cardio exercise'
    }
  },
  CalendarOfCreated: {
    screen: CalendarOfCreatedTraining,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  TrainTogether: {
    screen: TrainTogetherScreen,
    navigationOptions: {
      header: null,
      title: 'Train Together'
    }
  },
  WorkOutNotes: {
    screen: WorkoutNotesScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  Friends: {
    screen: FriendsScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  MyFriends: {
    screen: MyFriendsScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  Clubs: {
    screen: ClubsScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  MyClubs: {
    screen: MyClubsScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  SearchClubs: {
    screen: SearchClubsScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  SuggestedFriends: {
    screen: SuggestedFriendsScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  Club: {
    screen: ClubScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  ClubRaiting: {
    screen: ClubRaitingScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  CalendarOfTraining: {
    screen: CalendarOfTrainingScreen,
    navigationOptions: {
      header: null,
      title: 'Calendar of training'
    }
  },
  Statistics: {
    screen: StatisticsScreen,
    navigationOptions: {
      header: null,
      title: 'Statistics'
    }
  },
  MuscleExercisesStatistics: {
    screen: MuscleExercisesStatisticsScreen,
    navigationOptions: {
      header: null,
      title: 'Muscle Exercises Statistics'
    }
  },
  MuscleExerciseStatistics: {
    screen: MuscleExerciseStatisticsScreen,
    navigationOptions: {
      header: null,
      title: 'Muscle Exercise Statistics'
    }
  },
  BodyMeasurementMusclePart: {
    screen: BodyMeasurementMusclePartScreen,
    navigationOptions: {
      header: null,
      title: 'Body Measurement Muscle Part'
    }
  },
  BodyPartStatistics: {
    screen: BodyPartStatisticsScreen,
    navigationOptions: {
      header: null,
      title: 'Body Part Statistics'
    }
  },
  BodyMeasurement: {
    screen: BodyMeasurementScreen,
    navigationOptions: {
      header: null,
      title: 'Body measurement'
    }
  },
  FunctionalExercises: {
    screen: FunctionalExercisesScreen,
    navigationOptions: {
      header: null,
      title: 'Functional exercises'
    }
  },
  SelectedExercises: {
    screen: SelectedExercisesScreen,
    navigationOptions: {
      header: null,
      title: 'Selected exercises'
    }
  },
  FavouriteExercises: {
    screen: FavouriteExercisesScreen,
    navigationOptions: {
      header: null,
      title: 'Favourite exercises'
    }
  },
  ExistingTrainings: {
    screen: ExistingTrainingsScreen,
    navigationOptions: {
      header: null,
      title: 'Existing trainings'
    }
  },
  MusclePart: {
    screen: MusclePartScreen,
    navigationOptions: {
      header: null,
      title: 'Muscle Part'
    }
  },
  MuscleExercise: {
    screen: MuscleExercisesScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  DefineCardio: {
    screen: DefineCardioExercise,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  DefineFunctional: {
    screen: DefineFunctionalScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  DefineMuscleExercise: {
    screen: DefineMuscleExerciseScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  CreateNewTraining: {
    screen: CreateNewTrainingScreen,
    navigationOptions: {
      header: null,
      title: 'Create new training'
    }
  },
  AddExercise :{
    screen: AddExerciseScreen,
    navigationOptions: {
      header: null,
      title: 'Add exercise'
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,

      title: 'Register'
    }
  },
  Shop: {
    screen: Shop,
    navigationOptions: {
      header: null,
      title: 'Shop'
    }
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: {
      header: null,
      title: null
    }
  },
  UsersChat: {
    screen: UsersChat,
    navigationOptions: {
      header: null,
      title: null
    }
  }
});
