function togglePassword(){

const password = document.getElementById("password");
const icon = document.getElementById("eyeIcon");

if(password.type === "password"){

password.type = "text";
icon.setAttribute("data-feather","eye-off");

}else{

password.type = "password";
icon.setAttribute("data-feather","eye");

}

feather.replace();
document.getElementById("registerForm").addEventListener("submit", function(e){

e.preventDefault();

window.location.href = "/html/home.html";

});
}