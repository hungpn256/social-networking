import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDkMuvvvNwBbhEJzCD7DjB_xYVmcUSGeUw",
  authDomain: "social-networking-6a2e3.firebaseapp.com",
  projectId: "social-networking-6a2e3",
  storageBucket: "social-networking-6a2e3.appspot.com",
  messagingSenderId: "270950602851",
  appId: "1:270950602851:web:041a3ea4fccdfad3508056",
  measurementId: "G-ZWYXZLL372"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
