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

function hideCommentForm() {
  $("#commentPopUp").css("height", "0");
}

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

// relic from a failed experiment, may come in handy later

// function showProfileSideNav() {
//   animateShrinkage();
//   $("#mySidenav").css("width", "35%");
//   $(".viewNomineesButton").replaceWith(`<a class="viewNomineesButton" onclick="hideProfileSideNav()">Return to Profile</a>`);
// }
//
// function hideProfileSideNav() {
//   enlargeLoggedInIcon();
//   $("#mySidenav").css("width", "0");
//   $(".viewNomineesButton").replaceWith(`<a class="viewNomineesButton" onclick="showProfileSideNav()">Browse Nominees</a>`);
// }
