import myFirebase from './../../connection';
import FirebaseService from './FirebaseService';
import moment from 'moment';
import { Alert } from 'react-native';
import I18n from 'ex-react-native-i18n';
import ObservableListStore from '../../utils/Store';

class BodyMeasurementReminder {
  static perform() {
    const userKey = FirebaseService.encodedEmail();
    const lastMeasurementRef = null;
    
    try {
      const lastMeasurementRef = myFirebase.database().ref('users').child(userKey).child('lastBodyMeasurementDate');      
    } catch(e) {
      return;
    }
    
    if (lastMeasurementRef === null) {
      return;
    }
    lastMeasurementRef.on('value', (snap) => {
      if (snap.val() === null) {
          return;
      }
      const lastDay = parseInt(snap.val().toString().substr(8, 2));
      const lastMonth = parseInt(snap.val().toString().substr(5, 2));
      const today = moment();
      const todayDay = today.date();
      const todayMonth = today.month();

      if (lastDay >= todayDay && lastMonth >= todayMonth) {
        console.log('Measurement already done today');
      } else if (!ObservableListStore.reminderDisplayed) {
        Alert.alert(
          I18n.t('general.reminder'),
          I18n.t('body_measurements.reminder'),
          [
            { text: 'OK', onPress: () => console.log('Pressed') }
          ],
          { cancelable: true }
        );

        ObservableListStore.reminderDisplayed = true;

      }
    });
  }
}

module.exports = BodyMeasurementReminder;
