import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCb9zz--_0Aqz4sX22yQK67Qc2ji6QskFA',
  authDomain: 'react-firebase-1723d.firebaseapp.com',
  projectId: 'react-firebase-1723d',
  storageBucket: 'react-firebase-1723d.appspot.com',
  messagingSenderId: '32205083946',
  appId: '1:32205083946:web:3160781bf15772c7ff7a53',
  measurementId: 'G-R2EHEE6LYS',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
