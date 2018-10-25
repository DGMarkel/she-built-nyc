function loginTemplate() {
  hideSideNav();
  $("#topNavMenu").replaceWith(`
    <form id="loginForm" action="/sessions" method="post">
      <p><input placeholder="Username" type="text" name="user[name]" id="user_name"></p>
      <p><input id="password" placeholder="Password" type="password" name="user[password]">
      <p><input type="submit" name="commit" value="Sign In"></p>
      <p><a href=\"/users/auth/facebook\">Sign in with Facebook</a></p>
    </form>
    `);
    postUser();
}

function postUser() {
  getUsersArray();
  $("#loginForm").on("submit", function(e){
    e.preventDefault();
    if ($("#user_name").val() && $("#password").val()) {
      var values = $(this).serialize();
      let posting = $.ajax({
        type: "POST",
        url: '/sessions/',
        data: values,
        success: function(result) {
          currentUser = getUserId($("#user_name").val())
        }
      });
    }
    else {
      alert("Both fields need to be filled.");
    }
  });

}

function getUsersArray() {
  $.get('/users.json', function(data) {
    data.forEach(user => usersArray.push(user))
  });
}

function getUserId(username) {
  return usersArray.find(user => user.name === username).id.toString();
}
