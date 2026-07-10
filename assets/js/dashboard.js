import { auth, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    try {

        const userRef = doc(db, "users", user.uid);

        const snap = await getDoc(userRef);

        if (snap.exists()) {

            const data = snap.data();

            document.getElementById("welcome").innerHTML =
            `Hi, ${data.name || "Candidate"} 👋`;

        }

        else {

            document.getElementById("welcome").innerHTML =
            "Welcome to NIKA Talent Solutions 👋";

        }

    }

    catch (err) {

        console.log(err);

    }

});

document.getElementById("logout").addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});