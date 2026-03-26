document.addEventListener("DOMContentLoaded", function () {

    const BASE = "../";
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const savedUser = JSON.parse(localStorage.getItem("smartmom_user"));

        if (!savedUser) {
            showPopup("Akun belum terdaftar!", true);
            return;
        }

        if (email === savedUser.email && password === savedUser.password) {

            localStorage.setItem("login_status", "true");

            showPopup("Login berhasil, mengarahkan...", false);

            setTimeout(() => {
                window.location.href = BASE + "homepage.html";
            }, 1500);

        } else {
            showPopup("Periksa kembali email dan password", true);
        }

    });

    function showPopup(message, isError) {

        const popup = document.getElementById("popupLogin");
        const text = document.getElementById("popupText");
        const title = document.getElementById("popupTitle");
        const icon = document.getElementById("popupIcon");

        if (!popup || !text || !title || !icon) return;

        text.innerText = message;

        if (isError) {
            icon.classList.add("error");
            title.innerText = "Login gagal";
        } else {
            icon.classList.remove("error");
            title.innerText = "Login berhasil";
        }

        popup.classList.add("active");
    }

});
