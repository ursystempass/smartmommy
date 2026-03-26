document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!nama || !email || !password) {
            showPopup("Isi semua data!", true);
            return;
        }

        if (password.length < 6) {
            showPopup("Password minimal 6 karakter!", true);
            return;
        }

        localStorage.setItem("smartmom_user", JSON.stringify({
            nama, email, password
        }));

        showPopup("Registrasi berhasil! Mengarahkan...", false);
    });

    if (window.feather) {
        feather.replace();
    }

});


function showPopup(message, isError) {

    const popup = document.getElementById("popupRegister");
    const text = document.getElementById("popupText");
    const title = document.getElementById("popupTitle");
    const icon = document.getElementById("popupIcon");

    text.innerText = message;

    if (isError) {
        title.innerText = "Registrasi gagal";
        icon.style.color = "#ef4444";
    } else {
        title.innerText = "Registrasi berhasil";
        icon.style.color = "#22c55e";

        setTimeout(() => {
            window.location.href = "signin.html";
        }, 1500);
    }

    popup.classList.add("active");
}


function goToLogin() {
    window.location.href = "signin.html";
}


function togglePassword() {
    const password = document.getElementById("password");
    const icon = document.getElementById("eyeIcon");

    if (password.type === "password") {
        password.type = "text";
        icon.setAttribute("data-feather", "eye-off");
    } else {
        password.type = "password";
        icon.setAttribute("data-feather", "eye");
    }

    if (window.feather) {
        feather.replace();
    }
}