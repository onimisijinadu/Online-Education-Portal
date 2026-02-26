export function getRegisteredCourses() {
  const data = localStorage.getItem("addedCourse") || [];
  if (!data) {
    return [];
  }
  if (typeof data == "string" && data.trim() === "") {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log("LocalStorage data is corrupted. Resetting list.");
    localStorage.removeItem("addedCourse");
    return [];
  }
  //return JSON.parse(localStorage.getItem("registeredCourses")) || [];
}
export function saveToDb(course) {
  const addedCourse = getRegisteredCourses();

  const exist = addedCourse.some((item) => item.id == course.id);
  if (!exist) {
    addedCourse.push(course);
    localStorage.setItem("addedCourse", JSON.stringify(addedCourse));
    return true;
  }
  return false;
}
export function deleteFromStorage(id) {
  const addedCourse = getRegisteredCourses();

  const deleteCourse = addedCourse.filter((item) => item.id !== id);

  if (deleteCourse.length === addedCourse.length) {
    console.warn("Item not found or already deleted.");
  }

  localStorage.setItem("addedCourse", JSON.stringify(deleteCourse));
}
const logIn = document.getElementById("btn_login");
const signUp = document.getElementById("btn_signIn");
const resetPassword = document.getElementById("btn_resetPassword");
// const logInForm = document.getElementById("login_form");
// const signupForm = document.getElementById("signUp_form");
// // Target the buttons directly
// const signupBtn = document.getElementById("btn_signIn");
// const loginBtn = document.getElementById("btn_login"); // Use a specific selector

// // SIGN UP LOGIC
// signupBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   const fullName = document.getElementById("signup_fullName").value;
//   const email = document.getElementById("signup_email").value;
//   const password = document.getElementById("signup_password").value;
//   const confirmPassword = document.getElementById(
//     "signup_confirmPassword"
//   ).value;
//   const terms = document.getElementById("signUp_checkBox");

//   if (!terms.checked) {
//     alert("Please agree to the terms and conditions");
//     return;
//   }

//   if (password === confirmPassword && password.trim() !== "") {
//     const user = {
//       fullName: fullName,
//       email: email,
//       password: password,
//     };
//     localStorage.setItem("user", JSON.stringify(user));
//     alert("Account created! Please Login.");
//     showLogin();
//   } else {
//     alert("Passwords do not match or are empty!");
//   }
// });

// // LOGIN LOGIC
// // Note: Ensure your Login form inputs have unique IDs like 'login_email'
// loginBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value; // The one in the login form
//   const loginPassword = document.getElementById("password").value;
//   const storedUser = localStorage.getItem("user");

//   if (storedUser) {
//     const user = JSON.parse(storedUser);
//     if (loginPassword === user.password && email === user.email) {
//       alert("Login Successful!");
//       showDashBoard();
//       // Update the name on the dashboard
//       const nameDisplay = document.querySelector(".welcome h2 span");
//       if (nameDisplay) nameDisplay.innerText = user.fullName;
//     } else {
//       alert("Invalid email or password");
//     }
//   } else {
//     alert("User not found. Please register.");
//   }
// });

logIn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("logIn_email").value;
  const loginPassword = document.getElementById("logIn_password").value;
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (loginPassword === user.password && email === user.email) {
      alert("Login Sucessful..");
      document.getElementById("login_form").reset();
      showDashBoard();
      document.querySelector(".welcome h2 span ").innerHTML = user.fullName;
      document.querySelector(".student_name h5").innerHTML = user.fullName;
    } else {
      alert("invalid user information");
    }
  } else {
    alert("User Not found...");
  }
});

signUp.addEventListener("click", (e) => {
  e.preventDefault();
  const fullName = document.getElementById("signUp_fullName").value;
  const email = document.getElementById("signUp_email").value;
  const password = document.getElementById("signup_password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("signUp_checkBox");

  if (terms.checked) {
    if (password === confirmPassword && password !== " ") {
      const user = {
        fullName: fullName,
        email: email,
        password: password,
      };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Account created! Please Login.");
      document.getElementById("signUp_form").reset();
      showLogin();
    } else {
      alert("Password do not match.....");
    }
  } else {
    alert("Please agree to the terms and conditions");
  }
  //   if (password !== confirmPassword){
  //     alert("password do not match");
  //   }
});

// resetPassword.addEventListener("click", (e) => {
//   e.preventDefault();
//   const email = document.getElementById("reset_email").value;
//   const storedUser = localStorage.getItem("user");
// };

// registerBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const courseId =
//   const selectedOption = selectCourse.options(selectedCourse.selectedIndex);
//   const selectedCourse = selectCourse.value;
//   const storedCourses = {

//   }
//   const courses = [{
//     courseId =

//   },{

//   }]

// export function saveToLocalStorage(course) {
//   let registeredCourses =
//     JSON.parse(localStorage.getItem("registeredCourses")) || [];
//   registeredCourses.push(course);
//   localStorage.setItem("registeredCourses", JSON.stringify(registeredCourses));
// }

// window.checkAuth = checkAuth;
