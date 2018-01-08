const firebase = require('../connection.js');

const FirebaseLinks = {
  maleBodyParts: firebase.database().ref('bodyParts/male'),
  femaleBodyParts: firebase.database().ref('bodyParts/female'),
  muscleParts: firebase.database().ref('muscleParts'),
  disciplines: firebase.database().ref('disciplines'),
  users: firebase.database().ref('users'),
  muscleExericises: firebase.database().ref('muscleExericises'),
  functionalExercises: firebase.database().ref('functionalExericises'),
  notifications: firebase.database().ref('notifications'),
  friends: firebase.database().ref('friends'),
  messages: firebase.database().ref('messages'),
  usersClubs: firebase.database().ref('usersClubs')
};

module.exports = FirebaseLinks;
