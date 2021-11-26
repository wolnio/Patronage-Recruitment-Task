const formLog = document.getElementById("login");
const formReg = document.getElementById("register");

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
    document.getElementById("linkLogin").style.display = "none";
    document.getElementById("linkRegister").style.display = "block";
  });
  document.querySelector("#linkRegister").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("form-hidden");
    registerForm.classList.remove("form-hidden");
    document.getElementById("linkRegister").style.display = "none";
    document.getElementById("linkLogin").style.display = "block";
  });

  formLog.addEventListener("submit", (e) => {
    e.preventDefault();
    validateLoginForm();
  });

  formReg.addEventListener("submit", (e) => {
    e.preventDefault();
    validateSignUpForm();
  });
});

/*
    main validation for LOGIN form
*/
function validateLoginForm() {
  var usernameVal = usernameSignIn.value.trim();
  var passwordVal = passwordSignIn.value.trim();

  if (usernameVal === "") {
    errorFor("set", usernameSignIn, "Nazwa użytkownika nie może być pusta");
  } else {
    errorFor("remove", usernameSignIn, "");
  }

  if (passwordVal === "") {
    errorFor("set", passwordSignIn, "Hasło nie może być puste");
  } else {
    errorFor("remove", passwordSignIn, "");
  }
}

/*
    main validation for SIGN UP form
*/
function validateSignUpForm() {
  var usernameVal = usernameSignUp.value.trim();
  var passwordVal = passwordSignUp.value.trim();
  var emailVal = emailSignUp.value.trim();
  var email2Val = email2SignUp.value.trim();

  checkUsername(usernameVal);
  checkPassword(passwordVal);
  checkEmail(emailVal);
  checkEmail2(emailVal, email2Val);

  function checkUsername(usernameVal) {
    // function checks username field

    if (usernameVal === "") {
      errorFor("set", usernameSignUp, "Nazwa użytkownika nie może być pusta");
    } else if (usernameVal.length < 6 || usernameVal.length > 20) {
      errorFor(
        "set",
        usernameSignUp,
        "Nazwa użytkownika musi mieć 6 - 20 znaków"
      );
    } else if (/^[a-zA-Z0-9]+$/.test(usernameVal) == false) {
      errorFor("set", usernameSignUp, "Dozwolone znaki to litery i cyfry");
    } else {
      errorFor("remove", usernameSignUp, "");
      return true;
    }
  }

  if(checkUsername(usernameVal)){
    console.log("coscos");
  }
  function checkPassword(passwordVal) {
    // function checks password field

    if (passwordVal === "") {
      errorFor("set", passwordSignUp, "Hasło nie może być puste");
    } else if (passwordVal.length < 6) {
      errorFor("set", passwordSignUp, "Hasło musi mieć co najmniej 6 znaków");
    } else {
      errorFor("remove", passwordSignUp, "");
    }
  }

  function checkEmail(emailVal) {
    // function checks email field

    if (emailVal === "") {
      errorFor("set", emailSignUp, "Email nie może być puste");
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailVal) == false
    ) {
      errorFor("set", emailSignUp, "Błędny format");
    } else {
      errorFor("remove", emailSignUp, "");
    }
  }

  function checkEmail2(emailVal, email2Val) {
    // function checks email2 filed

    if (email2Val === "") {
      errorFor("set", email2SignUp, "Potwierdź email nie może być puste");
    } else if (emailVal !== email2Val) {
      errorFor(
        "set",
        email2SignUp,
        "Potwierdź email i email muszą być takie same"
      );
    } else {
      errorFor("remove", email2SignUp, "");
    }
  }
}

function errorFor(action, input, message) {
  var formControl = input.parentElement;
  var errorTag = formControl.querySelector(".form-error-message");

  // add error message inside
  errorTag.innerText = message;

  // add error class to errorTag
  if (action === "set") {
    errorTag.classList.remove("form-hidden");
  } else if (action === "remove") {
    errorTag.classList.add("form-hidden");
  }
}
