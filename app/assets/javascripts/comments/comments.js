function getRecentComments() {
  $(".main").empty()
  $.get(`/proposals/${navId}/comments.json`, function(data) {
    if (data.length > 3) {
      $("#comments_viewer").replaceWith(`<p><a id="comments_viewer" href="#" onclick="getAllComments(${navId}); return false;">View All Comments</a></p>`);
      let comments = data.length;
      let recentComments = (data.slice(data.length - 3, data.length));
      recentComments.forEach(function(comment) {
        commentTemplate(comment);
      });
      $(".main").prepend(`<hr>`)
      $(".main").prepend(`<span><a href="#" onclick="getAllComments(); return false;">View All Comments</a></span>`)
      $(".main").prepend(`<h1>Recent Comments</h1>`)
      $(".main").prepend(`<span class="backToProposal"><a href="#" onclick="documentReadyCalls(navId); return false;">Back to Proposal</a></span>`)
      $(".main").prepend(`<span class="open" onclick="hideSideNav()">X</span>`);
      showSideNav();
    }else {
      getAllComments();
    }
  });
}

function getAllComments() {
  $(".main").empty()
  $.get(`/proposals/${navId}/comments.json`, function(data) {
    data.forEach(function(comment) {
      commentTemplate(comment)
    });
    $(".main").prepend(`<hr>`)
    $(".main").prepend(`<span><a href="#" onclick="getRecentComments(); return false;">View Recent Comments</a></span>`)
    $(".main").prepend(`<h1>Comments</h1>`)
    $(".main").prepend(`<span class="backToProposal"><a href="#" onclick="documentReadyCalls(); return false;">Back to Proposal</a></span>`)
    $(".main").prepend(`<span class="open" onclick="hideSideNav()">X</span>`);
    showSideNav();
    if (data.length > 3) {
      $("#comments_viewer").replaceWith(`<p><a id="comments_viewer" href="#" onclick="getRecentComments(${navId}); return false;">View Most Recent Comments</a></p>`)
    }
  });
}

function postandInsertComment() {
  $('#new_comment').on("submit", async function(e) {
    e.preventDefault();
    if (this[2]["value"] != "") {
      var values = $(this).serialize();
      let posting = await $.post('/comments', values);
      let comments = await $.get(`/proposals/${navId}/comments.json`, function(data) {
      });
      let newComment = comments.pop();
      getRecentComments(`${navId}`);
      hideCommentForm();
      $("input[type='submit']").removeAttr('disabled');
    } else {
      alert("Comments need content")
      $("[type='submit']").removeAttr("data-disable-with");
    }
  });
}

function commentTemplate(comment) {
  let replyCount = comment["replies"].length
  $(".main").prepend(`<div id="comment-${comment["id"]}">`)
  $(`#comment-${comment["id"]}`).append(`<h4><a href="#" onclick="getOtherUserProfile(${comment['user']['id']}); return false;">${comment["user"]["name"]}</a> - ${comment["created_at"]} </h4>`);
  $(`#comment-${comment["id"]}`).append(`<h4>${comment["content"]}</h4>`);

  // viewable to registered users only
  if (currentUser != "") {
  $(`#comment-${comment["id"]}`).append(`<p id="reply_form_${comment['id']}"><a href="#" onclick="replyForm(${comment['id']});return false;"}">Reply</a></p>`);
  }

  $(`#comment-${comment["id"]}`).append(`<p><a id="replies_viewer_${comment['id']}" href="#" onclick="showCommentReplies(${comment["id"]}, ${replyCount});return false;")>${replyCount} Replies</a></p>`);
  $(`#comment-${comment["id"]}`).append(`</div>`)
  $(`#comment-${comment["id"]}`).append(`<div id="replies_to_comment_${comment['id']}"></div>`)
  $(`#comment-${comment["id"]}`).append(`<hr>`)
  repliesTemplate(comment);
}

// POSSIBLY UNNECESSARY FUNCTION BELOW - may come in handy later?

// function newCommentTemplate(newComment) {
//   $("#comments").prepend(`</div>`)
//   $("#comments").prepend(`<p><a href="/proposals/${navId}/comments/${newComment.id}/replies/new">Reply</a></p>`)
//   $("#comments").prepend(`<h4>${newComment.content}</h4>`)
//   $("#comments").prepend(`<h4><a href="/users/${newComment.user.id}">${newComment.user.name}</a> - ${newComment.created_at} </h4>`);
//   $("#comments").prepend(`<div id="comment-${newComment["id"]}">`)
// }
