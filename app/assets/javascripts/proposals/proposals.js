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
