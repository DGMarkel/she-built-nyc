function showOrHideRankingForm() {
  $("html").on("click", function(e) {
    if ($(e.target).is("#rankingForm h1")) {
      $("#rankingPopUp").css({
        "height": "200px",
        "border": "1px solid lightgray"
      });
    } else if (!$(e.target).is("#rankingPopUp") && !$(e.target).parents().is("#rankingPopUp")) {
      $("#rankingPopUp").css({
        "height": "0",
        "border": "0"
      });
    };
  });
}
