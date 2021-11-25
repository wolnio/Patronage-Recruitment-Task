const form = document.getElementsByClassName("form-group");

// sign up vars
const usernameSignUp = document.getElementById("login-input-signup");
const passwordSignUp = document.getElementById("pass-input-signup");
const emailSignUp = document.getElementById("email-input-signup");
const email2SignUp = document.getElementById("email2-input-signup");

// sign in vars
const usernameSignIn = document.getElementById("login-input-signin");
const passwordSignIn = document.getElementById("pass-input-signin");

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const registerForm = document.querySelector("#register");

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("form-hidden");
    loginForm.classList.remove("form-hidden");
  });
  document.querySelector("#linkRegister").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("form-hidden");
    registerForm.classList.remove("form-hidden");
  });
});

function validateLoginForm() {
  var username = usernameSignIn.value.trim();
  var password = usernameSignIn.value.trin();


}

function setErrorFor(input, message){
  var formControl=input.parentElement;
  var errorTag = formControl.querySelector('.form-error-message')
}
