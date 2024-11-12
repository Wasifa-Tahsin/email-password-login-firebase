// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwOwTU7RfP8Z-XfLEnYOn6MDa19fNXwhQ",
  authDomain: "mail-password-auth-2a0be.firebaseapp.com",
  projectId: "mail-password-auth-2a0be",
  storageBucket: "mail-password-auth-2a0be.firebasestorage.app",
  messagingSenderId: "587300730705",
  appId: "1:587300730705:web:7bcb00d147dfabbc924570"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);