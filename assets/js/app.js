// ====================================
// NIKA Talent Solutions
// Global JavaScript
// ====================================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if(menuBtn && mobileMenu){

menuBtn.addEventListener("click",()=>{

mobileMenu.classList.toggle("show");

});

}

// Close menu when clicking outside

document.addEventListener("click",(e)=>{

if(!mobileMenu || !menuBtn) return;

if(
!mobileMenu.contains(e.target) &&
!menuBtn.contains(e.target)
){

mobileMenu.classList.remove("show");

}

});