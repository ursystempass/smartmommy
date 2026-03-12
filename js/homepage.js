
// tombol kalkulator

document.getElementById("btnHitung").addEventListener("click", function(){

alert("Fitur kalkulator tumbuh kembang akan segera tersedia!");

});



// checklist milestone otomatis hitung progress

const checkboxes = document.querySelectorAll(".milestone input");
const progressText = document.querySelector(".progress-mini");

checkboxes.forEach(box => {

box.addEventListener("change", updateProgress);

});

function updateProgress(){

let total = checkboxes.length;
let checked = 0;

checkboxes.forEach(box => {

if(box.checked){
checked++;
}

});

progressText.innerText = checked + "/" + total + " Terselesaikan";

}