// SIGN IN / SIGN UP PAGE

// HTML Global Variables
let signInBtn = document.getElementById("signInBtn");
let signUpBtn = document.getElementById("signUpBtn");
let canvas = document.getElementById("myCanvas");

// Member List Array
let user = loadUser()

// Event Listeners for The Sign In And Sign Up Buttons
signInBtn.addEventListener("click", signInHandler);
signUpBtn.addEventListener("click", signUpHandler);


// If The User Presses The Sign In Button
function signInHandler() {
    let userInput = document.getElementById("signInUser").value;
    let passInput = document.getElementById("signInUser").value;
    for (let i = 0; i < user.length; i++) {
        if (userInput === user[i].userName && passInput === user[i].userPass) {
            alert("You have signed in!");
            signInLink.classList.add("hidden");
            canvas.classList.remove("hidden");
            return i;
        }
    } alert("Incorrect Username or Password");
}

// If The User Presses The Sign Up Button
function signUpHandler() {
    let userInput = document.getElementById("signUpUser").value;
    let passInput = document.getElementById("signUpUser").value;
    let confPassInput = document.getElementById("signUpConfPass");
    checkUserInput(confPassInput, passInput);
    checkPassInput(userInput, passInput);
    saveUser();
    signUpDiv.classList.add("hidden");
    canvas.classList.remove("hidden");
}

function saveUser() {
    localStorage.setItem("user", JSON.stringify(user));
}

function loadUser() {
    let userStr = localStorage.getItem("user");
    return JSON.parse(userStr) ?? [];
}

function newUser(userUsername, userPassword) {
    return {
        username: userUsername,
        password: userPassword,
    }
}

function checkUserInput(username, password) {
    for (let i = 0; i < user.length; i++) {
        if (user === user[i].userName) {
            alert("This Username Is Already In Use!")
            return i;
        }
    }
    user.push(newUser(username, password));
    alert("You Are Now A New User!")
    return -1;
}

function checkPassInput(confirmPassword, password) {
    if (confirmPassword !== password) {
        alert("The Passwords Do Not Match! Please pick a new password!")
    }
}