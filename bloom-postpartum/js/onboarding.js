
/* =========================================================
   BLOOM - ONBOARDING PAGE JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", function () {

  const onboardingForm = document.getElementById("onboardingForm");

  const formError = document.getElementById("formError");


  onboardingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* ================= GET FORM VALUES ================= */

    const name = document.getElementById("name").value.trim();

    const stage = document.getElementById("stage").value;

    const language = document.getElementById("language").value;

    const support = document.getElementById("support").value;

    const consent = document.getElementById("consent").checked;


    /* ================= RESET ERROR ================= */

    formError.textContent = "";


    /* ================= VALIDATION ================= */

    if (!stage) {

      showError("Please select where you are in your journey.");

      return;
    }


    if (!support) {

      showError("Please select the type of support you are looking for.");

      return;
    }


    if (!consent) {

      showError(
        "Please read and accept the information and support disclaimer before continuing."
      );

      return;
    }


    /* ================= SAVE USER DATA ================= */

    const userData = {

      name: name || "Friend",

      stage: stage,

      language: language,

      support: support,

      consent: consent,

      onboardingCompleted: true

    };


    localStorage.setItem(
      "bloomUser",
      JSON.stringify(userData)
    );


    /* ================= BUTTON LOADING STATE ================= */

    const submitButton =
      onboardingForm.querySelector('button[type="submit"]');


    submitButton.disabled = true;

    submitButton.innerHTML =
      "Setting up your BLOOM journey...";


    /* ================= REDIRECT ================= */

    setTimeout(function () {

      window.location.href = "home.html";

    }, 800);

  });


  /* ================= ERROR FUNCTION ================= */

  function showError(message) {

    formError.textContent = message;

    formError.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }


});

