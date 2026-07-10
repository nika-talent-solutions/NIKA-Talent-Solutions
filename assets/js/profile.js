import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

let currentUser = null;

// Check login
onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

    // Auto-fill if available
    document.getElementById("email").value = user.email || "";
    document.getElementById("phone").value = user.phoneNumber || "";
    document.getElementById("name").value = user.displayName || "";

});

// Save profile
document.getElementById("profileForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await setDoc(doc(db, "users", currentUser.uid), {

            uid: currentUser.uid,

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            phone: document.getElementById("phone").value,

            age: document.getElementById("age").value,

            city: document.getElementById("city").value,

            qualification: document.getElementById("qualification").value,

            experience: document.getElementById("experience").value,

            expectedSalary: document.getElementById("expectedSalary").value,

            createdAt: serverTimestamp()

        });

        alert("Profile Saved Successfully 🎉");

        window.location.href = "upload-resume.html";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});