import { getRegisteredCourses } from './storage.js';

export function courseRegistration(newCourse) {
  const courseList = document.querySelector(".class_list");

  if (!courseList) return;

  const { id, Name, Instructor, process, img } = newCourse;
  const courseCard = `<div class="course_card"  data-id="${id}">
                    <img src="${img}" alt="${Name}" />
                    <div class="course_info">
                      <h3>${Name}</h3>
                      <p>${Instructor}</p>

                      <div class="progress_container">
                        <p>${process}% Complete</p>
                        <progress value="${process}" max="100"></progress>
                      </div>
                      <div class="course_detail_btn"><button id="${id}" onclick="showCourseDetails()">Go to Course</button><i class="bx bx-trash"></i></div>
                    </div>
                  </div>`;

  courseList.insertAdjacentHTML("beforeend", courseCard);
  updateCourseCount();
}

export function displayToDashboard(registeredCourses) {
  const coursesRegistered = document.querySelector(".class_list");
  //const activeLearning = document.querySelector(".active_courses");

  if (!coursesRegistered) return;
  coursesRegistered.innerHTML = " "; //clear the ui
  //activeLearning.innerHTML = " ";
  registeredCourses.forEach((course) => courseRegistration(course));
}

export function renderToDashboard(courses) {
  // const coursesRegistered = document.querySelector(".class_list");
  const activeLearning = document.querySelector(".active_courses");

  // if (!activeLearning) return;
  // activeLearning.innerHTML = " "; //clear current ui

  const { id, Name, Instructor, process, img } = courses;
  const activeCourses = `<div class="current_courses course_card" data-id="${id}">
                    <img src="${img}" alt="${Name}" />
                    <div class="course_info">
                      <h3>${Name}</h3>
                      <p>${Instructor}</p>

                      <div class="dashboard_display">
                        <div class="progress_container">
                          <p>${process}% Complete</p>
                          <progress value="${process}" max="100"></progress>
                        </div>
                        <button class="btn_course" id="${id}" onclick="showCourseDetails()">Go to Course</button>
                      </div>
                    </div>
                  </div>`;

  activeLearning.insertAdjacentHTML("beforeend", activeCourses);
}
export function dashboardCourseRender(courses, showAll = false) {
  //select all the card with class name current_courses
  const activeLearning = document.querySelector(".active_courses");
  if (!activeLearning) return;
  activeLearning.innerHTML = " "; //clear current ui
  const displayList = showAll ? courses : courses.slice(0, 3); //if show all is true show all course or show three

  //loop through the courses and display all the courses
  //redner the selected items
  displayList.forEach((course) => {
    renderToDashboard(course); // Your existing function that creates the HTML
  });

  //select the show all button
  const showAllBtn = document.getElementById("show_all_btn");

  //Handle the "Show All" button visibility
  if (showAllBtn) {
    //set the show all button to show all if the course are greater than 3 or none it its less than 3
    showAllBtn.style.display = courses.length <= 3 ? "none" : "block";

    // change the show all button texts based on the state of the courses.
    showAllBtn.innerText = showAll ? "Show Less" : "View All";
  }
}

export function updateCourseCount() {
  const courseInProgess = document.querySelector(".no_of_courses");
  const h2 = courseInProgess.querySelector("h2");
  const count = getRegisteredCourses().length;
  if (h2) {
    h2.innerText = count;
  }
}

