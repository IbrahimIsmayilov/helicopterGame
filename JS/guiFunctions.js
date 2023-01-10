// Manage GUI Changes

// HTML Variables
let signInDiv = document.getElementById("signInDiv");
let signUpDiv = document.getElementById("signUpDiv");
let signInLink = document.getElementById("signInLink");
let signUpLink = document.getElementById("signUpLink");

// If The Sign In Link Is Clicked
signInLink.addEventListener("click", displaySignInPage);

function displaySignInPage() {
    signUpDiv.classList.add("hidden");
    signInDiv.classList.remove("hidden");
}

// If The Sign Up Link Is Clicked
signUpLink.addEventListener("click", displaySignUpPage);

function displaySignUpPage() {
    signInDiv.classList.add("hidden");
    signUpDiv.classList.remove("hidden");
}