import { auth, storage, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

import {
  doc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

let currentUser = null;

// Check if user is logged in
onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

});

// Upload Resume
document.getElementById("resumeForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const file = document.getElementById("resume").files[0];

    if (!file) {

        alert("Please select a PDF.");

        return;

    }

    // Only PDF allowed
    if (file.type !== "application/pdf") {

        alert("Only PDF files are allowed.");

        return;

    }

    try {

        document.getElementById("status").innerHTML = "Uploading...";

        const storageRef = ref(
            storage,
            "resumes/" + currentUser.uid + ".pdf"
        );

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "users", currentUser.uid), {

            resumeURL: downloadURL,

            resumeName: file.name,

            resumeUploadedAt: serverTimestamp()

        });

        document.getElementById("status").innerHTML =
            "✅ Resume Uploaded Successfully";

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1500);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});