const toggleMenu = document.querySelector(".toggleMenu"); //the container for the open and close icon for the nav menu
const isOpen = document.querySelector(".bx-menu-closer"); //the open icon for the nav menu
const isclose = document.querySelector(".bx-x"); //the close icon for the nav menu
const navMenu = document.querySelector(".nav_menu"); //nav menu container
const overlay = document.querySelector(".overlay"); //over container for the nav menu and calendar
const homePage = document.querySelector(".HomePage"); //landing page container
const calendarDisplay = document.querySelector(".calender"); //display for calendar
const filterBtn = document.getElementById("filter_btn"); // button to filter trigger the filter modal
const filterModal = document.querySelector(".filter_Modal"); //filter modal
const closeFilter = document.querySelector(".close_filter"); //the close button for filter
// const hoverBtn;
const cards = document.querySelectorAll(".card > div"); //select all the cards in the card container
const card_2 = document.querySelector(".card_2"); //select the card_2 to assign the active class when the mouse leaves the card container
const cardConatiner = document.querySelector(".card"); //select the card container to listen for mouse leave event
const hiddenElements = document.querySelectorAll("section"); //select all the section to observe for the intersection observer
// console.log(document.getElementById("signup_password"));
const passwordStrength = document.getElementById("signup_password"); //the password input for the sign up form
const strengthLevel = document.querySelector(".strength_level"); //the text that shows the strength level of the password
const strengthBar = document.querySelector(".strength"); //the password strength bar
const strengthText = document.querySelector(".strength_text"); //the text that shows when the password is less than 8 characters
// dashboard toggle
const dashboardToggle = document.querySelector(".dashboard_toggle"); //dashboard toggle button
// const dashToggle = document.getElementById("dashToggle");
const dashboardSideBar = document.querySelector(".dashboard_side_bar"); //dashboard side  bar
const applyFilterBtn = document.getElementById("apply_filter_btn"); //button to apply the filter selected
const calenderBtn = document.getElementById("calender_btn"); //button to open the calendar
const gradeFilter = document.getElementById("assignment_filter"); //input to filter the grade table

const studentGeneralSetting = document.getElementById("general_info"); //student general setting
const studentSecuritySetting = document.getElementById("security"); //student security setting
const studentNotifications = document.getElementById("notification"); //student notifications
const studentProfileLinks = document.querySelectorAll(".profile_links ul li"); //student profile Links
const studentInfo = document.querySelectorAll(".user-info"); //student setting pages
const studentGeneralSettingBtn = document.getElementById("student-info"); // student profile lists serving as links
const studentSecuritySettingBtn = document.getElementById("student-security"); // student security lists serving as links
const studentNotificationsBtn = document.getElementById(
  "student-notifications"
); // student notifications lists serving as links
const notificationBell = document.querySelector(".bx-bell");
const notificationModal = document.querySelector(".notification-modal");
const userProfilePicture = document.getElementById("upload_profile_pic");
const viewAllNotification = document.getElementById("btn-view-all");
const removeProfilePics = document.getElementById("btn_remove_profile_pic");
const saveSettingChanges = document.getElementById("btn-save");
const editBtn = document.getElementById("btn-edit-settings");

notificationBell.addEventListener("click", () => {
  notificationModal.style.display = "block";
  overlay.style.display = "block";
});

viewAllNotification.addEventListener("click", () => {
  showSetting();
  overlay.style.display = "none";
  notificationModal.style.display = "none";
});
// Close calendar when clicking outside
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  calendarDisplay.style.display = "none";
  notificationModal.style.display = "none";
});

export function viewPage(pageId) {
  const allPage = document.querySelectorAll(".main-view");
  allPage.forEach((page) => {
    page.style.display = "none";
  });
  const targetedPage = document.getElementById(pageId);

  if (targetedPage) {
    targetedPage.style.display = "block";

    sessionStorage.setItem("currentPage", pageId);
  }
}

// for landing page rendering

function showPage(sectionCN) {
  viewPage("landing_view");
  const allSection = homePage.querySelectorAll(":scope > section");
  allSection.forEach((section) => {
    section.style.display = "none";
  });
  const targetedSection = document.querySelector(`.${sectionCN}`);
  if (targetedSection) {
    targetedSection.style.display = "block";
  }
}
export function toHomePage() {
  showPage("home_page");
}

