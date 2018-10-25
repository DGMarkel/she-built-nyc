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
