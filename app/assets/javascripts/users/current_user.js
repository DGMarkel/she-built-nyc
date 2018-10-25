function enlargeLoggedInIcon() {
  $("#loggedInIcon").animate({
    "width":"280px",
    "height":"280px",
    "border-bottom-right-radius":"25px",
    "border-bottom-left-radius":"25px",
    "border-top-right-radius":"0",
    "border-top-left-radius":"0",
    "top":"50px",
    "right":"10.5%"},
    1000)
  $("#userDetails h1").animate({"margin-top":"290px"},1000,function(){})
}

function shrinkLoggedInIcon() {
  $("a").on("click", function() {
    animateShrinkage();
  })
}

function animateShrinkage() {
  $("#loggedInIcon").animate({
    "top":"0",
    "height":"40px",
    "width":"40px",
    "float":"right",
    "margin-top":"10px",
    "margin-right":"-40px",
    "overflow": "hidden",
    "border-radius":"50%"
  },400,function(){});
  $("#userDetails h1").animate({"margin-top":"0px"},1000,function(){})
}

function hideCurrentUserProfileTemplate() {
  $("#userDetails").animate({"right": "-36%"}, 500, function() {})
}

function showFavoriteProposals() {
  hideRecentComments();
  hideRecentVotes();
  $("#favoriteProposals").css("display", "block");
  $("#favProps").replaceWith(`<a class="detailsButton" id="favProps" href="#" onclick="hideFavoriteProposals(); return false;">Hide Proposals</a>`)
}

function hideFavoriteProposals() {
  $("#favoriteProposals").css("display", "none");
  $("#favProps").replaceWith(`<a class="detailsButton" id="favProps" href="#" onclick="showFavoriteProposals(); return false;">Favorite proposals</a>`)
}

function showRecentComments() {
  hideFavoriteProposals();
  hideRecentVotes();
  $("#recentComments").css("display", "block");
  $("#recComs").replaceWith(`<a class="detailsButton" id="recComs" href="#" onclick="hideRecentComments(); return false;">Hide Comments</a>`)
}

function hideRecentComments() {
  $("#recentComments").css("display", "none");
  $("#recComs").replaceWith(`<a class="detailsButton" id="recComs" href="#" onclick="showRecentComments(); return false;">Recent Comments</a>`)
}

function showRecentVotes() {
  hideRecentComments();
  hideFavoriteProposals();
  $("#recentVotes").css("display", "block");
  $("#recVotes").replaceWith(`<a class="detailsButton" id="recVotes" href="#" onclick="hideRecentVotes(); return false;">Hide Votes</a>`)
}

function hideRecentVotes() {
  $("#recentVotes").css("display", "none");
  $("#recVotes").replaceWith(`<a class="detailsButton" id="recVotes" href="#" onclick="showRecentVotes(); return false;">Recent Votes</a>`)
}
