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

const login = document.querySelector("#login");
const register = document.querySelector("#register");
const welcomeText = document.querySelector(".welcome");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#logowanie").addEventListener("click", (e) => {
    e.preventDefault();
    register.classList.add("form-hidden");
    login.classList.remove("form-hidden");
    welcomeText.classList.add("form-hidden");
    document.getElementById("logowanie").style.display = "none";
    document.getElementById("rejestracja").style.display = "block";
  });

  document.querySelector("#rejestracja").addEventListener("click", (e) => {
    e.preventDefault();
    login.classList.add("form-hidden");
    register.classList.remove("form-hidden");
    welcomeText.classList.add("form-hidden");
    document.getElementById("rejestracja").style.display = "none";
    document.getElementById("logowanie").style.display = "block";
  });

  //when login form is submitted
  formLog.addEventListener("submit", (e) => {
    e.preventDefault();
    validateLoginForm();
  });

  //when register form is submitted
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

  // if dataUsers is not empty then parse all of the data from session storage
  // and if its emty then create new empty array
  usersData = JSON.parse(sessionStorage.getItem("users"))
    ? JSON.parse(sessionStorage.getItem("users"))
    : [];

  if (
    !usersData.some((v) => {
      //check if user even exist
      return v.username == usernameVal;
    })
  ) {
    errorFor("set", usernameSignIn, "Nie ma takiego użytkownika");
  } else {
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].username == usernameVal) {
        errorFor("remove", usernameSignIn, "Nie ma takiego użytkownika");
        if (usersData[i].password == passwordVal) {
          sessionStorage.setItem("userId", i); // set the ID of logged user
          self.location="loggedIn.html";    // redirect user to a logged view page
        } else {
          errorFor("set", passwordSignIn, "Niepoprawne hasło");
        }
      }
    }
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

  usersData = JSON.parse(sessionStorage.getItem("users"))
    ? JSON.parse(sessionStorage.getItem("users"))
    : [];

  checkUsername(usernameVal);
  checkPassword(passwordVal);
  checkEmail(emailVal);
  checkEmail2(emailVal, email2Val);

  confirmSubmition();

  function checkUsername(usernameVal) {
    // function checks username field

    if (usernameVal === "") {
      //check if empty input
      errorFor("set", usernameSignUp, "Nazwa użytkownika nie może być pusta");
    } else if (usernameVal.length < 6 || usernameVal.length > 20) {
      // check the length of input
      errorFor(
        "set",
        usernameSignUp,
        "Nazwa użytkownika musi mieć 6 - 20 znaków"
      );
    } else if (/^[a-zA-Z0-9]+$/.test(usernameVal) == false) {   // this regex passes test on regexr.com -> /^[a-zA-Z0-9_/\\\-[\]]+$/
      errorFor("set", usernameSignUp, "Dozwolone znaki to litery i cyfry");
    } else if (
      usersData.some((v) => {
        return v.username == usernameVal;
      })
    ) {
      errorFor(
        "set",
        usernameSignUp,
        "Użytkownik o takiej nazwie już istnieje"
      );
    } else {
      errorFor("remove", usernameSignUp, "");
      return true;
    }
  }

  function checkPassword(passwordVal) {
    // function checks password field

    if (passwordVal === "") {
      errorFor("set", passwordSignUp, "Hasło nie może być puste");
    } else if (passwordVal.length < 6) {
      errorFor("set", passwordSignUp, "Hasło musi mieć co najmniej 6 znaków");
    } else {
      errorFor("remove", passwordSignUp, "");
      return true;
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
    } else if (
      usersData.some((v) => {
        return v.email == emailVal;
      })
    ) {
      errorFor("set", emailSignUp, "Konto z takim email już istnieje");
    } else {
      errorFor("remove", emailSignUp, "");
      return true;
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
      return true;
    }
  }

  function confirmSubmition() {
    if (
      checkUsername(usernameVal) &&
      checkPassword(passwordVal) &&
      checkEmail(emailVal) &&
      checkEmail2(emailVal, email2Val)
    ) {
      if (
        usersData.some((v) => {
          return v.username == usernameVal;
        })
      ) {
        alert("Taki użytkownik już istnieje!");
      } else if (
        usersData.some((v) => {
          return v.email == email2Val;
        })
      ) {
        alert("Konto o takim email już istnieje!");
      } else {
        usersData.push({
          username: usernameVal,
          password: passwordVal,
          email: email2Val,
        });
        sessionStorage.setItem("users", JSON.stringify(usersData));
        sessionStorage.setItem("userId", usersData.length - 1); // set the ID of logged user
        self.location="loggedIn.html";    // redirect user to a logged view page
        document.getElementById("register").reset();  //reset all register inputs
      }
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
