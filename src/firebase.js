// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAzBF6W1swc8NqPkvhlDj_sn7fuo5qBj8",
  authDomain: "monopoly-project-3ac53.firebaseapp.com",
  projectId: "monopoly-project-3ac53",
  storageBucket: "monopoly-project-3ac53.firebasestorage.app",
  messagingSenderId: "1082707434484",
  appId: "1:1082707434484:web:d4ade051ce8afb99e537a1",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, setDoc, doc };
