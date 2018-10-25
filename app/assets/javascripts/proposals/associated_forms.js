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
