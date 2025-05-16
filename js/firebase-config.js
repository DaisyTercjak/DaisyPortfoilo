// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    // Copy your existing Firebase config here from firebase_config.py
    apiKey: "AIzaSyCTwQhcGT1oEpf_BxZ5rMXGGMDUxz_J0xs",
    authDomain: "daisyportfolio-86da5.firebaseapp.com",
    projectId: "daisyportfolio-86da5",
    storageBucket: "daisyportfolio-86da5.firebasestorage.app",
    messagingSenderId: "432247566164",
    appId: "1:432247566164:web:67938072548649c9f0e2c1",
    measurementId: "G-4LRM3WQQJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 