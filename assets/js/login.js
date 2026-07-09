 import { auth } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {

  googleBtn.addEventListener("click", async () => {

    const provider = new GoogleAuthProvider();

    try {

      const result = await signInWithPopup(auth, provider);

      alert("Welcome " + result.user.displayName + " 🎉");

      window.location.href = "profile.html";

    } catch (error) {

      alert(error.message);

      console.error(error);

    }

  });

}