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
