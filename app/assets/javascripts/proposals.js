function documentReadyCalls(proposalId) {
  navId = proposalId
  proposalTemplate(navId);
  // add next proposal details to DOM
  getProposal(navId);
  // associate ranking and comment forms with the correct proposal
  ProposalFormIds(navId);
  // add proposal comments to the DOM for current proposal
  addRanking();
  // displays ranking and comments forms for current proposal UNLESS it is the current user's proposal
  showProposalForms(navId);
  proposalNavigation();
  postandInsertComment();
  showSideNav();
}

function editProposal(proposalId) {
  $(".edit_proposal").on("submit", function(e) {
    e.preventDefault();
    var values = $(this).serialize();
    let posting = $.ajax({
      type: "PUT",
      url: `/proposals/${proposalId}`,
      data: values
    });
    documentReadyCalls(proposalId)
  });
}


function indexTemplate() {
  $(".main").empty();
  $(".main").append(`<h1 id="proposalIndexHeader">Nominees</h1>`);
  $(".main").append(`<hr style="border-top:1px solid black;">`);
  $(".main").append(`<div id="proposalIndex"></div>`);
  getProposalsForIndex();
  hideSideNav();
}

function getProposalsForIndex() {
  $.get("/proposals.json", function (data) {
    data.forEach(function(proposal) {
      indexProposalTemplate(proposal)
    });
  });
}

function indexProposalTemplate(proposal) {
  $("#proposalIndex").append(`<div id="proposal-${proposal.id}">`);
  $(`#proposal-${proposal.id}`).append(`<img src="${proposal.image_url}">`);
  $(`#proposal-${proposal.id}`).append(`<h1 id="name"><a class="proposalLink" href="#" onclick="documentReadyCalls(${proposal.id}); return false">${proposal.name}</a></h1>`);
  $(`#proposal-${proposal.id}`).append(`<h1 id="description">${proposal.description}</h1>`);
  $(`#proposal-${proposal.id}`).append(`</div>`);
  $(`#proposalIndex`).append(`<hr>`);
}

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

function ProposalFormIds() {
  if($("#comment_proposal")[0] && $("#ranking_proposal")[0]) {
    $("#comment_proposal")[0]["value"] = navId;
    $("#ranking_proposal")[0]["value"] = navId;
  };
}

function showProposalForms() {
  $.get(`/proposals/${navId}.json`, function(data) {
      if (data["user"]["id"].toString() != currentUser) {
        $("#proposalForms").show();
        $("proposalNavigation").next().show()
      } else {
        $("#proposalForms").hide();
      }
  });
}

function newProposalTemplate() {
  hideSideNav();
  hideTopNav();
  hideCurrentUserProfileTemplate()
  $(".main").append(`<form class="new_proposal" id="new_proposal" action="/proposals" accept-charset="UTF-8" method="post">`);
  $('.new_proposal').append(`<h2>Name</h2>`);
  $('.new_proposal').append(`<input type="text" name="proposal[name]" id="proposal_name"></p>`);
  $('.new_proposal').append(`<h2>Brief Description (75 characters or less)</h2>`);
  $('.new_proposal').append(`<textarea cols="50" name="proposal[description]" id="proposal_description"></textarea></p>`);
  $('.new_proposal').append(`<h2>Why should she be considered?</h2>`);
  $('.new_proposal').append(`<textarea cols="50" rows="10" name="proposal[pitch]" id="proposal_pitch"></textarea></p>`);
  $('.new_proposal').append(`<h2>Historical Image</h2>`);
  $('.new_proposal').append(`<textarea cols="50" name="proposal[image_url]" id="proposal_image_url"></textarea></p>`);
  $('.new_proposal').append(`<input type="submit" name="commit" value="Create Proposal" data-disable-with="Create Proposal">`);
  $('.new_proposal').append(`</form>`);
  $(".new_proposal").animate({"right": "-33%"}, 10, function() {});
  postNewProposal();
}


function postNewProposal() {
  $(".new_proposal").on("submit", async function(e){
    e.preventDefault();
    var values = $(this).serialize();
    let posting = await $.ajax({
      type: "POST",
      url: '/proposals/',
      data: values
    });
    let proposals = await $.get(`/proposals.json`, function(data) {
    });
    newProposal = proposals.pop()
    updateSideNav(newProposal.id, newProposal.name)
    updateTopNav()
    documentReadyCalls(newProposal.id)
  });
}

function updateTopNav() {
  $("#submitProposalLink").replaceWith(`<a href="#" onclick="editProposalTemplate(); return false;">Edit Proposal</a>`);
}

function updateSideNav(newProposalId, newProposalName) {
  $(".sidenav").append(`<h3><a class="proposalLink"><a href="#" onclick="documentReadyCalls(${newProposalId}); return false">${newProposalName}</a></h3>`);
}
