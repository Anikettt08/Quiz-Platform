const params =
  new URLSearchParams(
    window.location.search
  );


const category =
  params.get("category");


const setId =
  Number(
    params.get("set")
  );


const validCategories = {
  vowels: "Korean Vowels & Consonants",
  numbers: "Korean Numbers",
  counting: "Counting Units",
  speech: "Parts of Speech",
  tense: "Tense",
  formal: "Formal & Informal Language",
  indirect: "Indirect Speech",
  textbook: "EPS TOPIK TEXT BOOK"
};


/* =========================================
   VALIDATE SELECTED TEST
   ========================================= */

if (
  !validCategories[category] ||
  !Number.isInteger(setId) ||
  setId < 2 ||
  setId > 21
) {

  alert(
    "Invalid paid test set selected."
  );

  window.location.href =
    "set.html";

}


const categoryName =
  validCategories[category];


const formattedSet =
  String(setId)
    .padStart(2, "0");



/* =========================================
   UPDATE PAYMENT PAGE
   ========================================= */

document
  .getElementById(
    "selectedSetName"
  )
  .textContent =
    `Set No. ${formattedSet}`;


document
  .getElementById(
    "selectedCategoryName"
  )
  .textContent =
    categoryName;


document
  .getElementById(
    "summaryCategoryName"
  )
  .textContent =
    categoryName;


document
  .getElementById(
    "summarySetName"
  )
  .textContent =
    `Set No. ${formattedSet}`;



/* =========================================
   ESEWA BUTTON
   ========================================= */

const payButton =
  document.getElementById(
    "payWithEsewaButton"
  );


payButton.addEventListener(
  "click",
  function () {

    /*
      IMPORTANT:

      Do not directly generate the eSewa
      signature here in frontend JavaScript.

      Your FastAPI backend must:

      1. Receive category + set
      2. Validate the test
      3. Set authoritative price = NPR 50
      4. Generate transaction UUID
      5. Generate eSewa signature
      6. Return payment information
    */


    console.log(
      "Selected category:",
      category
    );


    console.log(
      "Selected set:",
      setId
    );


    alert(
      "eSewa backend payment integration is the next step."
    );

  }
);