function showfeatures() {
  showPage("features_page");
}
function showPricing() {
  showPage("pricing_page");
}
function showAbout() {
  showPage("about_page");
}
function showLogin() {
  viewPage("login-view");
}
function showSignUp() {
  viewPage("signUp-view");
}
function showResetPassword() {
  viewPage("resetPassword-view");
}
function showDashBoard() {
  dashBoardView("dashboard_contents");
}
function showCourses() {
  dashBoardView("course_page");
}
function showCourseDetails() {
  dashBoardView("course_contents");
}
function showAssignments() {
  dashBoardView("assignment_page");
  renderTable(Assignment);
}
function showGrades() {
  dashBoardView("student_grade");
  renderGradeTable(assignmentGrade);
}
function showSetting() {
  dashBoardView("setting");
  studentGeneralSetting.style.display = "block";
}
function dashBoardView(pageId) {
  viewPage("dashboard-view");
  const allPage = document.querySelectorAll(".dashboard_page");
  // const dashboardContents = document.querySelector(".dashboard_contents");
  allPage.forEach((page) => {
    page.style.display = "none";
    // dashboardContents.style.display = "block";
  });

  const targetedPage = document.getElementById(pageId);
  if (targetedPage) {
    targetedPage.style.display = "block";
  }
}

// toggle Menu
toggleMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  if (navMenu.classList.contains("active")) {
    isOpen.style.display = "none";
    isclose.style.display = "block";
    overlay.style.display = "block";
  } else {
    isOpen.style.display = "block";
    isclose.style.display = "none";
    overlay.style.display = "none";
  }
});
// For the Nav menu to disappear affter its clicked..
navMenu.addEventListener("click", () => {
  overlay.style.display = "none";
  isOpen.style.display = "block";
  isclose.style.display = "none";
  navMenu.classList.remove("active");
});
function closeToggle() {
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

// Pricing Javascript
function togglePrice(duration) {
  const monthlyPrice = document.getElementById("monthly_duration");
  const yearlyPrice = document.getElementById("yearly_duration");
  const planPriceBasic = document.getElementById("plan-price-basic");
  const planPriceTeam = document.getElementById("plan-price-team");
  const planPricePro = document.getElementById("plan-price-pro");
  const planPeriod = document.querySelectorAll(".plan-period");

  if (duration === "monthly") {
    monthlyPrice.classList.add("active");
    yearlyPrice.classList.remove("active");
    planPriceBasic.innerText = "0";
    planPricePro.innerText = "29";
    planPriceTeam.innerText = "99";
    // Updating Multiple Elements: querySelectorAll returns a list (NodeList).
    // You cannot set .innerText on the whole list at once;
    // you have to use a forEach loop to update the text for all three cards.
    planPeriod.forEach((period) => {
      period.innerText = "/month";
    });
  } else {
    monthlyPrice.classList.remove("active");
    yearlyPrice.classList.add("active");
    planPriceBasic.innerText = "20";
    planPricePro.innerText = "300";
    planPriceTeam.innerText = "1100";
    // Updating Multiple Elements: querySelectorAll returns a list (NodeList).
    // You cannot set .innerText on the whole list at once;
    // you have to use a forEach loop to update the text for all three cards.
    planPeriod.forEach((period) => {
      period.innerText = "/year";
    });
  }
}

//card buttons
// loop through the cards and pick them seperately,
cards.forEach((card) => {
  // now in each card, when the mouse is over it,
  card.addEventListener("mouseenter", () => {
    // before anything, make sure none of the card already have a class active
    cards.forEach((c) => c.classList.remove("active"));
    // now assign the class active the which ever card has the mouse over it.
    card.classList.add("active");
  });
});

//student profile
//loop through the links and pick them seperately
studentProfileLinks.forEach((list) => {
  //now in each list, when clicked on
  list.addEventListener("click", () => {
    //before anything, make sure none of the student profile links already have a class active
    studentProfileLinks.forEach((student) => {
      student.classList.remove("active");
    });
    //now assign the active to which ever link was click on
    list.classList.add("active");
  });
});

// look at the card conatiner, when the mouse leaves.
cardConatiner.addEventListener("mouseleave", () => {
  // ensure none of the cards has an active class
  cards.forEach((c) => c.classList.remove("active"));
  // then assign the active class to card_2
  card_2.classList.add("active");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      } else {
        entry.target.classList.remove("reveal");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

hiddenElements.forEach((elements) => {
  elements.classList.add("hidden");
  observer.observe(elements);
});
//password check for strength

//to listen to the password input

passwordStrength.addEventListener("input", () => {
  const value = passwordStrength.value;
  let strength = 0; //to count number xtics it has

  if (value.length === 0) {
    strengthBar.className = "strength";
    strengthLevel.textContent = " ";
    strengthLevel.className = "strength_level";
  }
  if (value.length >= 8) strength++; //if the length is greater than or equal 8 then its good for a password
  if (/[0-9]/.test(value)) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;
  //reset all the classes
  strengthBar.className = "strength";
  //check the length of the password typed

  strengthText.style.display = value.length < 8 ? "block" : "none";
  //  if (value.length < 8) {
  //   strengthText.style.display = "block";
  // }

  if (strength == 1) {
    strengthBar.classList.add("strength_1");
    strengthLevel.classList.add("strength_level");
    strengthLevel.textContent = "weak";
    strengthLevel.style.color = "red";
  } else if (strength == 2) {
    strengthBar.classList.add("strength_2");
    strengthLevel.classList.add("strength_level");
    strengthLevel.textContent = "fair";
    strengthLevel.style.color = "orange";
  } else if (strength == 3) {
    strengthBar.classList.add("strength_3");
    strengthLevel.classList.add("strength_level");
    strengthLevel.textContent = "strong";
    strengthLevel.style.color = "yellowgreen";
  } else if (strength == 4) {
    strengthBar.classList.add("strength_4");
    strengthLevel.classList.add("strength_level");
    strengthLevel.textContent = "very Strong";
    strengthLevel.style.color = "green";
  }
});

// Dashboard Sidebar Toggle

dashboardToggle.addEventListener("click", () => {
  // Select the icons specifically INSIDE this toggle button
  const d_isOpen = dashboardToggle.querySelector(".bx-menu-closer");
  const d_isClose = dashboardToggle.querySelector(".bx-x");

  dashboardSideBar.classList.toggle("active");

  if (dashboardSideBar.classList.contains("active")) {
    d_isOpen.style.display = "none";
    d_isClose.style.display = "block";
  } else {
    d_isOpen.style.display = "block";
    d_isClose.style.display = "none";
  }
});

// Close sidebar when clicking links inside it
dashboardSideBar.addEventListener("click", (e) => {
  // Only close if we clicked a link or the sidebar itself
  if (e.target.tagName === "LI" || e.target.tagName === "I") {
    dashboardSideBar.classList.remove("active");
    dashboardToggle.querySelector(".bx-menu-closer").style.display = "block";
    dashboardToggle.querySelector(".bx-x").style.display = "none";
  }
});

function toggleCourse(course) {
  const allCourses = document.getElementById("all_courses");
  const inProgressCourses = document.getElementById("in_progress_courses");
  const completedCourses = document.getElementById("completed_courses");
  if (course === "allCourses") {
    allCourses.classList.add("active");
    inProgressCourses.classList.remove("active");
    completedCourses.classList.remove("active");
  } else if (course === "inProgressCourses") {
    allCourses.classList.remove("active");
    inProgressCourses.classList.add("active");
    completedCourses.classList.remove("active");
  } else if (course === "completedCourses") {
    allCourses.classList.remove("active");
    inProgressCourses.classList.remove("active");
    completedCourses.classList.add("active");
  }
}

filterBtn.addEventListener("click", () => {
  if (filterModal) {
    filterModal.classList.toggle("active");
  } else {
    console.log("Can't find the filter modal");
  }
});

closeFilter.addEventListener("click", () => {
  if (filterModal.classList.contains("active")) {
    filterModal.classList.remove("active");
  }
});

//Assignmnet Table

const Assignment = [
  {
    id: 1,
    name: "Use Personal Research",
    courseId: "Introduction to UX Design",
    date: "2026-10-12",
    statusId: "Graded",
    grade: "97/100",
    module: "Module 2",
    decs: "Quiz",
  },
  {
    id: 2,
    name: "Wireframing Challenge",
    courseId: "Introduction to UX Design",
    date: "2026-11-15",
    statusId: "Submitted",
    grade: "pending",
    module: "Module 4",
    decs: "File Upload",
  },
  {
    id: 3,
    name: "Color Theory Essay",
    courseId: "Graphic Design Fundamentals",
    date: "2026-12-01",
    statusId: "Processing",
    grade: " ",
    module: "Module 3",
    decs: "Essay",
  },
  {
    id: 4,
    name: "Resposive Layouts Quiz",
    courseId: "Web Development 101",
    date: "2026-01-29",
    statusId: "Processing",
    grade: " ",
    module: "Module 1",
    decs: "Quiz",
  },
];

function renderTable(data) {
  const activeAssignments = document.querySelector(".assignment_body tbody");
  //const statusClass = item.statusId.toLowerCase().replace(/\s+/g, "-");

  if (!activeAssignments) return;

  activeAssignments.innerHTML = "";

  data.forEach((item) => {
    const row = `<tr data-status="${item.statusId}" data-course="${item.courseId}">
                      <td>
                        <strong>${item.name}</strong>
                        <br />
                        <span>${item.module} . ${item.decs}</span>
                      </td>
                      <td>${item.courseId}</td>
                      <td>${item.date}</td>
                      <td class="assigment_status ${item.statusId}"><p>${item.statusId}</p></td>
                      <td class="assignment_grade">${item.grade}</td>
                      <td>></td>
                    </tr>`;

    activeAssignments.insertAdjacentHTML("beforeend", row);

    // saveToDb(datas);
  });
}

applyFilterBtn.addEventListener("click", () => {
  //e.preventDefault();
  const courseFilter = document
    .getElementById("course_filter")
    .value.toLowerCase();
  const statusFilter = document
    .getElementById("status_filter")
    .value.toLowerCase();
  //get all the rows i want to loop through
  const rows = document.querySelectorAll(".assignment_body tbody tr");

  rows.forEach((row) => {
    //call the cells of the rows i want to search for
    const courseRow = row.dataset.course.toLowerCase();
    const statusRow = row.dataset.status.toLowerCase();

    const matchCourses = courseFilter === "all" || courseRow === courseFilter;
    const matchStatus = statusFilter === "all" || statusRow === statusFilter;

    if (matchCourses && matchStatus) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
    // console.log(
    //   `Checking row: Course(${courseRow}) vs Filter(${courseFilter}) | Status(${statusRow}) vs Filter(${statusFilter})`
    // );
  });

  document.querySelector(".filter_Modal").classList.remove("active");
});

const eventHandleer = Assignment.map((item) => ({
  title: item.name,
  start: item.date,
  className: item.statusId.toLowerCase(),
  extendedProps: {
    module: item.module,
  },
}));

calenderBtn.addEventListener("click", function () {
  const calendarEl = document.getElementById("calendar");

  calendarDisplay.style.display = "block";
  overlay.style.display = "block";
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: eventHandleer,
  });
  calendar.render();

  setTimeout(() => {
    calendar.updateSize();
  }, 10);
});

const assignmentGrade = [
  {
    id: "1",
    name: "Intro to CS",
    code: "CS 101",
    assignmentName: "Midterm Exam",
    date: "2024-15-10",
    score: "99",
    point: "100",
    grade: "99% (B+)",
    gradeInfo: "grade-b-plus",
    color: "blue",
  },
  {
    id: "2",
    name: "Intro to CS",
    code: "CS 101",
    assignmentName: "Algorithm Project",
    date: "2024-02-11",
    score: "100",
    point: "100",
    grade: "99% (A)",
    gradeInfo: "grade-a",
    color: "blue",
  },
  {
    id: "3",
    name: "Calculus II",
    code: "MATH 202",
    assignmentName: "Weekly Quiz #4",
    date: "2024-25-10",
    score: "19",
    point: "20",
    grade: "99% (A-)",
    gradeInfo: "grade-a-",
    color: "purple",
  },
  {
    id: "4",
    name: "Modern History",
    code: "HIS 106",
    assignmentName: "Essay: Industrial Rev",
    date: "2024-10-11",
    score: "42",
    point: "50",
    grade: "74% (B)",
    gradeInfo: "grade-b",
    color: "orange",
  },
  {
    id: "5",
    name: "Calculus II",
    code: "MATH 202",
    assignmentName: "Midterm Exam",
    date: "2024-20-10",
    score: "72",
    point: "100",
    grade: "72% (C-)",
    gradeInfo: "grade-c",
    color: "purple",
  },
];

function renderGradeTable(data) {
  const gradeTable = document.querySelector(".grade_table table tbody");
  if (!gradeTable) return;
  gradeTable.innerHTML = "";
  data.forEach((item) => {
    const tableHtml = `<tr data-name="${item.name}">
                      <td class="course_cell ${item.color}">
                        <div class="course-name">${item.name}</div>
                        <div class="course-code">${item.code}</div>
                      </td>
                      <td>${item.assignmentName}</td>
                      <td>${item.date}</td>
                      <td><strong>${item.score}</strong></td>
                      <td>${item.point}</td>
                      <td class="grade ${item.gradeInfo}"><span>${item.grade}</span></td>
                    </tr>`;
    gradeTable.insertAdjacentHTML("beforeend", tableHtml);
  });
}

// 2. SAFETY CHECK: Ensure the input exists before adding listener
if (gradeFilter) {
  gradeFilter.addEventListener("input", (e) => {
    const input = e.target.value.toLowerCase();
    const rows = document.querySelectorAll(".grade_table table tbody tr");

    rows.forEach((row) => {
      const query = row.dataset.name.toLowerCase();
      const matchCourses = query.includes(input);

      // Use empty string to reset to default display
      row.style.display = matchCourses ? "" : "none";
      // resetGradeFilter();
    });
  });
}

//event for each buttons for the student settings
studentGeneralSettingBtn.addEventListener("click", () => {
  viewStudentSetting("general_info");
  const settingsHeader = document.querySelector(".profile_header");
  settingsHeader.innerHTML = `<h1>Profile Settings</h1>
                <p>Manage your personal information and preferences</p>`;
});
studentSecuritySettingBtn.addEventListener("click", () => {
  viewStudentSetting("security");
  const settingsHeader = document.querySelector(".profile_header");
  settingsHeader.innerHTML = `<h1>Security Settings</h1> 
                             <p>Manage your account security and monitor login activity</p>`;
});
studentNotificationsBtn.addEventListener("click", () => {
  viewStudentSetting("notification");
  const settingsHeader = document.querySelector(".profile_header");
  settingsHeader.innerHTML = `<h1>Security Settings</h1> 
                             <p>Manage your account security and monitor login activity</p>`;
});

//function to display the student settings based on the cliked button
function viewStudentSetting(sectionId) {
  studentInfo.forEach((info) => {
    info.style.display = "none";
  });
  const targetedInfo = document.getElementById(sectionId);
  if (targetedInfo) {
    targetedInfo.style.display = "block";
    // const userName = localStorage.getItem("user");
    // const displayName = JSON.parse(userName);
    // document.querySelector(".user_detail h4").innerHTML = displayName.fullName;
  }
}

// user image upload

removeProfilePics.addEventListener("click", () => {
  const profilePics = document.getElementById("user-profile");
  const headerImage = document.getElementById("header-image");
  profilePics.src = "/images/aboutpic3.jpg";
  headerImage.src = "/images/aboutpic3.jpg";
});
function updateProfilePicture() {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes) {
    alert("please upload jpeg or png image extension");
    return;
  }
  const file = userProfilePicture.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    const profilePics = document.getElementById("user-profile");
    const headerImage = document.getElementById("header-image");
    profilePics.src = imageUrl;
    headerImage.src = imageUrl;
    // profilePics.style.display = "block";
  }
}

