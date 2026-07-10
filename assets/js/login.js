import { auth, db } from "./firebase.js";

import {
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
doc,
getDoc,
setDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const googleBtn = document.getElementById("googleLogin");

googleBtn.addEventListener("click", async () => {

try{

const provider = new GoogleAuthProvider();

const result = await signInWithPopup(auth, provider);

const user = result.user;

const userRef = doc(db,"users",user.uid);

const snap = await getDoc(userRef);

if(!snap.exists()){

await setDoc(userRef,{

uid:user.uid,

name:user.displayName || "",

email:user.email || "",

phone:user.phoneNumber || "",

resumeURL:"",

createdAt:serverTimestamp()

});

}

window.location.href="profile.html";

}

catch(error){

console.error(error);

alert(error.message);

}

});