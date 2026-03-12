const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));

        tab.classList.add("active");

    });

});
const doneButtons = document.querySelectorAll(".btn-done");

doneButtons.forEach(btn => {

btn.addEventListener("click",()=>{

const card = btn.closest(".reminder-item");

card.classList.add("done");

setTimeout(()=>{
card.style.opacity="0.4";
},200)

})

})