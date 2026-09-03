/* =========================================================
   BLOOM - HEALTHCARE SUPPORT JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     SUPPORT INFORMATION DATA
  ======================================================= */

  const supportInfo = {

    doctor: {
      title: "Doctor or Healthcare Provider",
      message:
        "A doctor or healthcare provider can help you discuss physical and emotional changes after childbirth. They may answer your questions, assess your concerns, and guide you toward appropriate support or specialist care."
    },


    therapist: {
      title: "Counselor or Therapist",
      message:
        "A qualified mental-health professional can provide a supportive and private space to discuss emotional challenges, stress, adjustment, and coping strategies."
    },


    specialist: {
      title: "Postpartum Specialist",
      message:
        "A specialist with experience in postpartum care may provide focused guidance related to the emotional and practical challenges that can occur after childbirth."
    },


    community: {
      title: "Community Support",
      message:
        "Community programs and support groups can help you connect with others, access local services, and feel less alone during the adjustment period."
    }

  };


  /* =======================================================
     GET ALL LEARN MORE BUTTONS
  ======================================================= */

  const learnMoreButtons =
    document.querySelectorAll(".learn-more-btn");


  /* =======================================================
     CREATE SUPPORT MODAL
  ======================================================= */

  const modal = document.createElement("div");

  modal.className = "support-modal";

  modal.innerHTML = `

    <div class="support-modal-box">

      <button
        class="modal-close"
        aria-label="Close"
      >
        ×
      </button>


      <div class="modal-icon">
        ✿
      </div>


      <span class="modal-label">
        BLOOM SUPPORT GUIDE
      </span>


      <h2 id="modalTitle"></h2>


      <p id="modalMessage"></p>


      <a
        href="screening.html"
        class="modal-action"
      >
        Take Well-Being Check
      </a>


    </div>

  `;


  document.body.appendChild(modal);


  /* =======================================================
     GET MODAL ELEMENTS
  ======================================================= */

  const modalTitle =
    document.getElementById("modalTitle");


  const modalMessage =
    document.getElementById("modalMessage");


  const modalClose =
    modal.querySelector(".modal-close");


  /* =======================================================
     OPEN MODAL
  ======================================================= */

  learnMoreButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const supportType =
        button.dataset.support;


      const selectedSupport =
        supportInfo[supportType];


      modalTitle.textContent =
        selectedSupport.title;


      modalMessage.textContent =
        selectedSupport.message;


      modal.classList.add("show");

      document.body.style.overflow = "hidden";

    });

  });


  /* =======================================================
     CLOSE MODAL FUNCTION
  ======================================================= */

  function closeModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

  }


  /* CLOSE BUTTON */

  modalClose.addEventListener(
    "click",
    closeModal
  );


  /* CLICK OUTSIDE MODAL */

  modal.addEventListener("click", (event) => {

    if (event.target === modal) {

      closeModal();

    }

  });


  /* ESC KEY */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      modal.classList.contains("show")
    ) {

      closeModal();

    }

  });


  /* =======================================================
     SMOOTH SCROLL FOR INTERNAL LINKS
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");


        const target =
          document.querySelector(targetId);


        if (target) {

          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      });

    });


});