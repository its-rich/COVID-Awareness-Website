import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik",
    authDomain: "seng3011-api.firebaseapp.com",
    databaseURL: "https://seng3011-api.firebaseio.com",
    projectId: "seng3011-api",
    storageBucket: "seng3011-api.appspot.com",
    messagingSenderId: "916531218349",
    appId: "1:916531218349:web:e7cea42daedc524dcb8324",
    measurementId: "G-BLMHL9W64E"
});

const db = firebaseApp.firestore();

export { db };
