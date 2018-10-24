function repliesTemplate(comment) {
  comment.replies.forEach(function(reply) {
    $(`#replies_to_comment_${comment["id"]}`).append('<hr>')

    $(`#replies_to_comment_${comment["id"]}`).append(`<h4><a href="/users/${reply['user']['id']}">${reply["user"]["name"]}</a> - ${reply["created_at"]} </h4>`);
    $(`#replies_to_comment_${comment["id"]}`).append(`<h4>${reply["content"]}</h4>`);
  });
  $(`#replies_to_comment_${comment["id"]}`).append('<hr>')
  $('[id*="replies_to_comment"]').hide()
}

function postandInsertReply(comment) {
  $('#new_reply').on("submit", async function(e) {
    e.preventDefault();
    var values = $(this).serialize();
    let posting = await $.post('/replies', values);
    let replies = await $.get(`/proposals/${navId}/comments/${comment}.json`)
    let newReply = replies["replies"].pop();
    $('#new_reply').remove();
    updateReplyCount(comment);
    newReplyTemplate(newReply, comment);
  });
}

function updateReplyCount(comment) {
  newReplyCount = parseInt($(`#replies_viewer_${comment}`)[0].text.match(/\d+/)[0]) + 1
  $(`#replies_viewer_${comment}`)[0].text = `${newReplyCount} Replies`
}

function newReplyTemplate(newReply, comment) {
  $(`#replies_to_comment_${comment}`).append(`<h4><a href="/users/${newReply['user']['id']}">${newReply["user"]["name"]}</a> - ${newReply["created_at"]} </h4>`);
  $(`#replies_to_comment_${comment}`).append(`<h4>${newReply["content"]}</h4>`);
  $(`#replies_to_comment_${comment}`).append('<hr>')
}

function setReplyFormIds(comment) {
  $("#reply_proposal")[0]["value"] = navId;
  $("#reply_comment")[0]["value"] = `${comment}`;
}

function showCommentReplies(commentId, replyCount) {
  $(`#replies_to_comment_${commentId}`).show()
  $(`#replies_viewer_${commentId}`).replaceWith(`<p><a id="replies_viewer_${commentId}" href="#" onclick="hideCommentReplies(${commentId}, ${replyCount});return false;")>Hide Replies</a></p>`);
}

function hideCommentReplies(commentId, replyCount) {
  $(`#replies_to_comment_${commentId}`).hide()
  $(`#replies_viewer_${commentId}`).replaceWith(`<p><a id="replies_viewer_${commentId}" href="#" onclick="showCommentReplies(${commentId}, ${replyCount});return false;")>${replyCount} Replies</a></p>`);
}
