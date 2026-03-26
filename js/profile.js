const user = localStorage.getItem("smartmom_user")

if (!user) {
    window.location.href = "signin.html"
}

function goLogin() {
    window.location.href = "signin.html"
}

function goSignup() {
    window.location.href = "signup.html"
}