userProfilePicture.addEventListener("change", updateProfilePicture);

function savedata() {
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const phoneNumber = document.getElementById("phone-number").value.trim();
  const bio = document.getElementById("bio").value.trim();
  alert("Changes saved successfully!");
  document.querySelector(".user_detail h4").innerText =
    firstName + " " + lastName;
  document.querySelector(".user_detail p").innerText = bio;
  document.getElementById("first-name").disabled = true;
  document.getElementById("last-name").disabled = true;
  document.getElementById("phone-number").disabled = true;
  document.getElementById("bio").disabled = true;
  document.getElementById("btn-edit-settings").style.display = "block";
  document.getElementById("btn-save").style.display = "none";
  document.getElementById("btn_cancel").style.display = "none";
}
function editData() {
  document.getElementById("first-name").disabled = false;
  document.getElementById("last-name").disabled = false;
  document.getElementById("phone-number").disabled = false;
  document.getElementById("bio").disabled = false;
  saveSettingChanges.innerText = "Save changes";
  document.getElementById("btn-edit-settings").style.display = "none";
  document.getElementById("btn-save").style.display = "block";
  document.getElementById("btn_cancel").style.display = "block";
}

function cancelEdit() {
  // document.getElementById("first-name").disabled = true;
  // document.getElementById("last-name").disabled = true;
  // document.getElementById("phone-number").disabled = true;
  // document.getElementById("bio").disabled = true;
  document.getElementById("btn-edit-settings").style.display = "block";
  document.getElementById("btn-save").style.display = "none";
  document.getElementById("btn_cancel").style.display = "none";
}
const cancelBtn = document.getElementById("btn_cancel");
cancelBtn.addEventListener("click", cancelEdit);
editBtn.addEventListener("click", editData);
saveSettingChanges.addEventListener("click", savedata);
// function resetGradeFilter() {
//   const rows = document.querySelectorAll(".grade_table table tbody tr");

