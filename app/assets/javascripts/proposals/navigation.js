function proposalNavigation(){
  $(".js-next").on("click", function() {
    // set id for next proposal
    navId = (parseInt($(".js-next").attr("data-id")) + 1).toString();
    $.get(`/proposals/${navId}.json`, function(data) {
      if (data != null) {
        documentReadyCalls(navId);
      }
    });
  });
  $(".js-previous").on("click", function() {
    // set id for previous proposal
    navId = (parseInt($(".js-next").attr("data-id")) - 1).toString();
    if (navId != "0") {
      documentReadyCalls(navId);
    }
  });
}
