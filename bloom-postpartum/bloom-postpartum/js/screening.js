
/* =========================================================
   BLOOM - SCREENING JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     SCREENING QUESTIONS

     Prototype reflection questions for the BLOOM frontend.
     These should not be treated as a medical diagnosis.
  ======================================================= */

  const questions = [

    {
      question:
        "I have been able to enjoy things and look forward to moments that matter to me.",

      options: [
        "Yes, most of the time",
        "Yes, sometimes",
        "Not very often",
        "Hardly at all"
      ]
    },


    {
      question:
        "I have been able to see the positive side of everyday situations.",

      options: [
        "As much as usual",
        "A little less than usual",
        "Much less than usual",
        "Not at all"
      ]
    },


    {
      question:
        "I have felt unnecessarily worried or tense.",

      options: [
        "No, not much",
        "Sometimes",
        "Often",
        "Most of the time"
      ]
    },


    {
      question:
        "I have felt overwhelmed by responsibilities or daily challenges.",

      options: [
        "Not at all",
        "Occasionally",
        "Quite often",
        "Very often"
      ]
    },


    {
      question:
        "I have been able to rest when opportunities for rest were available.",

      options: [
        "Most of the time",
        "Sometimes",
        "Rarely",
        "Almost never"
      ]
    },


    {
      question:
        "I have felt emotionally supported by people around me.",

      options: [
        "Yes, strongly",
        "Mostly",
        "Only sometimes",
        "Very little"
      ]
    },


    {
      question:
        "I have found it difficult to manage changes in my mood.",

      options: [
        "Not at all",
        "Sometimes",
        "Often",
        "Very often"
      ]
    },


    {
      question:
        "I have felt connected to myself and the people important to me.",

      options: [
        "Very connected",
        "Mostly connected",
        "Sometimes disconnected",
        "Very disconnected"
      ]
    },


    {
      question:
        "I have felt that I need additional support or someone to talk to.",

      options: [
        "Not currently",
        "Maybe sometimes",
        "Yes, I often feel this way",
        "Yes, I strongly need support"
      ]
    },


    {
      question:
        "Overall, how would you describe your emotional well-being recently?",

      options: [
        "Generally doing well",
        "Managing, but finding some things difficult",
        "Finding things quite difficult",
        "Feeling significantly overwhelmed"
      ]
    }

  ];


  /* =======================================================
     STATE
  ======================================================= */

  let currentQuestionIndex = 0;

  let answers = new Array(questions.length).fill(null);


  /* =======================================================
     DOM ELEMENTS
  ======================================================= */

  const questionText =
    document.getElementById("questionText");

  const answerOptions =
    document.getElementById("answerOptions");

  const currentQuestion =
    document.getElementById("currentQuestion");

  const totalQuestions =
    document.getElementById("totalQuestions");

  const progressBar =
    document.getElementById("progressBar");

  const progressPercentage =
    document.getElementById("progressPercentage");

  const previousBtn =
    document.getElementById("previousBtn");

  const nextBtn =
    document.getElementById("nextBtn");

  const questionArea =
    document.getElementById("questionArea");

  const questionNumber =
    document.querySelector(".question-number");


  /* =======================================================
     TOTAL QUESTIONS
  ======================================================= */

  totalQuestions.textContent = questions.length;


  /* =======================================================
     RENDER QUESTION
  ======================================================= */

  function renderQuestion() {


    const currentData =
      questions[currentQuestionIndex];


    /* Question Number */

    currentQuestion.textContent =
      currentQuestionIndex + 1;


    questionNumber.textContent =
      String(currentQuestionIndex + 1).padStart(2, "0");


    /* Question Text */

    questionText.textContent =
      currentData.question;


    /* Clear Previous Options */

    answerOptions.innerHTML = "";


    /* Create Answer Buttons */

    currentData.options.forEach((option, index) => {


      const button =
        document.createElement("button");


      button.type = "button";


      button.className =
        "answer-option";


      button.innerHTML = `
        <span class="option-circle"></span>
        <span class="option-text">${option}</span>
      `;


      /* Mark Previously Selected Answer */

      if (
        answers[currentQuestionIndex] === index
      ) {

        button.classList.add("selected");

      }


      /* Answer Selection */

      button.addEventListener("click", () => {

        selectAnswer(index);

      });


      answerOptions.appendChild(button);

    });


    /* Progress */

    updateProgress();


    /* Navigation */

    updateNavigation();


    /* Re-trigger Animation */

    questionArea.style.animation = "none";

    questionArea.offsetHeight;

    questionArea.style.animation = "";

  }


  /* =======================================================
     SELECT ANSWER
  ======================================================= */

  function selectAnswer(answerIndex) {


    answers[currentQuestionIndex] =
      answerIndex;


    const allOptions =
      document.querySelectorAll(".answer-option");


    allOptions.forEach((option, index) => {

      option.classList.toggle(
        "selected",
        index === answerIndex
      );

    });


    /* Enable Next Button */

    nextBtn.disabled = false;


    /* Save Temporary Progress */

    saveScreeningProgress();

  }


  /* =======================================================
     UPDATE PROGRESS
  ======================================================= */

  function updateProgress() {


    const progress =
      ((currentQuestionIndex + 1) /
        questions.length) * 100;


    progressBar.style.width =
      `${progress}%`;


    progressPercentage.textContent =
      `${Math.round(progress)}% Complete`;

  }


  /* =======================================================
     UPDATE NAVIGATION
  ======================================================= */

  function updateNavigation() {


    /* Previous Button */

    previousBtn.disabled =
      currentQuestionIndex === 0;


    /* Next Button */

    if (
      answers[currentQuestionIndex] === null
    ) {

      nextBtn.disabled = true;

    } else {

      nextBtn.disabled = false;

    }


    /* Last Question */

    if (
      currentQuestionIndex ===
      questions.length - 1
    ) {

      nextBtn.textContent =
        "Submit Check-In ✓";

    } else {

      nextBtn.textContent =
        "Next Question →";

    }

  }


  /* =======================================================
     NEXT QUESTION
  ======================================================= */

  nextBtn.addEventListener("click", () => {


    if (
      answers[currentQuestionIndex] === null
    ) {
      return;
    }


    /* If Last Question */

    if (
      currentQuestionIndex ===
      questions.length - 1
    ) {

      submitScreening();

      return;

    }


    /* Move Forward */

    currentQuestionIndex++;

    renderQuestion();


    /* Scroll Card Into View */

    document.querySelector(".screening-card")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  });


  /* =======================================================
     PREVIOUS QUESTION
  ======================================================= */

  previousBtn.addEventListener("click", () => {


    if (currentQuestionIndex > 0) {

      currentQuestionIndex--;

      renderQuestion();

    }

  });


  /* =======================================================
     SAVE SCREENING PROGRESS
  ======================================================= */

  function saveScreeningProgress() {


    const screeningProgress = {

      currentQuestion: currentQuestionIndex,

      answers: answers,

      lastUpdated:
        new Date().toISOString()

    };


    localStorage.setItem(
      "bloomScreeningProgress",
      JSON.stringify(screeningProgress)
    );

  }


  /* =======================================================
     LOAD SAVED PROGRESS
  ======================================================= */

  function loadScreeningProgress() {

    try {

      const savedProgress =
        JSON.parse(
          localStorage.getItem(
            "bloomScreeningProgress"
          )
        );


      if (!savedProgress) return;


      if (
        Array.isArray(savedProgress.answers)
      ) {

        answers =
          savedProgress.answers;

      }


      if (
        typeof savedProgress.currentQuestion ===
        "number"
      ) {

        currentQuestionIndex =
          savedProgress.currentQuestion;

      }

    } catch (error) {

      console.error(
        "Unable to load screening progress:",
        error
      );

    }

  }


  /* =======================================================
     SUBMIT SCREENING
  ======================================================= */

  function submitScreening() {


    const screeningResult = {

      completed: true,

      completedAt:
        new Date().toISOString(),

      answers: answers

    };


    /* Save Final Responses */

    localStorage.setItem(
      "bloomScreeningResult",
      JSON.stringify(screeningResult)
    );


    /* Remove Temporary Progress */

    localStorage.removeItem(
      "bloomScreeningProgress"
    );


    /* Redirect to Results Page */

    window.location.href =
      "results.html";

  }


  /* =======================================================
     INITIALIZE
  ======================================================= */

  loadScreeningProgress();

  renderQuestion();


});

