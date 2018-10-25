function profileOrHomeTemplate() {
  currentUser = `<%= current_user.id if current_user %>`
  if (currentUser === ``) {
    homeTemplate();
  } else {
    currentUserProfileTemplate();
  }
}

function homeTemplate() {
  $(".main").empty();
  $(".main").append(`
    <h1 id="join">join our drive to build new public monuments dedicated to women’s history in NYC.</h1>
    <div class="background">
      <img class="top" src="https://www.lovehappensmag.com/blog/wp-content/uploads/2017/10/Gertrude-Vanderbilt-Whitney-at-Her-Greenwich-Village-Studio-768x501.jpg">
      <div id="welcomeContent">
        <div>
          <h1>
            this is an open call for proposal submissions
          </h1>
          <button href="#" onclick="signUpTemplate();$(window).scrollTop(0)">get started</button><br>
          <button href="#" onclick="loginDropDown();return false">log in</button>
       </div>
       <div id="login" style="position:relative;top:0;left:-55px;width:30.5%;"></div>
      </div>
    </div>
  `);
  hideSideNav();
}


function loginDropDown() {
  $("#login").append('<%= j render "/sessions/login" %>');
  $("#login").css({
    "position":"relative",
    "top":"-20px"
  })
  $("#loginForm input").css({
    "height":"43px",
    "background-color": "rgba(255,255,255,0)",
    "border":"1px solid #3bb9ff",
    "border-radius":"5px",
    "font-size":"25px"
  });
  $("#loginForm input[type='submit']").css({
    "height":"40px",
    "border": "1px solid orange",
    "color":"white",
    "cursor":"pointer"
  });
  $("#loginForm a").css({
    "position": "relative",
    "left":"100px",
    "color":"white",
    "text-decoration":"none"
  })
  $("[type='submit']").removeAttr("data-disable-with");
}

// function topThreeProposalDisplay() {
//   $(".topThreeImages div").hover(
//     function() {
//       $(this).css({
//         "transition": "0.5s",
//         "opacity": "0.2",
//       });
//     },
//     function() {
//       $(this).css({
//         "opacity": "1",
//         "border": "0"
//       })
//     });
// }
