function replyForm(comment) {
  $(`#reply_form_${comment}`).append(`
    <form id="new_reply" action="/proposals/comment_id/comments/proposal_id/replies" accept-charset="UTF-8" method="post">
      <input type="text" name="reply[content]" id="reply_content">
      <input value="" type="hidden" name="reply[proposal]" id="reply_proposal">
      <input value="" type="hidden" name="reply[comment]" id="reply_comment">
      <input type="submit" name="commit" value="Save Reply" data-disable-with="Save Reply">
    </form>
    `);
  setReplyFormIds(comment)
  postandInsertReply(comment);
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
