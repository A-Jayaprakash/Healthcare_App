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

    if (password !== confirmPassword) {
        showToast("Passwords do not match!", "error");
        return false;
    }

    let user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));

    showToast("Signup successful! Please log in.", "success");

    setTimeout(() => {
        showLogin();
    }, 2500);

    return true;
}

// Validate Login Using Local Storage
function validateLogin(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedUser = localStorage.getItem(email);

    if (storedUser) {
        let user = JSON.parse(storedUser);
        if (user.password === password) {
            showToast(`Welcome, ${user.name}! Login successful.`, "success");
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2500);
        } else {
            showToast("Incorrect password!", "error");
        }
    } else {
        showToast("User not found. Please sign up!", "error");
    }
}

// Toast Notification Function
function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    toast.style.backgroundColor = (type === "success") ? "#32cd32" : "#ff4d4d"; // Green for success, Red for error
    toast.style.color = "white";

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}
