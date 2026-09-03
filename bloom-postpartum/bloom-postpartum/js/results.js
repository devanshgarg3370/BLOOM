/* =========================================================
   BLOOM - SCREENING RESULTS JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     GET SCREENING RESULT
  ======================================================= */

  const savedResult = localStorage.getItem(
    "bloomScreeningResult"
  );


  /* DOM ELEMENTS */

  const resultIcon =
    document.getElementById("resultIcon");

  const resultTitle =
    document.getElementById("resultTitle");

  const resultDescription =
    document.getElementById("resultDescription");

  const resultMessage =
    document.getElementById("resultMessage");


  /* =======================================================
     DEFAULT RESULT
  ======================================================= */

  const resultData = {

    level: "general",

    title:
      "You're taking an important step.",

    description:
      "Taking time to reflect on your well-being can help you understand what kind of care or support may feel helpful right now.",

    message:
      "You deserve care and support. Continue checking in with yourself and reach out whenever you feel you need additional help.",

    icon: "🌿"

  };


  /* =======================================================
     IF RESULT EXISTS
  ======================================================= */

  if (savedResult) {

    try {

      const data =
        JSON.parse(savedResult);


      const answers =
        data.answers || [];


      /* Calculate Prototype Score */

      const totalScore =
        answers.reduce(
          (total, answer) => total + Number(answer || 0),
          0
        );


      const maxScore =
        answers.length * 3;


      const percentage =
        maxScore > 0
          ? (totalScore / maxScore) * 100
          : 0;


      /* ===================================================
         RESULT LEVELS

         These are prototype support categories,
         not medical diagnoses.
      =================================================== */


      if (percentage < 30) {

        resultData.level = "doing-well";

        resultData.title =
          "It looks like you're finding some balance right now.";

        resultData.description =
          "Your responses suggest that you may currently be managing many aspects of your well-being. Continuing self-care and staying connected with supportive people can still be valuable.";

        resultData.message =
          "Keep making space for rest, connection, and small moments that support your well-being.";

        resultData.icon = "🌿";

      }


      else if (percentage < 60) {

        resultData.level = "some-support";

        resultData.title =
          "Some additional care and support may be helpful.";

        resultData.description =
          "Your responses suggest that some parts of daily life or emotional well-being may feel challenging right now. Exploring support and talking with someone you trust could be helpful.";

        resultData.message =
          "You do not need to manage everything alone. Small steps toward support can make a meaningful difference.";

        resultData.icon = "💜";

      }


      else {

        resultData.level = "more-support";

        resultData.title =
          "Reaching out for additional support may be important.";

        resultData.description =
          "Your responses suggest that you may be experiencing significant challenges right now. Consider speaking with a qualified healthcare professional or trusted support person.";

        resultData.message =
          "You deserve support and care. Connecting with a professional can help you understand what you are experiencing and explore the support available to you.";

        resultData.icon = "🤍";

      }


    } catch (error) {

      console.error(
        "Unable to read screening results:",
        error
      );

    }

  }


  /* =======================================================
     UPDATE PAGE CONTENT
  ======================================================= */

  resultIcon.textContent =
    resultData.icon;


  resultTitle.textContent =
    resultData.title;


  resultDescription.textContent =
    resultData.description;


  resultMessage.textContent =
    resultData.message;


  /* =======================================================
     SAVE RESULT SUMMARY
  ======================================================= */

  localStorage.setItem(
    "bloomLatestResult",
    JSON.stringify({
      level: resultData.level,
      completedAt: new Date().toISOString()
    })
  );


});