import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBLbVg3QNce9qUxe7jbCceMQMg81L2XXcM",
    authDomain: "journal-app-d4d3e.firebaseapp.com",
    projectId: "journal-app-d4d3e",
    storageBucket: "journal-app-d4d3e.appspot.com",
    messagingSenderId: "378057056628",
    appId: "1:378057056628:web:7e1663045931e5f0b9cc21"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    firebase,
    db,
    googleAuthProvider,

};
