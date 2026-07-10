import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const ADMIN_EMAIL = "hr.nikatalentsolutions@gmail.com";

const form = document.getElementById("jobForm");
const jobsDiv = document.getElementById("jobs");

let currentUser = null;

// Protect Admin Page
onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    if (user.email !== ADMIN_EMAIL) {

        alert("Access Denied");

        window.location.href = "dashboard.html";
        return;

    }

    currentUser = user;

    loadJobs();

});

// Add Job
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    await addDoc(collection(db, "jobs"), {

        title: title.value,

        company: company.value,

        location: location.value,

        salary: salary.value,

        type: type.value,

        description: description.value,

        createdBy: currentUser.uid,

        createdAt: serverTimestamp()

    });

    alert("Job Posted Successfully");

    form.reset();

    loadJobs();

});

// Load Jobs
async function loadJobs() {

    jobsDiv.innerHTML = "";

    const snapshot = await getDocs(collection(db, "jobs"));

    snapshot.forEach((job) => {

        const data = job.data();

        jobsDiv.innerHTML += `

        <div class="card">

            <h3>${data.title}</h3>

            <p><b>Company:</b> ${data.company}</p>

            <p><b>Location:</b> ${data.location}</p>

            <p><b>Salary:</b> ₹${data.salary}</p>

            <p><b>Type:</b> ${data.type}</p>

            <button
                class="delete"
                onclick="deleteJob('${job.id}')">

                Delete

            </button>

        </div>

        `;

    });

}

// Delete Job
window.deleteJob = async (id) => {

    if (!confirm("Delete this job?")) return;

    await deleteDoc(doc(db, "jobs", id));

    loadJobs();

};