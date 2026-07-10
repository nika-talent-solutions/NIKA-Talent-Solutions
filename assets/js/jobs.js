 import { db } from "./firebase.js";

import {

collection,

getDocs

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const jobsList=document.getElementById("jobsList");

const search=document.getElementById("search");

let jobs=[];

async function loadJobs(){

const snapshot=await getDocs(collection(db,"jobs"));

snapshot.forEach(doc=>{

jobs.push({

id:doc.id,

...doc.data()

});

});

showJobs(jobs);

}

function showJobs(data){

jobsList.innerHTML="";

if(data.length===0){

jobsList.innerHTML="<h3>No Jobs Found</h3>";

return;

}

data.forEach(job=>{

jobsList.innerHTML+=`

<div class="job">

<h2>${job.title}</h2>

<p>🏢 ${job.company}</p>

<p>📍 ${job.location}</p>

<p>💰 ₹${job.salary}/month</p>

<p>${job.type}</p>

<a class="apply" href="apply.html?id=${job.id}">

Apply Now

</a>

</div>

`;

});

}

search.addEventListener("input",()=>{

const value=search.value.toLowerCase();

const filtered=jobs.filter(job=>

job.title.toLowerCase().includes(value)

||

job.company.toLowerCase().includes(value)

||

job.location.toLowerCase().includes(value)

);

showJobs(filtered);

});

loadJobs();