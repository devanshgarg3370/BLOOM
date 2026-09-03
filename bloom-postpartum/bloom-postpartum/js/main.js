
/* =========================================================
   BLOOM - MAIN JAVASCRIPT
   Global functionality shared across all pages
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. GET CURRENT PAGE
  ======================================================= */

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";


  /* =======================================================
     2. ACTIVE NAVIGATION LINK
     Automatically highlights the current page in navbar
  ======================================================= */

  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

  });


  /* =======================================================
     3. SAFE GET USER DATA FROM LOCALSTORAGE
  ======================================================= */

  let bloomUser = null;

  try {

    const storedUser = localStorage.getItem("bloomUser");

    if (storedUser) {
      bloomUser = JSON.parse(storedUser);
    }

  } catch (error) {

    console.error("Unable to load BLOOM user data:", error);

    localStorage.removeItem("bloomUser");

  }


  /* =======================================================
     4. DISPLAY USER NAME
     
     Add class="user-name" anywhere in HTML:
     
     <span class="user-name"></span>
  ======================================================= */

  const userNameElements =
    document.querySelectorAll(".user-name");

  if (userNameElements.length > 0) {

    const userName =
      bloomUser?.name || "Friend";

    userNameElements.forEach((element) => {
      element.textContent = userName;
    });

  }


  /* =======================================================
     5. UPDATE USER INITIAL
     
     Add class="user-initial" anywhere in HTML:
     
     <div class="user-initial"></div>
  ======================================================= */

  const userInitialElements =
    document.querySelectorAll(".user-initial");

  if (userInitialElements.length > 0) {

    const userName =
      bloomUser?.name || "Friend";

    const initial =
      userName.charAt(0).toUpperCase();

    userInitialElements.forEach((element) => {
      element.textContent = initial;
    });

  }


  /* =======================================================
     6. PROTECT PRIVATE PAGES
     
     If user has not completed onboarding,
     redirect them to onboarding page.
  ======================================================= */

  const protectedPages = [

    "home.html",
    "screening.html",
    "results.html",
    "selfhelp.html",
    "resource-detail.html",
    "healthcare.html",
    "profile.html"

  ];


  const onboardingCompleted =
    bloomUser?.onboardingCompleted === true;


  if (
    protectedPages.includes(currentPage) &&
    !onboardingCompleted
  ) {

    window.location.href = "onboarding.html";

    return;

  }


  /* =======================================================
     7. HEADER PROFILE BUTTON
     
     If .profile-btn exists, redirect to profile page.
  ======================================================= */

  const profileButton =
    document.querySelector(".profile-btn");

  if (profileButton) {

    profileButton.addEventListener("click", () => {

      window.location.href = "profile.html";

    });

  }


  /* =======================================================
     8. EMERGENCY BUTTONS
     
     Any button/link with class="emergency-btn"
     will open emergency.html
  ======================================================= */

  const emergencyButtons =
    document.querySelectorAll(".emergency-btn");

  emergencyButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

      if (button.tagName !== "A") {
        event.preventDefault();
      }

      window.location.href = "emergency.html";

    });

  });


  /* =======================================================
     9. SMOOTH SCROLL
     
     For links like:
     <a href="#resources">Resources</a>
  ======================================================= */

  const anchorLinks =
    document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        targetId === "#" ||
        targetId.length <= 1
      ) {
        return;
      }

      const targetElement =
        document.querySelector(targetId);

      if (targetElement) {

        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =======================================================
     10. GLOBAL BUTTON CLICK EFFECT
  ======================================================= */

  const buttons =
    document.querySelectorAll(
      ".primary-btn, .secondary-btn, .outline-btn"
    );

  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      button.classList.add("btn-clicked");

      setTimeout(() => {
        button.classList.remove("btn-clicked");
      }, 150);

    });

  });


  /* =======================================================
     11. PAGE LOADED CLASS
     
     Used for animations if needed in CSS.
  ======================================================= */

  setTimeout(() => {

    document.body.classList.add("page-loaded");

  }, 50);


});


/* =========================================================
   GLOBAL HELPER FUNCTIONS
========================================================= */


/* =======================================================
   GET BLOOM USER
======================================================= */

function getBloomUser() {

  try {

    const user =
      localStorage.getItem("bloomUser");

    return user ? JSON.parse(user) : null;

  } catch (error) {

    console.error("Error getting user data:", error);

    return null;

  }

}


/* =======================================================
   SAVE BLOOM USER
======================================================= */

function saveBloomUser(userData) {

  try {

    localStorage.setItem(
      "bloomUser",
      JSON.stringify(userData)
    );

  } catch (error) {

    console.error("Error saving user data:", error);

  }

}


/* =======================================================
   CLEAR BLOOM USER
======================================================= */

function clearBloomUser() {

  localStorage.removeItem("bloomUser");

}


/* =======================================================
   LOGOUT FUNCTION
   
   Use later in Profile page:
   
   logoutBloomUser();
======================================================= */

function logoutBloomUser() {

  clearBloomUser();

  window.location.href = "index.html";

}

