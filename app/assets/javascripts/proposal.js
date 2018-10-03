// var navId = null
//
// $(function () {
//   $(".proposalLink").on("click", function(e) {
//     e.preventDefault();
//     navId = this.id
//     proposalTemplate(navId);
//     documentReadyCalls(navId);
//     proposalNavigation();
//     postandInsertComment();
//     showNav()
//   })
// });
//
// function documentReadyCalls(navId) {
//   // add next proposal details to DOM
//   getProposal(navId);
//   // associate ranking and comment forms with the correct proposal
//   ProposalFormIds(navId);
//   // add proposal comments to the DOM for current proposal
//   getRecentComments(navId);
//   // allows current user to vote on proposal if they haven't already voted
//   addRanking();
//   // displays ranking and comments forms for current proposal UNLESS it is the current user's proposal
//   showProposalForms(navId);
// }
//
// // proposal functions
//
// function getAllProposals() {
//   $('#welcome').empty();
//   $("#nominees").append(`<h1 style="font-size:60px;margin-bottom:10px;">Nominees</h1>`);
//   $("#nominees").append(`<hr style="border-top:1px solid black;">`);
//   $("#nominees").append(`<ul>`);
//   $.get(`/proposals.json`, function(data) {
//     data.forEach(function(proposal) {
//       $("#nominees").append(`<div id="proposal_${proposal.id}" style="height:250px;margin-top:20px">`);
//       $("#nominees").append(`<img src="${proposal.image_url}" style="float:left;height:50px;margin-right:20px;">`);
//       $("#nominees").append(`<h1 class="proposalLink" id="${proposal.id}> href="#" onclick="showPageSetUpCalls()">${proposal.name}</a><br>${proposal.description}</h1>`);
//       $("#nominees").append(`</div>`);
//
//     })
//   });
//   $("#nominees").append(`</ul>`);
// }
//
// function getProposal(navId) {
//   $.get("/proposals/" + navId + ".json", function(data) {
//     $(".proposalName").text(data["name"]);
//     $(".proposalImage").html(`<img src="${data["image_url"]}" style="width:35%;height:auto;float:left;margin: 20px 20px 20px 0;">`)
//     $(".proposalDescription").text(data["description"]);
//     let user = data["user"]["id"]
//     $(".proposalUser").html(`<a href="/users/${data['user']['id']}">${data["user"]["name"]}</a>`);
//     $(".proposalPitch").text(data["pitch"])
//     // re-set the id to current on the link
//     $(".js-next").attr("data-id", data["id"]);
//   });
// }
//
// function proposalTemplate(navId) {
//   $(".main").empty();
//   $(".main").append(`<div class="proposalImage"></div>`);
//   $(".main").append(`<h1 class="proposalName"></h1>`);
//   $(".main").append(`<h3 class="proposalDescription"></h3>`);
//   $(".main").append(`<hr>`);
//   $(".main").append(`<p>Submitted by: <span class="proposalUser"></span></p>`);
//   $(".main").append(`<h1>Why This Proposal Should Be Accepted</h1>`)
//   $(".main").append(`<p class="proposalPitch"></p>`);
//   $(".main").append(`<button class="js-next" data-id="${navId}">Next Proposal</button>`);
//   $(".main").append(`<button class="js-previous" data-id="${navId}">Previous Proposal</button>`);
//   // add ranking and comment forms
//   $(".main").append("<%= j render 'logged_in_show' %>");
//   $(".main").append(`<h1>Recent Comments:</h1>`);
//   $(".main").append(`<p><a id="comments_viewer" href="#" onclick="getAllComments(${navId}); return false;">View All Comments</a></p>`);
//   $(".main").append(`<div id="comments"></div>`);
//   $(".main").append(`.mySidenav`)
// }
//
// function proposalNavigation(){
//   $(".js-next").on("click", function() {
//     // set id for next proposal
//     navId = (parseInt($(".js-next").attr("data-id")) + 1).toString();
//     documentReadyCalls(navId);
//   });
//   $(".js-previous").on("click", function() {
//     // set id for previous proposal
//     navId = (parseInt($(".js-next").attr("data-id")) - 1).toString();
//     documentReadyCalls(navId);
//   });
// }
//
// function ProposalFormIds(navId) {
//   if($("#comment_proposal")[0] && $("#ranking_proposal")[0]) {
//     $("#comment_proposal")[0]["value"] = navId;
//     $("#ranking_proposal")[0]["value"] = navId;
//   };
// }
//
// function showProposalForms(navId) {
//   $.get("/proposals/" + navId + ".json", function(data) {
//       let currentUser = $("#badIdea")[0]["value"]
//       if (data["user"]["id"].toString() != currentUser) {
//         $("#proposalForms").show();
//       } else {
//         $("#proposalForms").hide();
//       }
//   });
// }
//
// // comment functions
//
// function getRecentComments(navId) {
//   $("#comments").empty()
//   $.get(`/proposals/${navId}/comments.json`, function(data) {
//     if (data.length > 3) {
//       $("#comments_viewer").replaceWith(`<p><a id="comments_viewer" href="#" onclick="getAllComments(${navId}); return false;">View All Comments</a></p>`);
//       let comments = data.length;
//       let recentComments = (data.slice(data.length - 3, data.length));
//       recentComments.forEach(function(comment) {
//         commentTemplate(comment);
//       });
//     }else {
//       getAllComments(navId);
//     }
//   });
// }
//
// function getAllComments(navId) {
//   $.get(`/proposals/${navId}/comments.json`, function(data) {
//     $("#comments").empty()
//     data.forEach(function(comment) {
//       commentTemplate(comment)
//     });
//     if (data.length > 3) {
//       $("#comments_viewer").replaceWith(`<p><a id="comments_viewer" href="#" onclick="getRecentComments(${navId}); return false;">View Most Recent Comments</a></p>`)
//     }
//   });
// }
//
// function postandInsertComment() {
//   $('#new_comment').on("submit", async function(e) {
//     e.preventDefault();
//     var values = $(this).serialize();
//     let posting = await $.post('/comments', values);
//     let comments = await $.get(`/proposals/${navId}/comments.json`, function(data) {
//     });
//     let newComment = comments.pop();
//     newCommentTemplate(newComment);
//     $("input[type='submit']").removeAttr('disabled');
//   });
// }
//
// function commentTemplate(comment) {
//   let replyCount = comment["replies"].length
//   $("#comments").prepend(`<div id="comment-${comment["id"]}">`)
//   $(`#comment-${comment["id"]}`).append(`<h4><a href="/users/${comment['user']['id']}">${comment["user"]["name"]}</a> - ${comment["created_at"]} </h4>`);
//   $(`#comment-${comment["id"]}`).append(`<h4>${comment["content"]}</h4>`);
//   $(`#comment-${comment["id"]}`).append(`<p id="reply_form_${comment['id']}"><a href="#" onclick="replyForm(${comment['id']});return false;"}/replies/new">Reply</a></p>`);
//   $(`#comment-${comment["id"]}`).append(`<p><a id="replies_viewer_${comment['id']}" href="#" onclick="showCommentReplies(${comment["id"]}, ${replyCount});return false;")>${replyCount} Replies</a></p>`);
//   $(`#comment-${comment["id"]}`).append(`</div>`)
//   $(`#comment-${comment["id"]}`).append(`<div id="replies_to_comment_${comment['id']}"></div>`)
//   repliesTemplate(comment);
// }
//
// function newCommentTemplate(newComment) {
//   $("#comments").prepend(`</div>`)
//   $("#comments").prepend(`<p><a href="/proposals/${navId}/comments/${newComment.id}/replies/new">Reply</a></p>`)
//   $("#comments").prepend(`<h4>${newComment.content}</h4>`)
//   $("#comments").prepend(`<h4><a href="/users/${newComment.user.id}">${newComment.user.name}</a> - ${newComment.created_at} </h4>`);
//   $("#comments").prepend(`<div id="comment-${newComment["id"]}">`)
// }
//
// //reply functions
//
// function repliesTemplate(comment) {
//   comment.replies.forEach(function(reply) {
//     $(`#replies_to_comment_${comment["id"]}`).append('<hr>')
//
//     $(`#replies_to_comment_${comment["id"]}`).append(`<h4 style="position:relative;left:50px;"><a href="/users/${reply['user']['id']}">${reply["user"]["name"]}</a> - ${reply["created_at"]} </h4>`);
//     $(`#replies_to_comment_${comment["id"]}`).append(`<h4 style="position:relative;left:50px;">${reply["content"]}</h4>`);
//   });
//   $(`#replies_to_comment_${comment["id"]}`).append('<hr>')
//   $('[id*="replies_to_comment"]').hide()
// }
//
// function postandInsertReply(comment) {
//   $('#new_reply').on("submit", async function(e) {
//     e.preventDefault();
//   var values = $(this).serialize();
//   let posting = await $.post('/replies', values);
//   let replies = await $.get(`/proposals/${navId}/comments/${comment}.json`)
//   let newReply = replies["replies"].pop();
//   $('#new_reply').remove();
//   newReplyTemplate(newReply, comment);
//   });
// }
//
// function newReplyTemplate(newReply, comment) {
//   $(`#replies_to_comment_${comment}`).append('<hr>')
//   $(`#replies_to_comment_${comment}`).append(`<h4 style="position:relative;left:50px;"><a href="/users/${newReply['user']['id']}">${newReply["user"]["name"]}</a> - ${newReply["created_at"]} </h4>`);
//   $(`#replies_to_comment_${comment}`).append(`<h4 style="position:relative;left:50px;">${newReply["content"]}</h4>`);
// }
//
// function replyForm(comment) {
//   $(`#reply_form_${comment}`).append(`<%= j render partial: "/replies/form" %>`);
//   setReplyFormIds(comment)
//   postandInsertReply(comment);
// }
//
// function setReplyFormIds(comment) {
//   $("#reply_proposal")[0]["value"] = navId;
//   $("#reply_comment")[0]["value"] = `${comment}`;
// }
//
// function showCommentReplies(commentId, replyCount) {
//   $(`#replies_to_comment_${commentId}`).show()
//   $(`#replies_viewer_${commentId}`).replaceWith(`<p><a id="replies_viewer_${commentId}" href="#" onclick="hideCommentReplies(${commentId}, ${replyCount});return false;")>Hide Replies</a></p>`);
// }
//
// function hideCommentReplies(commentId, replyCount) {
//   $(`#replies_to_comment_${commentId}`).hide()
//   $(`#replies_viewer_${commentId}`).replaceWith(`<p><a id="replies_viewer_${commentId}" href="#" onclick="showCommentReplies(${commentId}, ${replyCount});return false;")>${replyCount} Replies</a></p>`);
// }
//
// //ranking functions
//
// async function checkForUserRanking() {
//   let currentUser = $("#badIdea")[0]["value"]
//   let currentProposal = $("#ranking_proposal")[0]["value"]
//   let res = await fetch('/rankings.json')
//   let foundData = await res.json()
//   let ranking = foundData.find(function(ranking) {
//      return ranking["user"]["id"].toString() === currentUser && ranking["proposal"]["id"].toString() === currentProposal
//    })
//
//    if (ranking) {
//      return ranking.user
//    } else {
//      return "not found"
//    }
// }
//
// function addRanking() {
//   $('#new_ranking').on("submit", function() {
//     checkForUserRanking().then(res => {
//       if (res === "not found") {
//         var values = $(this).serialize();
//         var posting = $.post('/rankings', values);
//       }
//       else {
//         alert("You've already voted on this proposal");
//       }
//     });
//   });
// }
//
// function showNav() {
//   $("#mySidenav").css("width", "25%");
//   $(".main").css("width", "75%")
// }
//
// function hideNav() {
//   $("#mySidenav").css("width", "0");
//   $(".main").css("width", "100%");
//
// }
