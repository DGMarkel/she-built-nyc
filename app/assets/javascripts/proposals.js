<script type="text/javascript" charset="utf-8">

$(function () {
  let navId;
  $(".js-next").on("click", function() {
    // set id for next proposal
    navId = (parseInt($(".js-next").attr("data-id")) + 1).toString();
    documentReadyCalls(navId);
  });
  $(".js-previous").on("click", function() {
    // set id for next proposal
    navId = (parseInt($(".js-next").attr("data-id")) - 1).toString();
    documentReadyCalls(navId);
  });
});

function documentReadyCalls(navId) {
  setFormIds(navId);
  // add next proposal details to DOM
  getProposals(navId);
  // add proposal comments to the DOM for current proposal
  getComments(navId);
  // add current user's comments to the DOM for current proposal
  addComment(navId);
  // allows current user to vote on proposal if they haven't already voted
  addRanking();
  // displays ranking and comments forms for current proposal UNLESS it is the current user's proposal
  showForm(navId);
}

function addComment(navId) {
  $('#new_comment').on("submit", function(e) {
    var values = $(this).serialize();
    var posting = $.post('/comments', values);
    e.preventDefault();
    $.get(`/proposals/${navId}/comments.json`, function(data) {
      newComment = data[data.length-1]
      $("#recentComments").prepend(`<p><a href="/proposals/${navId}/comments/${newComment.id}/replies/new">Reply</a></p>`)
      $("#recentComments").prepend(`<h4>${newComment.content}</h4>`)
      $("#recentComments").prepend(`<h4><a href="/users/${newComment.user.id}">${newComment.user.name}</a> - ${newComment.created_at} </h4>`)
    });
  });
}

async function checkForUserRanking() {
  let currentUser = $("#badIdea")[0]["value"]
  let currentProposal = $("#ranking_proposal")[0]["value"]
  let res = await fetch('/rankings.json')
  let foundData = await res.json()
  let ranking = foundData.find(function(ranking) {
     return ranking["user"]["id"].toString() === currentUser && ranking["proposal"]["id"].toString() === currentProposal
   })

   if (ranking) {
     return ranking.user
   } else {
     return "not found"
   }
}

function addRanking() {
  $('#new_ranking').on("submit", function() {
    checkForUserRanking().then(res => {
      if (res === "not found") {
        var values = $(this).serialize();
        var posting = $.post('/rankings', values);
      }
      else {
        alert("You've already voted on this proposal");
      }
    });
  });
}

function setFormIds(navId) {
  if($("#comment_proposal")[0] && $("#ranking_proposal")[0]) {
    $("#comment_proposal")[0]["value"] = navId;
    $("#ranking_proposal")[0]["value"] = navId;
  };
}

function showForm(navId) {

  $.get("/proposals/" + navId + ".json", function(data) {
      let currentUser = $("#badIdea")[0]["value"]
      if (data["user"]["id"].toString() != currentUser) {
        $("#proposalForms").show();
      } else {
        $("#proposalForms").hide();
      }

  });

}


function getProposals(navId) {
  $.get("/proposals/" + navId + ".json", function(data) {
    $(".proposalName").text(data["name"]);
    $(".proposalImage").html(`<img src="${data["image_url"]}">`)
    $(".proposalDescription").text(data["description"]);
    let user = data["user"]["id"]
    $(".proposalUser").html(`<a href="/users/${data['user']['id']}">${data["user"]["name"]}</a>`);
    $(".proposalPitch").text(data["pitch"])
    // re-set the id to current on the link
    $(".js-next").attr("data-id", data["id"]);
  });
}

function getComments(navId) {
  $.get(`/proposals/${navId}/comments.json`, function(data) {
    $("#recentComments").empty()
    data.forEach(function(comment) {
      $("#recentComments").prepend(`<p><a href="/proposals/${navId}/comments/${comment['id']}/replies/new">Reply</a></p>`);
      $("#recentComments").prepend(`<h4>${comment["content"]}</h4>`);
      $("#recentComments").prepend(`<h4><a href="/users/${comment['user']['id']}">${comment["user"]["name"]}</a> - ${comment["created_at"]} </h4>`);
      repliesTemplate(comment)
    });
  });
}

function repliesTemplate(comment) {
  $("#recentComments").append(`<div id="comment-${comment.id}-replies">`);
  comment.replies.forEach(function(reply) {
    $("#recentComments").append('<hr>')
    $("#recentComments").append(`<h4 style="position:relative;left:50px;"><a href="/users/${reply['user']['id']}">${reply["user"]["name"]}</a> - ${reply["created_at"]} </h4>`);
    $("#recentComments").append(`<h4 style="position:relative;left:50px;">${reply["content"]}</h4>`);
  });
  $("#recentComments").append(`<div>`);
}
</script>
