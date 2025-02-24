// Switch to Sign Up Form
function showSignup() {
    document.getElementById('loginBox').classList.add('hidden');
    document.getElementById('signupBox').classList.remove('hidden');
}

// Switch to Login Form
function showLogin() {
    document.getElementById('signupBox').classList.add('hidden');
    document.getElementById('loginBox').classList.remove('hidden');
}

// Validate Signup and Store in Local Storage
function validateSignup(event) {
    event.preventDefault();

    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let message = document.getElementById("signupMessage");

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match!";
        return false;
    }

    let user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));

    message.style.color = "green";
    message.textContent = "Signup successful! You can now log in.";

    setTimeout(() => {
        showLogin();
    }, 2000);

    return true;
}

// Validate Login Using Local Storage
function validateLogin(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let message = document.getElementById("loginMessage");

    let storedUser = localStorage.getItem(email);

    if (storedUser) {
        let user = JSON.parse(storedUser);
        if (user.password === password) {
            message.style.color = "green";
            message.textContent = "Login successful! Redirecting...";
            setTimeout(() => {
                alert(`Welcome, ${user.name}! You have logged in successfully.`);
                window.location.href = "dashboard.html";
            }, 2000);
        } else {
            message.style.color = "red";
            message.textContent = "Incorrect password!";
        }
    } else {
        message.style.color = "red";
        message.textContent = "User not found. Please sign up!";
    }
}