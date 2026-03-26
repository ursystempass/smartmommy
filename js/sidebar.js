document.addEventListener("DOMContentLoaded", function () {

    const BASE = "";

    const isLogin = localStorage.getItem("login_status");

    if (isLogin !== "true") {
        window.location.href = BASE + "signin.html";
        return;
    }

    const currentPage = window.location.pathname.split("/").pop();
    const items = document.querySelectorAll(".menu-item");

    items.forEach(item => {
        const link = item.getAttribute("href");
        if (!link) return;

        const linkPage = link.split("/").pop();

        item.classList.remove("active");

        if (linkPage === currentPage) {
            item.classList.add("active");
        }
    });

    const logoutBtn = document.querySelector(".logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();

            localStorage.removeItem("login_status");

            window.location.href = BASE + "signin.html";
        });
    }

});