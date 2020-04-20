import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const config = ({
    apiKey: "AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik",
    authDomain: "seng3011-api.firebaseapp.com",
    databaseURL: "https://seng3011-api.firebaseio.com",
    projectId: "seng3011-api",
    storageBucket: "seng3011-api.appspot.com",
    messagingSenderId: "916531218349",
    appId: "1:916531218349:web:971ed15ea423d27ccb8324",
    measurementId: "G-WE5K4RQ0G2"
});

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;