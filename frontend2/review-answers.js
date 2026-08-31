/* =========================================================
   REVIEW ANSWERS
   ========================================================= */

const reviewFilters =
  document.querySelectorAll(".review-filter");

const reviewCards =
  document.querySelectorAll(".review-question-card");


reviewFilters.forEach(function (button) {

  button.addEventListener("click", function () {

    const selectedFilter =
      button.dataset.filter;


    /* Remove active state */

    reviewFilters.forEach(function (item) {

      item.classList.remove("active");

    });


    /* Set selected button active */

    button.classList.add("active");


    /* Filter question cards */

    reviewCards.forEach(function (card) {

      const status =
        card.dataset.status;


      if (
        selectedFilter === "all" ||
        selectedFilter === status
      ) {

        card.style.display = "block";

      } else {

        card.style.display = "none";

      }

    });

  });

});