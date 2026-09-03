/* =========================================
   BLOOM - PROFILE PAGE JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const editProfileBtn =
  document.getElementById("editProfileBtn");

const saveProfileBtn =
  document.getElementById("saveProfileBtn");

const inputs = document.querySelectorAll(
  ".form-group input"
);

const displayName =
  document.getElementById("displayName");

const displayEmail =
  document.getElementById("displayEmail");

const historyBtn =
  document.getElementById("historyBtn");

const historySection =
  document.getElementById("historySection");

const privacyBtn =
  document.getElementById("privacyBtn");

const privacySection =
  document.getElementById("privacySection");

const themeBtn =
  document.getElementById("themeBtn");

const themeName =
  document.getElementById("themeName");

const themeDescription =
  document.getElementById("themeDescription");

const logoutBtn =
  document.getElementById("logoutBtn");

const deleteBtn =
  document.getElementById("deleteBtn");



/* =========================================
   EDIT PROFILE
========================================= */

let editing = false;


editProfileBtn.addEventListener("click", () => {

  editing = !editing;


  inputs.forEach((input) => {

    input.disabled = !editing;

  });


  if (editing) {

    editProfileBtn.textContent =
      "Cancel";

    inputs[0].focus();

  } else {

    editProfileBtn.textContent =
      "Edit Profile";

  }

});



/* =========================================
   SAVE PROFILE
========================================= */

saveProfileBtn.addEventListener("click", () => {

  const name =
    document.getElementById("fullName").value.trim();

  const email =
    document.getElementById("email").value.trim();


  if (!name || !email) {

    alert("Please fill in your name and email.");

    return;

  }


  displayName.textContent = name;

  displayEmail.textContent = email;


  inputs.forEach((input) => {

    input.disabled = true;

  });


  editing = false;

  editProfileBtn.textContent =
    "Edit Profile";


  alert("Profile updated successfully.");

});



/* =========================================
   SCREENING HISTORY
========================================= */

historyBtn.addEventListener("click", () => {

  historySection.classList.toggle("show");


  if (historySection.classList.contains("show")) {

    historyBtn.innerHTML =
      'Hide History <span>↑</span>';

    historySection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  } else {

    historyBtn.innerHTML =
      'View History <span>→</span>';

  }

});



/* =========================================
   PRIVACY BUTTON
========================================= */

privacyBtn.addEventListener("click", () => {

  privacySection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

});



/* =========================================
   PRIVACY TOGGLES
========================================= */

const toggles =
  document.querySelectorAll(".toggle");


toggles.forEach((toggle) => {

  toggle.addEventListener("click", () => {

    toggle.classList.toggle("active");

  });

});



/* =========================================
   THEME SWITCH
========================================= */

let darkMode = false;


themeBtn.addEventListener("click", () => {

  darkMode = !darkMode;


  if (darkMode) {

    document.body.classList.add("dark-mode");

    themeName.textContent =
      "Soft Dark";

    themeDescription.textContent =
      "A softer darker appearance for comfortable viewing.";

    themeBtn.textContent =
      "Switch to Light";

  } else {

    document.body.classList.remove("dark-mode");

    themeName.textContent =
      "Bloom Light";

    themeDescription.textContent =
      "A calm green and lavender interface designed for clarity and comfort.";

    themeBtn.textContent =
      "Try Dark Mode";

  }

});



/* =========================================
   LOGOUT
========================================= */

logoutBtn.addEventListener("click", () => {

  const confirmLogout =
    confirm(
      "Are you sure you want to log out of BLOOM?"
    );


  if (confirmLogout) {

    alert(
      "You have been logged out successfully."
    );

    // Replace this with your actual login page:
    // window.location.href = "login.html";

  }

});



/* =========================================
   DELETE ACCOUNT
========================================= */

deleteBtn.addEventListener("click", () => {

  const confirmDelete =
    confirm(
      "Are you sure you want to delete your BLOOM account? This action cannot be undone."
    );


  if (confirmDelete) {

    alert(
      "Your account deletion request has been submitted."
    );

  }

});



/* =========================================
   ACCOUNT SETTINGS
========================================= */

const accountRows =
  document.querySelectorAll(
    ".account-row:not(.logout-row):not(.delete-row)"
  );


accountRows.forEach((row) => {

  row.addEventListener("click", () => {

    const title =
      row.querySelector("h3").textContent.trim();


    if (title === "Change Password") {

      alert(
        "Password settings will open here."
      );

    }


    if (title === "Notification Preferences") {

      document
        .getElementById("privacySection")
        .scrollIntoView({
          behavior: "smooth"
        });

    }

  });

});