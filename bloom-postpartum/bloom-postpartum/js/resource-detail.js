/* =========================================================
   BLOOM - RESOURCE DETAIL JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     GET URL PARAMETER
  ======================================================= */

  const params = new URLSearchParams(
    window.location.search
  );


  const resourceName =
    params.get("resource") || "emotional-changes";


  /* =======================================================
     DOM ELEMENTS
  ======================================================= */

  const detailIcon =
    document.getElementById("detailIcon");


  const detailCategory =
    document.getElementById("detailCategory");


  const detailTitle =
    document.getElementById("detailTitle");


  const detailIntro =
    document.getElementById("detailIntro");


  const resourceArticle =
    document.getElementById("resourceArticle");


  /* =======================================================
     RESOURCE DATABASE
  ======================================================= */

  const resources = {


    /* =====================================================
       1. EMOTIONAL CHANGES
    ====================================================== */

    "emotional-changes": {

      icon: "💭",

      category: "UNDERSTANDING POSTPARTUM WELL-BEING",

      title:
        "Understanding Emotional Changes After Birth",

      intro:
        "The period after childbirth can bring many physical, emotional, and lifestyle changes. Every person's experience is different, and there is no single way that someone is supposed to feel.",

      content: `

        <h2>Why emotions can change after birth</h2>

        <p>
          Adjusting to life after childbirth can involve changes in
          routine, sleep, responsibilities, relationships, and
          expectations. These changes can affect emotional well-being
          in different ways.
        </p>

        <p>
          Some days may feel manageable while others may feel more
          challenging. Your experience does not need to look the same
          as someone else's to be valid.
        </p>


        <div class="article-highlight">

          <h3>A gentle reminder</h3>

          <p>
            There is no expectation to feel happy, confident, or
            prepared all the time. Giving yourself permission to have
            a range of emotions can be an important part of adjusting.
          </p>

        </div>


        <h2>Common experiences people may notice</h2>

        <ul>

          <li>
            Feeling more emotionally sensitive than usual.
          </li>

          <li>
            Finding it difficult to adjust to new routines.
          </li>

          <li>
            Feeling pressure from expectations or responsibilities.
          </li>

          <li>
            Missing parts of life that have changed.
          </li>

          <li>
            Feeling uncertain about new responsibilities.
          </li>

        </ul>


        <h2>What may help</h2>

        <p>
          Start by noticing how you have been feeling without judging
          yourself. Talking openly with someone you trust can also help
          reduce the feeling of carrying everything alone.
        </p>

        <p>
          Small routines, rest where possible, regular meals, and
          moments of connection can also support emotional well-being.
        </p>


        <div class="article-action">

          <h3>Want to explore more support?</h3>

          <p>
            If you would like additional guidance, explore BLOOM's
            healthcare support options.
          </p>

          <a href="healthcare.html">
            Explore Healthcare Support
          </a>

        </div>

      `

    },


    /* =====================================================
       2. SELF CARE
    ====================================================== */

    "self-care": {

      icon: "🌱",

      category: "COPING & SELF-CARE",

      title:
        "Small Ways to Care for Yourself",

      intro:
        "Self-care does not need to be complicated or time-consuming. Small moments of rest, comfort, and support can matter during demanding days.",

      content: `

        <h2>Self-care can look different now</h2>

        <p>
          During the postpartum period, long routines or major lifestyle
          changes may not always be realistic. Instead, self-care can
          begin with small and practical choices.
        </p>


        <h2>Small things you can try</h2>

        <ul>

          <li>
            Take short moments to pause and breathe.
          </li>

          <li>
            Ask someone you trust to help with a task.
          </li>

          <li>
            Stay connected with people who make you feel supported.
          </li>

          <li>
            Make time for something familiar or comforting.
          </li>

          <li>
            Reduce pressure to do everything perfectly.
          </li>

        </ul>


        <div class="article-highlight">

          <h3>Remember</h3>

          <p>
            Caring for yourself is not selfish. Your needs and
            well-being are important too.
          </p>

        </div>


        <h2>Creating small moments of rest</h2>

        <p>
          Rest may not always mean sleeping. It can also mean sitting
          quietly, taking a short break from responsibilities, or
          allowing someone else to help.
        </p>


        <div class="article-action">

          <h3>Need more ideas?</h3>

          <p>
            Explore additional resources or repeat your well-being
            check whenever you feel your situation has changed.
          </p>

          <a href="screening.html">
            Take a Well-Being Check
          </a>

        </div>

      `

    },


    /* =====================================================
       3. FAMILY SUPPORT
    ====================================================== */

    "family-support": {

      icon: "🤝",

      category: "FAMILY & SUPPORT",

      title:
        "Letting Family and Friends Support You",

      intro:
        "People around you may want to help but may not always know what you need. Clear communication can make support more practical and meaningful.",

      content: `

        <h2>You do not have to manage everything alone</h2>

        <p>
          Accepting help can sometimes feel difficult, especially when
          you feel responsible for managing everything yourself.
          However, support can reduce pressure and create more space
          for rest and recovery.
        </p>


        <h2>Ways people can support you</h2>

        <ul>

          <li>
            Helping with household responsibilities.
          </li>

          <li>
            Giving you time to rest or take a break.
          </li>

          <li>
            Listening without immediately trying to solve everything.
          </li>

          <li>
            Helping with practical daily tasks.
          </li>

          <li>
            Checking in regularly and asking how you are doing.
          </li>

        </ul>


        <div class="article-highlight">

          <h3>Try being specific</h3>

          <p>
            Instead of saying "I need help," you can explain one
            specific thing that would make your day easier.
          </p>

        </div>


        <h2>Building your support circle</h2>

        <p>
          Your support system does not have to be large. Even one or
          two trusted people can make a meaningful difference.
        </p>

        <p>
          Consider who makes you feel safe, listened to, and respected.
        </p>


        <div class="article-action">

          <h3>Looking for professional support?</h3>

          <p>
            BLOOM can also help you explore healthcare support options.
          </p>

          <a href="healthcare.html">
            Find Healthcare Support
          </a>

        </div>

      `

    },


    /* =====================================================
       4. STRESS MANAGEMENT
    ====================================================== */

    "stress-management": {

      icon: "🌼",

      category: "COPING & WELL-BEING",

      title:
        "Gentle Ways to Manage Stress",

      intro:
        "Stress can feel different for everyone. Small grounding and calming practices may help you pause and create a sense of stability during overwhelming moments.",

      content: `

        <h2>When everything feels like too much</h2>

        <p>
          Some days can feel especially demanding. When this happens,
          trying to solve everything at once may increase pressure.
          Begin by focusing on one small thing at a time.
        </p>


        <h2>Gentle strategies to try</h2>

        <ul>

          <li>
            Pause and take slow, comfortable breaths.
          </li>

          <li>
            Step away from a stressful situation briefly when possible.
          </li>

          <li>
            Focus on one task instead of everything at once.
          </li>

          <li>
            Reach out to someone you trust.
          </li>

          <li>
            Give yourself permission to take a break.
          </li>

        </ul>


        <div class="article-highlight">

          <h3>You do not need to fix everything immediately</h3>

          <p>
            Sometimes the most helpful next step is simply slowing down
            and deciding what needs your attention first.
          </p>

        </div>


        <h2>Finding your own coping tools</h2>

        <p>
          Different strategies work for different people. Pay attention
          to activities, people, or environments that help you feel
          calmer or more supported.
        </p>


        <div class="article-action">

          <h3>Need additional support?</h3>

          <p>
            If stress feels difficult to manage, consider speaking with
            a qualified healthcare professional.
          </p>

          <a href="healthcare.html">
            Explore Professional Support
          </a>

        </div>

      `

    },


    /* =====================================================
       5. SEEK SUPPORT
    ====================================================== */

    "seek-support": {

      icon: "💜",

      category: "WHEN TO SEEK SUPPORT",

      title:
        "When It May Be Time to Seek Support",

      intro:
        "Seeking support does not mean something is wrong with you. Professional guidance can be helpful whenever emotional or daily challenges begin to feel difficult to manage alone.",

      content: `

        <h2>Support can be helpful at any stage</h2>

        <p>
          You do not need to wait until things feel overwhelming before
          speaking with someone. Early support can help you understand
          what you are experiencing and explore options that feel right
          for you.
        </p>


        <h2>You may consider reaching out when</h2>

        <ul>

          <li>
            Difficult emotions are affecting daily life.
          </li>

          <li>
            You feel increasingly overwhelmed.
          </li>

          <li>
            Support from people around you does not feel sufficient.
          </li>

          <li>
            You are unsure how to manage what you are experiencing.
          </li>

          <li>
            You simply feel that talking to a professional could help.
          </li>

        </ul>


        <div class="article-highlight">

          <h3>Asking for support is proactive</h3>

          <p>
            Reaching out can be a way of caring for yourself and your
            family. You deserve to have your concerns taken seriously.
          </p>

        </div>


        <div class="article-action">

          <h3>Explore your options</h3>

          <p>
            Learn about healthcare support and ways to connect with
            qualified professionals.
          </p>

          <a href="healthcare.html">
            Healthcare Support
          </a>

        </div>

      `

    },


    /* =====================================================
       6. ADJUSTING AFTER BIRTH
    ====================================================== */

    "adjusting-after-birth": {

      icon: "✿",

      category: "NEW PERSPECTIVES",

      title:
        "Adjusting to Life After Birth",

      intro:
        "Life after childbirth can bring changes to routines, relationships, responsibilities, and expectations. Adjustment takes time, and everyone's journey can look different.",

      content: `

        <h2>Change can take time</h2>

        <p>
          Becoming a parent can bring meaningful moments as well as
          unexpected challenges. It is normal for adjustment to happen
          gradually rather than all at once.
        </p>


        <h2>Changes you may notice</h2>

        <ul>

          <li>
            New daily routines and responsibilities.
          </li>

          <li>
            Changes in relationships and communication.
          </li>

          <li>
            Less personal time or space.
          </li>

          <li>
            Different expectations from yourself or others.
          </li>

          <li>
            A changing sense of identity and priorities.
          </li>

        </ul>


        <div class="article-highlight">

          <h3>There is no perfect way to adjust</h3>

          <p>
            You are allowed to learn as you go. It is okay if your
            experience does not match the expectations you imagined.
          </p>

        </div>


        <h2>Giving yourself time</h2>

        <p>
          Try to focus on small adjustments rather than expecting
          everything to feel settled immediately. Support, patience,
          and flexibility can make the transition easier.
        </p>


        <div class="article-action">

          <h3>Check in with yourself</h3>

          <p>
            You can return to BLOOM's well-being check whenever you
            want to reflect on how you have been feeling.
          </p>

          <a href="screening.html">
            Start Well-Being Check
          </a>

        </div>

      `

    }

  };


  /* =======================================================
     GET SELECTED RESOURCE
  ======================================================= */

  const selectedResource =
    resources[resourceName] ||
    resources["emotional-changes"];


  /* =======================================================
     UPDATE HERO CONTENT
  ======================================================= */

  detailIcon.textContent =
    selectedResource.icon;


  detailCategory.textContent =
    selectedResource.category;


  detailTitle.textContent =
    selectedResource.title;


  detailIntro.textContent =
    selectedResource.intro;


  /* =======================================================
     UPDATE ARTICLE CONTENT
  ======================================================= */

  resourceArticle.innerHTML =
    selectedResource.content;


  /* =======================================================
     UPDATE PAGE TITLE
  ======================================================= */

  document.title =
    selectedResource.title + " | BLOOM";


  /* =======================================================
     SCROLL TO TOP ON RESOURCE CHANGE
  ======================================================= */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


});