//   gradeFilter.value = "";

//   rows.forEach((row) => {
//     row.style.display = "";
//   });
// }
// gradeFilter.addEventListener("input", (e) => {
//   const input = e.target.value.toLowerCase();
//   const rows = document.querySelectorAll(".grade_table table tbody tr");

//   rows.forEach((row) => {
//     const query = row.dataset.name.toLowerCase();

//     const matchCourses = query.includes(input);

//     if (matchCourses) {
//       row.style.display = "table-row";
//     } else {
//       row.style.display = "none";
//     }
//   });
//   // const filtered = assignmentGrade.filter((item) =>
//   //   item.title.toLowerCase().includes(input)
//   // );
//   // renderGradeTable(filtered);
// });

// This allows HTML onclick to see these functions
window.showLogin = showLogin;
window.showSignUp = showSignUp;
window.showDashBoard = showDashBoard;
window.showCourses = showCourses;
window.toHomePage = toHomePage;
window.showfeatures = showfeatures;
window.showPricing = showPricing;
window.showAbout = showAbout;
window.togglePrice = togglePrice;
window.toggleCourse = toggleCourse;
window.closeToggle = closeToggle;
window.showCourseDetails = showCourseDetails;
window.showAssignments = showAssignments;
window.showGrades = showGrades;
window.showSetting = showSetting;
// Add any others used in HTML onclick
// Add any others used in HTML onclick
