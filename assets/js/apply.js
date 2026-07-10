import { auth, db } from "./firebase.js";

import {

doc,

getDoc,

setDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const params=new URLSearchParams(window.location.search);

const jobId=params.get("id");

let currentUser=null;

onAuthStateChanged(auth,async(user)=>{

if(!user){

window.location.href="login.html";

return;

}

currentUser=user;

const jobSnap=await getDoc(doc(db,"jobs",jobId));

if(jobSnap.exists()){

const job=jobSnap.data();

document.getElementById("jobDetails").innerHTML=`

<h2>${job.title}</h2>

<p><b>Company:</b> ${job.company}</p>

<p><b>Location:</b> ${job.location}</p>

<p><b>Salary:</b> ₹${job.salary}</p>

<p>${job.description}</p>

`;

}

});

document.getElementById("applyBtn").onclick=async()=>{

await setDoc(

doc(db,"applications",currentUser.uid+"_"+jobId),

{

userId:currentUser.uid,

jobId:jobId,

appliedAt:serverTimestamp(),

status:"Applied"

}

);

alert("Application Submitted 🎉");

window.location.href="dashboard.html";

};