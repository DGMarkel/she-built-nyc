function repliesTemplate(comment) {
  comment.replies.forEach(function(reply) {
    $(`#replies_to_comment_${comment["id"]}`).append('<hr>')
    $(`#replies_to_comment_${comment["id"]}`).append(`<h4><a href="/users/${reply['user']['id']}">${reply["user"]["name"]}</a> - ${reply["created_at"]} </h4>`);
    $(`#replies_to_comment_${comment["id"]}`).append(`<h4>${reply["content"]}</h4>`);
  });
  $(`#replies_to_comment_${comment["id"]}`).append('<hr>')
  $('[id*="replies_to_comment"]').hide()
}

function showCommentReplies(commentId, replyCount) {
  $(`#replies_to_comment_${commentId}`).show()
  $(`#replies_viewer_${commentId}`).replaceWith(`<p><a id="replies_viewer_${commentId}" href="#" onclick="hideCommentReplies(${commentId}, ${replyCount});return false;")>Hide Replies</a></p>`);
}

function hideCommentReplies(commentId, replyCount) {
  $(`#replies_to_comment_${commentId}`).hide()
  $(`#replies_viewer_${commentId}`).replaceWith(`<p><a id="replies_viewer_${commentId}" href="#" onclick="showCommentReplies(${commentId}, ${replyCount});return false;")>${replyCount} Replies</a></p>`);
}
