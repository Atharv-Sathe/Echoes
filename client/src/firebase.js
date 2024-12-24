// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "echoes-fafb3.firebaseapp.com",
  projectId: "echoes-fafb3",
  storageBucket: "echoes-fafb3.firebasestorage.app",
  messagingSenderId: "933350654581",
  appId: "1:933350654581:web:ffe71e6e4508e464762e3c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);