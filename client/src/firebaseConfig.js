// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKpPh19BX46SnppL742vAEiXvOKZ5wVro",
  authDomain: "pijet-f3a36.firebaseapp.com",
  projectId: "pijet-f3a36",
  storageBucket: "pijet-f3a36.appspot.com",
  messagingSenderId: "372067192952",
  appId: "1:372067192952:web:7c11e65cb59f111a719d8d",
  measurementId: "G-LRHNBW2HDK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp

