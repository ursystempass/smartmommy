document.addEventListener("DOMContentLoaded", function () {

    const BASE = "/smartmom/html/";

    /* =========================
       CEK LOGIN
    ========================= */
    const isLogin = localStorage.getItem("login_status");

    if (isLogin !== "true") {
        window.location.href = BASE + "sign in.html";
        return;
    }

    /* =========================
       ACTIVE MENU
    ========================= */
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

    /* =========================
       LOGOUT
    ========================= */
    const logoutBtn = document.querySelector(".logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();

            localStorage.removeItem("login_status");

            window.location.href = BASE + "sign in.html";
        });
    }

});
