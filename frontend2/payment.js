/* =========================================================
   EPS TOPIK PAYMENT PAGE
   ========================================================= */

const payWithEsewaButton =
  document.getElementById("payWithEsewaButton");


if (payWithEsewaButton) {

  payWithEsewaButton.addEventListener(
    "click",
    function () {

      alert(
        "eSewa payment gateway will be connected here."
      );

    }
  );

}