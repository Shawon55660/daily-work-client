// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb3MT1ZHbxNha5k1ccH6UCzTRS8FWM6MI",
  authDomain: "to-do-list-fe473.firebaseapp.com",
  projectId: "to-do-list-fe473",
  storageBucket: "to-do-list-fe473.firebasestorage.app",
  messagingSenderId: "745072027666",
  appId: "1:745072027666:web:8e5726115294c8385790cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)