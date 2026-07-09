 // =========================
// Mobile Menu
// =========================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

mobileMenu.classList.toggle("show");

});

}