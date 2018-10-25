function getOtherUserProfile(otherUserId) {
  $.get(`/users/${otherUserId}.json`, function(data) {
      otherUserProfileTemplate(data);
  })
}

function otherUserProfileTemplate(data) {
  hideSideNav();
  $(".main").empty();
  $(".main").append(`<div id="formWrapper"></div>`);
  $("#formWrapper").append(`<div id="otherUserDetails"></div>`);
  $("#otherUserDetails").append(`<img src="${data.image_url}">`);
  $("#otherUserDetails").append(`<hr>`);
  $("#otherUserDetails").append(`<h1>${data.name}</h1>`);
  $("#otherUserDetails").append(`<hr>`);
  $("#otherUserDetails").append(`<h3>Affiliation: ${data.affiliation} </h3>`);
  $("#otherUserDetails").append(`<h3>Borough: ${data.borough} </h3>`);

  if (`${data.proposal}`) {
    $("#otherUserDetails").append(`<a href="#" onclick="documentReadyCalls(${data.proposal.id}); return false;">
    View ${data.name}'s Proposal</a>`);
  };
}
