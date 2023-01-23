// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh7_x-Q6fXJrRfV6ZxQcQFUG4_Ue3WKOs",
  authDomain: "lampschool-app.firebaseapp.com",
  projectId: "lampschool-app",
  storageBucket: "lampschool-app.appspot.com",
  messagingSenderId: "548187266855",
  appId: "1:548187266855:web:a7c8dfd2adc59a266c5302",
  measurementId: "G-5VX3WYBQSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firbaseAnalytics = getAnalytics(app);