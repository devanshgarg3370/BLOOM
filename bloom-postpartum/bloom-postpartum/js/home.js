
/* =========================================================
   BLOOM - HOME DASHBOARD JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     MOOD CHECK-IN
  ======================================================= */

  const moodButtons =
    document.querySelectorAll(".mood-btn");

  const moodMessage =
    document.getElementById("moodMessage");


  const moodResponses = {

    good: {
      message:
        "We're glad you're feeling good today. Keep taking gentle care of yourself. 🌿"
    },


    okay: {
      message:
        "It's completely okay to have an ordinary day. Take things one step at a time. 💜"
    },


    low: {
      message:
        "Thank you for checking in with yourself. You deserve support and care. 💛"
    },


    overwhelmed: {
      message:
        "You don't have to manage everything alone. Consider taking a pause and reaching out for support. 🤍"
    }

  };


  moodButtons.forEach((button) => {

    button.addEventListener("click", () => {


      /* Remove previous selection */

      moodButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });


      /* Add selected style */

      button.classList.add("selected");


      /* Get mood */

      const selectedMood =
        button.dataset.mood;


      /* Show supportive message */

      if (moodResponses[selectedMood]) {

        moodMessage.textContent =
          moodResponses[selectedMood].message;

      }


      /* Save today's mood */

      const moodData = {

        mood: selectedMood,

        date: new Date().toISOString()

      };


      localStorage.setItem(
        "bloomTodayMood",
        JSON.stringify(moodData)
      );

    });

  });


  /* =======================================================
     LOAD SAVED MOOD
  ======================================================= */

  function loadSavedMood() {

    try {

      const savedMood =
        JSON.parse(
          localStorage.getItem("bloomTodayMood")
        );


      if (!savedMood) return;


      const savedDate =
        new Date(savedMood.date).toDateString();


      const today =
        new Date().toDateString();


      /* Only show mood if saved today */

      if (savedDate === today) {

        const selectedButton =
          document.querySelector(
            `.mood-btn[data-mood="${savedMood.mood}"]`
          );


        if (selectedButton) {

          selectedButton.classList.add("selected");

        }


        if (moodResponses[savedMood.mood]) {

          moodMessage.textContent =
            moodResponses[savedMood.mood].message;

        }

      }

    } catch (error) {

      console.error(
        "Unable to load saved mood:",
        error
      );

    }

  }


  loadSavedMood();


});

