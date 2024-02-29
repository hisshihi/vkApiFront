// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDamjHlNFu33sF3IfnZakK_Xo9wk5Rx1bA",
    authDomain: "vkapi-edd17.firebaseapp.com",
    projectId: "vkapi-edd17",
    storageBucket: "vkapi-edd17.appspot.com",
    messagingSenderId: "1010297048970",
    appId: "1:1010297048970:web:7719b8f45845434b948273",
    measurementId: "G-P2MKMDT110"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);