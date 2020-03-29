import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik",
    authDomain: "seng3011-api.firebaseapp.com",
    databaseURL: "https://seng3011-api.firebaseio.com",
    projectId: "seng3011-api",
    storageBucket: "seng3011-api.appspot.com",
    messagingSenderId: "916531218349",
    appId: "1:916531218349:web:971ed15ea423d27ccb8324",
    measurementId: "G-WE5K4RQ0G2"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);