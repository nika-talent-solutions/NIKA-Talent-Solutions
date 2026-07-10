import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

});

document.getElementById("resumeForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const file = document.getElementById("resume").files[0];

    if (!file) {

        alert("Select a PDF Resume");
        return;

    }

    if (file.type !== "application/pdf") {

        alert("Only PDF files are allowed.");
        return;

    }

    document.getElementById("status").innerHTML = "Uploading Resume...";

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "nika_resume");

    try {

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/hculcxq4/raw/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (data.error) {

            alert(data.error.message);
            return;

        }

        await updateDoc(doc(db, "users", currentUser.uid), {

            resumeURL: data.secure_url,

            resumeName: file.name,

            cloudinaryId: data.public_id,

            updatedAt: serverTimestamp()

        });

        document.getElementById("status").innerHTML =
            "✅ Resume Uploaded Successfully";

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1500);

    }

    catch (err) {

        console.log(err);

        alert("Upload Failed");

    }

});