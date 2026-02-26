import {
  deleteFromStorage,
  getRegisteredCourses,
  saveToDb,
} from './storage.js';
import {
  courseRegistration,
  dashboardCourseRender,
  displayToDashboard,
  renderToDashboard,
  updateCourseCount,
  viewPage,
} from './ui.js';

const registerBtn = document.getElementById("register_btn");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const selectCourse = document.getElementById("course_registeration");
  if (!selectCourse) {
    console.log(
      "Could not find the select element with ID 'course_registeration'"
    );
    return;
  }
  const selectedOption = selectCourse.options[selectCourse.selectedIndex];
  if (selectedOption.value === "") {
    alert("Please select a course to register! ");
    return;
  }

  const course = {
    id: selectedOption.value,
    Name: selectedOption.text.trim(),
    Instructor: selectedOption.getAttribute("data-instructor"),
    process: "0",
    img: selectedOption.getAttribute("data-image"),
  };
  const saved = saveToDb(course);
  if (saved) {
    courseRegistration(course);
    updateCourseCount();
    const updateCourse = getRegisteredCourses();
    dashboardCourseRender(updateCourse, isExpanded);
    alert("You have resgisterd for " + Name);
  } else {
    alert("already registered");
  }
  // updateCourseCount();
});
const deleteBtn = document.querySelector(".class_list");
deleteBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  //check if the the clikc car have the bx-trash
  if (e.target.classList.contains("bx-trash")) {
    const itemToDelete = e.target.closest(".course_card");
    const id = itemToDelete.getAttribute("data-id");

    itemToDelete.remove();
    deleteFromStorage(id);
    updateCourseCount();
    // renderToDashboard(courses);
    const updateCourse = getRegisteredCourses();
    dashboardCourseRender(updateCourse, isExpanded);
    alert("Course removed successfully.");
  }
});

let isExpanded = false; // Initial state: Only 3 courses
function initDashboard() {
  // const activeLearning = document.querySelector(".current_courses");
  const courses = getRegisteredCourses();
  const showAllBtn = document.getElementById("show_all_btn");
  // const activeLearning = document.querySelector(".active_courses");
  // if (!activeLearning) return;
  // activeLearning.innerHTML = " "; //clear current ui
  // Initial render (3 items)
  dashboardCourseRender(courses, isExpanded);

  if (showAllBtn) {
    showAllBtn.addEventListener("click", () => {
      // Toggle the state (true becomes false, false becomes true)
      isExpanded = !isExpanded;
      const current_courses = getRegisteredCourses();
      // Re-render the list with the new state
      dashboardCourseRender(current_courses, isExpanded);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const lastVisitedPage = sessionStorage.getItem("currentPage");
  // const pageId = lastVisitedPage ? lastVisitedPage : toHomePage();
  // navigate(pageId);
  if (lastVisitedPage) {
    viewPage(lastVisitedPage);
  } else {
    toHomePage();
  }
  // toHomePage();
  const savedcourse = getRegisteredCourses();
  displayToDashboard(savedcourse);
  savedcourse.forEach((course) => {
    renderToDashboard(course);
  });
  initDashboard();
  // renderToDashboard(savedcourse);
});
// window.addEventListener("DOMContentLoaded");
