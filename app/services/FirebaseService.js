import ObservableListStore from './../../utils/Store';
import myFirebase from '../../connection';

class FirebaseService {
  static encodedEmail() {
    return this._encodeAsFirebaseKeySimple(ObservableListStore.email);
  }

  static fetchFavouriteExercises() {
    console.log('jaja', ObservableListStore.email);
    const userEmail = this.encodedEmail();
    try {
      const userFavouriteClubs = myFirebase.database().ref('users').child(userEmail).child('favouriteExercises');

      userFavouriteClubs.once('value', (snap) => {
        const items = snap.val();
        ObservableListStore.favouriteExercises = items ? items : [];
      });
    } finally {
      return;
    }

  }

  static getUserCheckInClub() {
    const userEmail = this.encodedEmail();
    try {
      const user = myFirebase.database().ref(`users/${userEmail}`).child('inClub')
      user.once('value', (snap) => {
        ObservableListStore.inClub = snap.val();
        return snap.val();
      });
    } catch (e) {
      return;
    }
  }

  static _encodeAsFirebaseKeySimple(string) {
    return (string || '').replace(/\./g, ',');
  }
}

module.exports = FirebaseService;
