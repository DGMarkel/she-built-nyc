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
