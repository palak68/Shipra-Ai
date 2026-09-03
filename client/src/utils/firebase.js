// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shifraai-f016b.firebaseapp.com",
  projectId: "shifraai-f016b",
  storageBucket: "shifraai-f016b.firebasestorage.app",
  messagingSenderId: "1085436149377",
  appId: "1:1085436149377:web:726e24b24f0c8703bf1780",
  measurementId: "G-5KHNEMLQJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}
