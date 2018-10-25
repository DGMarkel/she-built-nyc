function editProfileTemplate() {
  hideSideNav();
  hideCurrentUserProfileTemplate()
  $.get(`/users/${parseInt(currentUser)}.json`, function(data) {
    $(".main").append(`
      <div id="editUserDetails">
        <h1 style="font-size:60;">Edit Profile</h1>
        <hr>
        <form class="edit_user" id="edit_user_${data.id}" action="/users" accept-charset="UTF-8" method="post">
          <h2>Name</h2>
          <input type="text" value="${data.name}" name="user[name]" id="user_name">
          <h2>Affiliation</h2>
          <input type="text" value="${data.affiliation}" name="user[affiliation]" id="user_affiliation">
          <h2>Borough</h2>
          <input type="text" value="${data.borough}" name="user[borough]" id="user_borough">
          <h2>Zip Code</h2>
          <input type="number" value="${data.zip_code}" name="user[zip_code]" id="user_zip_code">
          <h2>Profile Picture (optional)</h2>
          <input type="text" value="${data.image_url}" name="user[image_url]" id="user_image_url">
          <input type="submit" name="commit" value="Update User" data-disable-with="Update User">
        </form>
      </div>
    `);
    $("#editUserDetails").animate({"left": "31.5%"}, 10, function() {});
    updateUser();
  })
}

function updateUser() {
  $(".edit_user").on("submit", function(e){
    e.preventDefault();
    debugger
      var values = $(this).serialize();
      let posting = $.ajax({
        type: "PUT",
        url: `/users/${currentUser}`,
        data: values
      });
  });
}

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
