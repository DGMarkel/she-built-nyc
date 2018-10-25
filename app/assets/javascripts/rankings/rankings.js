
async function checkForUserRanking() {
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
