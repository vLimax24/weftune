// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBuFKt7MMAsrW6Z1lEe9eT8cIMzphy_U0",
  authDomain: "weftune.firebaseapp.com",
  projectId: "weftune",
  storageBucket: "weftune.appspot.com",
  messagingSenderId: "452111358702",
  appId: "1:452111358702:web:e9feaa551b0d204bc8b1ff",
  measurementId: "G-PXW74EHQKB"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const provider = new GithubAuthProvider();
const analytics = getAnalytics(FIREBASE_APP);