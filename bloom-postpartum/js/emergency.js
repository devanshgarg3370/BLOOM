document.addEventListener("DOMContentLoaded", function () {


  /* ================= ELEMENTS ================= */

  const modal =
    document.getElementById("supportModal");

  const closeModal =
    document.getElementById("closeModal");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalText =
    document.getElementById("modalText");

  const modalAction =
    document.getElementById("modalAction");


  const emergencyBtn =
    document.getElementById("emergencyBtn");

  const emergencyOption =
    document.querySelector(".emergency-option");

  const hospitalOption =
    document.querySelector(".hospital-option");

  const trustedOption =
    document.querySelector(".trusted-option");


  /* ================= OPEN MODAL ================= */

  function openModal(title, text, buttonText, link) {

    modalTitle.textContent = title;

    modalText.textContent = text;

    modalAction.textContent = buttonText;

    modalAction.href = link;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

  }


  /* ================= CLOSE MODAL ================= */

  function hideModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

  }


  /* ================= HERO BUTTON ================= */

  emergencyBtn.addEventListener("click", function () {

    openModal(

      "Immediate Professional Support",

      "If you believe urgent professional help is needed, contact your local emergency service or go to the nearest appropriate emergency healthcare facility.",

      "Healthcare Support",

      "healthcare.html"

    );

  });


  /* ================= EMERGENCY OPTION ================= */

  emergencyOption.addEventListener("click", function () {

    openModal(

      "Emergency Services",

      "For an immediate emergency, contact verified local emergency services or seek urgent professional care.",

      "Healthcare Support",

      "healthcare.html"

    );

  });


  /* ================= HOSPITAL OPTION ================= */

  hospitalOption.addEventListener("click", function () {

    openModal(

      "Healthcare Facility",

      "You can seek urgent professional care through an appropriate hospital or healthcare facility.",

      "Find Healthcare Support",

      "healthcare.html"

    );

  });


  /* ================= TRUSTED PERSON OPTION ================= */

  trustedOption.addEventListener("click", function () {

    openModal(

      "Reach Someone You Trust",

      "Contact a trusted family member, friend, or caregiver and let them know you need support. They may help you connect with professional care.",

      "Explore Support",

      "healthcare.html"

    );

  });


  /* ================= CLOSE BUTTON ================= */

  closeModal.addEventListener("click", hideModal);


  /* ================= CLICK OUTSIDE ================= */

  modal.addEventListener("click", function (event) {

    if (event.target === modal) {

      hideModal();

    }

  });


  /* ================= ESC KEY ================= */

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

      hideModal();

    }

  });


  /* ================= SMOOTH SCROLL ================= */

  const supportLink =
    document.querySelector('.secondary-btn[href="#support-options"]');


  if (supportLink) {

    supportLink.addEventListener("click", function (event) {

      event.preventDefault();

      document
        .getElementById("support-options")
        .scrollIntoView({

          behavior: "smooth"

        });

    });

  }


});