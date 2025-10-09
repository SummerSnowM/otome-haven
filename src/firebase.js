// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEvcYDgdqaRns74Bwx7_D4kSMLRWoftCY",
    authDomain: "otome-haven.firebaseapp.com",
    projectId: "otome-haven",
    storageBucket: "otome-haven.firebasestorage.app",
    messagingSenderId: "339089905509",
    appId: "1:339089905509:web:65d389678d77b00af2738c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);