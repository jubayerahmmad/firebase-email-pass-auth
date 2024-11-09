// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQd_dZtwzakQIQhRtMe7AaP5qrUElZVbo",
  authDomain: "email-password-auth-e465f.firebaseapp.com",
  projectId: "email-password-auth-e465f",
  storageBucket: "email-password-auth-e465f.firebasestorage.app",
  messagingSenderId: "952380906117",
  appId: "1:952380906117:web:f29e9dd7f56b348e46a7ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
