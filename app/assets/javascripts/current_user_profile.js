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
