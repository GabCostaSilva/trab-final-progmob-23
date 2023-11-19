// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnhq4uinoHjOOcudgufZYGzxlnw0vfppY",
    authDomain: "photogram-ufms.firebaseapp.com",
    projectId: "photogram-ufms",
    storageBucket: "photogram-ufms.appspot.com",
    messagingSenderId: "886783114643",
    appId: "1:886783114643:web:f2b5dd459e3f47d4fb7c66",
    measurementId: "G-5VZFL8ZYQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
