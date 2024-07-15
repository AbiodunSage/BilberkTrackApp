import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdx6DdKPZaKW8iEvyCQm3zPYnbWoqfY6U",
  authDomain: "bilberktraveltrackapp.firebaseapp.com",
  projectId: "bilberktraveltrackapp",
  storageBucket: "bilberktraveltrackapp.appspot.com",
  messagingSenderId: "491798621058",
  appId: "1:491798621058:web:51165008fb4ccb05817d9b",
  measurementId: "G-EEJJ2RWEWK",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
