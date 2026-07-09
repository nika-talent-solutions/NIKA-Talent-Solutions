 /* ===========================================
   NIKA Talent Solutions
   Home Page JavaScript
=========================================== */

// Fade animation when page loads

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});

// Service Card Hover Effect

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-6px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

// Job Card Hover

const jobs=document.querySelectorAll(".job-card");

jobs.forEach(job=>{

job.addEventListener("mouseenter",()=>{

job.style.transform="scale(1.02)";

});

job.addEventListener("mouseleave",()=>{

job.style.transform="scale(1)";

});

});

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});