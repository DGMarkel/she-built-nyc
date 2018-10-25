

function showTopNav() {
  $(".topNav").css({
    "border-bottom": "3px solid lightgray",
    "border-bottom-right-radius": "5px"
  });
  $(".topNav").animate({
    "max-height": "100%"
  },500,function(){})
  $("#topNavBurger").replaceWith(`<a id="topNavBurger" href="#" onclick="hideTopNav(); return false;">&#9776;</a></li>`);
}

function hideTopNav() {
  $(".topNav").css("border-bottom", "0");
  $(".topNav").animate({
    "max-height":"0"
  },250,function(){})
  $("#topNavBurger").replaceWith(`<a id="topNavBurger" href="#" onclick="showTopNav(); return false;">&#9776;</a></li>`);
}
