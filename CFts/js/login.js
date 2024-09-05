function Login() {
    const Username = document.getElementById("username").value;
    const Password = document.getElementById("password").value;

    if (Username === "ahai" && Password === "ahai1992") {
        alert("Login successful!");
        window.location.href = "front.html";
    } else {
        alert("Username or password not correct, please check again.");
    }
}
