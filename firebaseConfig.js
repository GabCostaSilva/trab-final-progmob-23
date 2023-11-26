// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARQBc7YD2EwjUgg7u25c2I5P0EtJFBB48",
    authDomain: "photogram-35378.firebaseapp.com",
    projectId: "photogram-35378",
    storageBucket: "photogram-35378.appspot.com",
    messagingSenderId: "774000284604",
    appId: "1:774000284604:web:f0f0a932f5179cac6611b9",
    measurementId: "G-CDTCZMXR6V",
    databaseURL: "https://photogram-35378-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const database = getFirestore(app);
