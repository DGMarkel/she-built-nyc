function editProposalTemplate() {
  hideCurrentUserProfileTemplate()
  hideSideNav();
  $.get(`/users/${currentUser}.json`, function(data) {
    proposal = data.proposal
    $(".main").append(`
      <div id="editProposalDetails">
        <h1 style="font-size:60;">Edit Proposal</h1>
        <hr>
        <form class="edit_proposal" id="edit_proposal_${proposal.id}" action="/proposals/${proposal.id}" accept-charset="UTF-8" method="post">
          <h2>Name</h2>
          <input type="text" value="${proposal.name}" name="proposal[name]" id="proposal_name"><p></p>
          <h2>Brief Description (75 characters or less)</h2>
          <textarea cols="50" name="proposal[description]" id="proposal_description">${proposal.description}</textarea>
          <h2>Why should she be considered?</h2>
          <textarea cols="50" rows="10" name="proposal[pitch]" id="proposal_pitch">${proposal.pitch}</textarea>
          <h2>Historical Image</h2>
          <textarea cols="50" name="proposal[image_url]" id="proposal_image_url">${proposal.image_url}</textarea>
          <input type="submit" name="commit" value="Update Proposal" data-disable-with="Update Proposal">
        </form>
      </div>
    `);
    $("#editProposalDetails").animate({"right": "-33%"}, 10, function() {});
    editProposal(proposal.id)
  })
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
