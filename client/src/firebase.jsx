



import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrnwwBmD8n2S5x56pb0wJxXgjbqVZTed0",
  authDomain: "plaza-447bc.firebaseapp.com",
  projectId: "plaza-447bc",
  storageBucket: "plaza-447bc.appspot.com",
  messagingSenderId: "998069754738",
  appId: "1:998069754738:web:3312fa51cb0c476246dbeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);
