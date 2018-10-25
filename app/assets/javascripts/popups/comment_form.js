function showOrHideCommentForm() {
  $("body").on("click", function(e) {
    if ($(e.target).is("#commentForm h1")) {
      $("#commentPopUp").css({
        "height": "200px",
        "border": "1px solid lightgray"
      });
    } else if (!$(e.target).is("#commentPopUp") && !$(e.target).parents().is("#commentPopUp")) {
      $("#commentPopUp").css({
        "height": "0",
        "border": "0"
      });
    };
  });
}
