import { AsyncStorage } from 'react-native';
import { observable, computed } from 'mobx';

let MuscIndex = 0
let FuncIndex = 0

class ObservableListStore {
  @observable avatar = "avatar";
  @observable name = "name";
  @observable email = "email";

  @observable coordinates = {};
  @observable user = {};

  @observable readOnly = false;

  @observable muscPartName = "";
  // Exercises store
  @observable muscExercises = [];
  @observable funcExercises = [];
  @observable cardExercises = [];
  //

  // Favourite exercises store
  @observable favouriteExercises = [];
  //

  @observable notificationsCount = 0;
  @observable editedTrainingKey = null;

  // Exercises series store
  @observable muscleExericeseSeries = [];
  @observable funcExerceiseSeries = [];
  @observable cardioExerceiseSeries = {
    length: 0,
    time: 0,
    level: 0,
    warmUp: 0,
    fastPace: 0,
    slowPace: 0,
    repeats: 0
  };
  //

  // Trainings store
  @observable trainings = {muscleExercises:[],functionalExercises:[],cardioExercises:[]};
  //

  //Reminder displayed
  @observable reminderDisplayed = false;
  //

  @observable currentClubName = '';
  @observable currentClubCity = '';
  @observable currentClubKey = '';

  setEmail(Email){
    this.email = Email
  }

  setCoordinates(coordinates){
    this.coordinates = coordinates
  }

  setUserData(user){
    this.user = user;

    AsyncStorage.setItem('user', JSON.stringify(user));
  }

  updateUserData(update) {
    this.user = { ...this.user, ...update };

    AsyncStorage.setItem('user', JSON.stringify(this.user));
  }

  setNotificationsCount(notificationsCount) {
    this.notificationsCount = notificationsCount;
  }

  @computed get Email(){
    return this.email;
  }

  clean() {
    MuscIndex = 0
    FuncIndex = 0

    this.user = {};
    this.email = '';
    this.coordinates = {};

    this.muscleExericeseSeries = [];
    this.funcExerceiseSeries = [];
    this.cardioExerceiseSeries = {
      length: 0,
      time: 0,
      level: 0,
      warmUp: 0,
      fastPace: 0,
      slowPace: 0,
      repeats: 0
    };
  }

  // Trainings actions
  addTraining(item) {
    this.trainings.push(item);
  }
  //

  // Exercises actions
  addMuscleExercise(item) {
    this.addExercise(item, 'muscExercises');
  }

  addFuncExercise(item) {
    this.addExercise(item, 'funcExercises');
  }

  addCardExercise(item) {
    this.addExercise(item, 'cardExercises');
  }

  addExercise(item, name) {
    if (this[name].find(exercise => exercise.exerciseName === item.exerciseName)) {
      this[name] = this[name].map(exercise => exercise.exerciseName === item.exerciseName ? item : exercise);
    } else {
      this[name].push(item);
    }
  }

  removeExercise(name, category) {
    const categories = {
      muscleExercises: 'muscExercises',
      functionalExercises: 'funcExercises',
      cardioExercises: 'cardExercises'
    };

    this[categories[category]] = this[categories[category]].filter(exercise => exercise.exerciseName !== name);
  }

  addFavouriteExercise(item) {
    this.favouriteExercises.push(item);
  }

  removeFavouriteExercise(item) {
    this.favouriteExercises = this.favouriteExercises.filter(exercise => exercise.name != item.name);
  }

  // Muscle series actions
  setMuscleSeries(series) {
    this.muscleExericeseSeries = series;
  }

  addMuscleSeriesItem (item = {}) {
    this.muscleExericeseSeries.push({
      repeats: item.repeats || 0,
      weight: item.weight || 0,
      index: (this.muscleExericeseSeries || []).length + 1
    })
  }

  updateMuscleSeriesItemRepeat(item, val) {
    var arr = this.muscleExericeseSeries
    arr[item.index - 1].repeats = val
    arr[item.index - 1].index = item.index

    this.muscleExericeseSeries.replace(arr)
  }

  updateMuscleSeriesItemWeight(item, val) {
    var arr = this.muscleExericeseSeries
    arr[item.index - 1].weight = val
    arr[item.index - 1].index = item.index
    this.muscleExericeseSeries.replace(arr)
  }

  removeMuscleSeriesItem () {
    this.muscleExericeseSeries.splice(-1,1)
  }
  //

  // Functional series actions
  setFuncSeries(series) {
    this.funcExerceiseSeries = series;
  }

  addFuncSeriesItem (item = {}) {
    this.funcExerceiseSeries.push({
      repeats: item.repeats || 0,
      time: item.time || 0,
      index: (this.funcExerceiseSeries || []).length + 1
    });
  }

  updateFuncSeriesItemRepeat(item, val) {
    var arr = this.funcExerceiseSeries
    arr[item.index - 1].repeats = val
    arr[item.index - 1].index = item.index
    this.funcExerceiseSeries.replace(arr)
  }

  updateFuncSeriesItemTime(item, val) {
    var arr = this.funcExerceiseSeries
    arr[item.index - 1].time = val
    arr[item.index - 1].index = item.index
    this.funcExerceiseSeries.replace(arr)
  }

  removeFuncSeriesItem () {
    this.funcExerceiseSeries.splice(-1, 1)
  }
  //

  // Cardio series actions
  updateCardVal(item, val) {
    this.cardioExerceiseSeries[item] = val;
  }

}

const observableListStore = new ObservableListStore()
export default observableListStore
