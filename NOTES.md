function getProposal() {
  $.get("/proposals/" + navId, function(data) {
    proposal = new Proposal(data);
    proposal.appendDetails();
  }, "json");

}

function Proposal(data) {
  this.name = data["name"]
  this.imageUrl = data.image_url
  this.description = data.description
  this.user = data.user.name
  this.pitch = data.pitch
  this.id = data.id
}

Proposal.prototype.appendDetails = function() {
  $(".main").empty();
  $(".main").append(this.proposalTemplate())
  $("#proposalForms").append(this.proposalForms())
}

Proposal.prototype.proposalTemplate = function () {

  return (
    `<div id="proposalDetails">
      <span class="proposalImage"><img src="${this.imageUrl}"></span>
      <h1 class="proposalName">${this.name}</h1>
      <span class="open" onclick="hideSideNav()">X</span>
      <h3 class="proposalDescription">${this.description}</h3>
      <hr>
      <p>Submitted by: <span class="proposalUser">${this.user}</span></p>
      <h1>Why This Proposal Should Be Accepted</h1>
      <p class="proposalPitch">${this.pitch}</p>
    </div>
    <div id="proposalForms"></div>`
  )
}

Proposal.prototype.proposalForms = function() {
  // div contains site navigation buttons
  // $(".main").append(`<div id="proposalNavigation">`)
  // $("#proposalNavigation").append(`<button class="js-previous" data-id="${navId}">Previous Proposal</button>`);
  //  $("#proposalNavigation").append(`<button class="js-next" data-id="${navId}">Next Proposal</button>`);
  // $(".proposalNavigation").append(`</div>`);

  // div adds ranking and comment forms
  if (currentUser != "") {
    return (
        `<div id="rankingForm">
          <a href="#" onclick="showOrHideRankingForm(); return false"><h1>Rank this proposal</h1></a>
        </div>
        <div id="loggedInProposalComments">
          <h1><a href="#" onclick="getRecentComments(${navId}); return false">View Comments</a></h1></div>
        </div>
        <div id="commentForm">
          <a href="#" onclick="showOrHideCommentForm(); return false"><h1>Submit a Comment</h1></a>
        </div>`
    );
  }

  else {
    return (
      `<div id="proposalComments">
        <h1><a href="#" onclick="getRecentComments(${navId}); return false">View Comments</a></h1>
      </div>`
    );
  };
}

// UNUSED contains site navigation buttons
Proposal.prototype.navbuttons = function() {
  return (
    `<div id="proposalNavigation">
      <button class="js-previous" data-id="${navId}">Previous Proposal</button>
      <button class="js-next" data-id="${navId}">Next Proposal</button>
    </div>`
  );
}


multiple issues with comment replies:
  updated reply count disappears after opening/closing "view replies" link
  new replies are only appended to the DOM if replies are hidden
  "back to proposal" link doesn't work if viewing all comments - only works if viewing recent comments

add next/previous arrows to other user profile cards

need to fix View Nominees link on line 326-333 - commented out for now

Major fix needed for line 264 in index.html:
had to move it here to get my code working
 if (currentUser === "" || parseInt(`<%= current_user.proposal.id %>`) === navId) {

problem with new proposal submit - it updates side and top nav even if a new proposal doesnt save to the db

replace lines 181-207 with this function after the assessment:

function getProposal(navId) {
  $.get("/proposals/" + navId + ".json", function(data) {
    if (data === null) {
      alert("You're at the end of the line, buddy")
    }else {
      $(".proposalName").text(data["name"]);
      $(".proposalImage").html(`<img src="${data["image_url"]}">`)
      $(".proposalDescription").text(data["description"]);
      let user = data["user"]["id"]
      $(".proposalUser").html(`<a href="/users/${data['user']['id']}">${data["user"]["name"]}</a>`);
      $(".proposalPitch").text(data["pitch"])
      // re-set the id to current on the link
      $(".js-next").attr("data-id", data["id"]);
    }
  });
}






New Monuments to Women's History is based on NYC's initiative to build more monuments to women around the city.  My site will list proposed monuments, accept new proposals from the public, allow the public to vote on existing proposals and display other public input.

Proposal
  has many users(votes), through user_proposal?
  attributes: :name, :description, :pitch, :image_url

  if a second proposal is made for the same figure, it will count as a vote for the initial proposal instead of creating a new proposal instance

User
  has_one proposal
  can make one proposal and can only vote once.
  must live in NYC (have to figure out how to validate this through zip code)  
  User's proposal will count as User's vote by default.
  User can change vote at any time.
  can edit proposal until the monument has more than one vote
  attributes: :name, :affiliation, :borough, :zip_code, :comments

User::Admin
  can't vote
  can remove comments
  can remove users
  can edit any proposal

Comments
will build out comment feature later

Root
  Basic description
  Top 3 proposals by vote
  link to proposal index
  login to vote or add a new proposal

Proposal Index
  can be filtered by popularity?
  displays image, name, mini description of each proposal

Proposal Show
  full description of proposal, option to vote for proposal (if logged in)
end
