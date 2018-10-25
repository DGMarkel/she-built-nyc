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
