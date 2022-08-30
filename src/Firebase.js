import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Orders from './Components/Orders';

const firebaseConfig = {
    apiKey: "AIzaSyDoBowFVKBl1DojFF7GwCVw5zWa5WUUhJY",
    authDomain: "ecomm-react-2ca49.firebaseapp.com",
    projectId: "ecomm-react-2ca49",
    storageBucket: "ecomm-react-2ca49.appspot.com",
    messagingSenderId: "941256200813",
    appId: "1:941256200813:web:aeb1292e2c296f6399a564",
    measurementId: "G-RBWKTZ5E4G"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }