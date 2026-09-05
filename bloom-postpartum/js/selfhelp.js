/* =========================================================
   BLOOM - SELF HELP PAGE JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     DOM ELEMENTS
  ======================================================= */

  const searchInput =
    document.getElementById("resourceSearch");


  const filterButtons =
    document.querySelectorAll(".filter-btn");


  const resourceCards =
    document.querySelectorAll(".resource-card");


  const resourceGrid =
    document.getElementById("resourceGrid");


  const noResults =
    document.getElementById("noResults");


  /* =======================================================
     CURRENT FILTER
  ======================================================= */

  let currentCategory = "all";


  /* =======================================================
     FILTER RESOURCES
  ======================================================= */

  function filterResources() {


    const searchValue =
      searchInput.value
        .toLowerCase()
        .trim();


    let visibleCards = 0;


    resourceCards.forEach((card) => {


      const category =
        card.dataset.category;


      const searchData =
        card.dataset.search;


      const cardText =
        card.textContent.toLowerCase();


      /* CATEGORY MATCH */

      const categoryMatch =
        currentCategory === "all" ||
        category === currentCategory;


      /* SEARCH MATCH */

      const searchMatch =
        searchData.includes(searchValue) ||
        cardText.includes(searchValue);


      /* SHOW / HIDE */

      if (
        categoryMatch &&
        searchMatch
      ) {

        card.style.display = "flex";

        visibleCards++;

      } else {

        card.style.display = "none";

      }

    });


    /* NO RESULTS */

    if (visibleCards === 0) {

      noResults.style.display = "block";

      resourceGrid.style.display = "none";

    } else {

      noResults.style.display = "none";

      resourceGrid.style.display = "grid";

    }

  }


  /* =======================================================
     CATEGORY BUTTON CLICK
  ======================================================= */

  filterButtons.forEach((button) => {


    button.addEventListener("click", () => {


      /* Remove Active Class */

      filterButtons.forEach((btn) => {

        btn.classList.remove("active");

      });


      /* Add Active Class */

      button.classList.add("active");


      /* Update Category */

      currentCategory =
        button.dataset.category;


      /* Apply Filter */

      filterResources();

    });


  });


  /* =======================================================
     SEARCH INPUT
  ======================================================= */

  searchInput.addEventListener(
    "input",
    filterResources
  );


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {


      link.addEventListener("click", (event) => {


        const target =
          document.querySelector(
            link.getAttribute("href")
          );


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