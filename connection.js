// import React, {Component} from 'react';
import Firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDaxpSw6YW1EOnm1zC5IThfv46VVO32FAg",
  authDomain: "gymgang-a6459.firebaseapp.com",
  databaseURL: "https://gymgang-a6459.firebaseio.com",
  projectId: "gymgang-a6459",
  storageBucket: "gymgang-a6459.appspot.com",
  messagingSenderId: "680020410595"
};
// export const facebook = {
//   clientID: '1913808098860711',
//   clientSecret: '90b4f0acbb5865a1937d3dee84bf8687',
//   callbackURL: 'https://gymgang-a6459.firebaseapp.com/__/auth/handler',
//   profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
// };
//
// export const google = {
//   clientID: '680020410595-lp64tha734g5o2us3rq4raeeslnkgptt.apps.googleusercontent.com',
//   clientSecret: 'wG2-JClX4-ttnGitfraQru0o',
//   callbackURL: 'https://gymgang-a6459.firebaseapp.com/__/auth/handler',
// };

const myFirebase = Firebase.initializeApp(firebaseConfig);

module.exports = myFirebase;
