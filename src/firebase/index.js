import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANLXQY7a-Zy3K6PQiWZ4aYnPYOVc_h5BE",
    authDomain: "library-app-73c13.firebaseapp.com",
    projectId: "library-app-73c13",
    storageBucket: "library-app-73c13.appspot.com",
    messagingSenderId: "996206619172",
    appId: "1:996206619172:web:afa1d78801b6c8beb0c6b1",
    measurementId: "G-4DTZYJZXY5"
  };

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);
let auth = getAuth(app);
let storage = getStorage(app);

export { db , auth , storage }