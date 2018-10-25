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
