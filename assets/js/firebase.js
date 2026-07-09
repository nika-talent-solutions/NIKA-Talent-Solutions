 // =====================================================
// Firebase Configuration
// NIKA Talent Solutions
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {

  apiKey: "AIzaSyCLA5I1szr2pMObKkuDUhEMWjNk5pi5lYQ",

  authDomain: "nika-talent-solutions.firebaseapp.com",

  projectId: "nika-talent-solutions",

  storageBucket: "nika-talent-solutions.firebasestorage.app",

  messagingSenderId: "751148737305",

  appId: "1:751148737305:web:26b16c54974f0339c45b88",

  measurementId: "G-WNRF7MRB3H"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export {

app,

auth,

db,

storage

};