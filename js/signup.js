function showErrorPopup(message) {
    document.getElementById("errorMessage").textContent = message;
    document.getElementById("errorPopup").classList.add("active");
}

function closeErrorPopup() {
    document.getElementById("errorPopup").classList.remove("active");
}

function showSuccessPopup() {
    document.getElementById("popupRegister").classList.add("active");

    setTimeout(() => {
        window.location.href = "signin.html";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const existingUser = JSON.parse(localStorage.getItem("smartmom_user"));

        if (!nama || !email || !password) {
            showErrorPopup("Isi semua data!");
            return;
        }

        if (password.length < 6) {
            showErrorPopup("Password minimal 6 karakter!");
            return;
        }

        if (existingUser && existingUser.email === email) {
            showErrorPopup("Email sudah dipakai!");
            return;
        }

        localStorage.setItem("smartmom_user", JSON.stringify({
            nama,
            email,
            password,
            anak: null
        }));

        showSuccessPopup();
    });

});

feather.replace();

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

    feather.replace();
}

function goToLogin() {
    window.location.href = "signin.html";
}
