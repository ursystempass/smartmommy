alert("JS aktif");
document.addEventListener("DOMContentLoaded", function(){

const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

e.preventDefault();

window.location.href = "homepage.html";

});

});