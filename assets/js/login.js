import { auth, db } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ---------------- Google Login ----------------

const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {

googleBtn.onclick = async () => {

const provider = new GoogleAuthProvider();

try{

const result = await signInWithPopup(auth, provider);

await checkUser(result.user);

}

catch(e){

alert(e.message);

}

};

}

// ---------------- Phone Login ----------------

window.recaptchaVerifier = new RecaptchaVerifier(auth,"recaptcha-container",{

size:"normal"

});

const phoneBtn=document.getElementById("phoneLogin");

if(phoneBtn){

phoneBtn.onclick=async()=>{

const phone=document.getElementById("phone").value;

try{

const confirmation=await signInWithPhoneNumber(auth,phone,window.recaptchaVerifier);

const otp=prompt("Enter OTP");

const result=await confirmation.confirm(otp);

await checkUser(result.user);

}

catch(e){

alert(e.message);

}

};

}

// ---------------- User Check ----------------

async function checkUser(user){

const ref=doc(db,"users",user.uid);

const snap=await getDoc(ref);

if(!snap.exists()){

await setDoc(ref,{

uid:user.uid,

name:user.displayName || "",

email:user.email || "",

phone:user.phoneNumber || "",

resumeURL:"",

createdAt:serverTimestamp()

});

}

const latest=await getDoc(ref);

if(latest.data().resumeURL){

window.location.href="dashboard.html";

}else{

window.location.href="index.html";

}

}