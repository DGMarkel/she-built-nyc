function showSideNav() {
  $("#mySidenav").css("width", "25%");
  $(".main").css({
    width: "70%",
    transition: "1s"
  })
  $(".open").replaceWith(`<span class="open" onclick="hideSideNav()">X</span>`);
}

function hideSideNav() {
  $("#mySidenav").css("width", "0");
  $(".main").css("width", "90%");
  $(".open").replaceWith(`<span class="open" onclick="showSideNav()">Browse Nominees</span>`);
  $(".open").css({
    "position":"fixed",
    "right":"0",
    "transition":"1s"
  })
}
