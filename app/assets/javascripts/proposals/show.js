function getProposal() {
  $.get("/proposals/" + navId, function(data) {
    proposal = new Proposal();
    proposal.appendData(data);
  }, "json");

}

function Proposal() {
  this.appendData = function(data) {
    $(".proposalName").text(data["name"]);
    $(".proposalImage").html(`<img src="${data["image_url"]}">`)
    $(".proposalDescription").text(data["description"]);
    let user = data["user"]["id"]
    $(".proposalUser").html(`<a href="#" onclick="getOtherUserProfile(${user}); return false;">${data["user"]["name"]}</a>`);
    $(".proposalPitch").text(data["pitch"])
    // re-set the id to current on the link
    $(".js-next").attr("data-id", data["id"]);
  }
}

function proposalTemplate() {

  $(".main").empty();

  //div contains all proposal details
  $(".main").append(`<div id="proposalDetails">`)
  $("#proposalDetails").append(`<span class="proposalImage"></span>`);
  $("#proposalDetails").append(`<h1 class="proposalName"></h1>`);
  $("#proposalDetails").append(`<span class="open" onclick="hideSideNav()">X</span>`);
  $("#proposalDetails").append(`<h3 class="proposalDescription"></h3>`);
  $("#proposalDetails").append(`<hr>`);
  $("#proposalDetails").append(`<p>Submitted by: <span class="proposalUser"></span></p>`);
  $("#proposalDetails").append(`<h1>Why This Proposal Should Be Accepted</h1>`)
  $("#proposalDetails").append(`<p class="proposalPitch"></p>`);
  $(".proposalDetails").append(`</div>`)

  // div contains site navigation buttons
  // $(".main").append(`<div id="proposalNavigation">`)
  // $("#proposalNavigation").append(`<button class="js-previous" data-id="${navId}">Previous Proposal</button>`);
  //  $("#proposalNavigation").append(`<button class="js-next" data-id="${navId}">Next Proposal</button>`);
  // $(".proposalNavigation").append(`</div>`);

  // div adds ranking and comment forms
  $(".main").append(`<div id="proposalForms"></div>`);

  if (currentUser != "") {
    $("#proposalForms").append(`<div id="rankingForm"></div>`);
    $("#rankingForm").append(`<a href="#" onclick="showOrHideRankingForm(); return false"><h1>Rank this proposal</h1></a>`);
    $("#proposalForms").append(`<div id="loggedInProposalComments"></div>`);
    $("#loggedInProposalComments").append(`<h1><a href="#" onclick="getRecentComments(${navId}); return false">View Comments</a></h1></div>`)
    $("#proposalForms").append(`<div id="commentForm"></div>`);
    $("#commentForm").append(`<a href="#" onclick="showOrHideCommentForm(); return false"><h1>Submit a Comment</h1></a>`)
  }

  else {
  // // div for comments
    $(".main").append(`<hr>`)
    $(".main").append(`<div id="proposalComments">`);
    $("#proposalComments").append(`<h1><a href="#" onclick="getRecentComments(${navId}); return false">View Comments</a></h1>`);
    $("#proposalComments").append(`<div id="comments"></div>`);
    $(".main").append(`</div>`);
  }
}
