function signUpTemplate() {
  $(".main").empty();
  hideSideNav();
  $(".main").append(`<div id="formWrapper"></div>`)
  $("#formWrapper").append(`<div id="userForm"></div>`)
  $("#userForm").append(`<h1>Sign Up</h1>`)
  $("#userForm").append(`<hr>`)
  $("#userForm").append(`<form class="new_user" id="new_user" action="post"></form>`);
  $(".new_user").append(`<h2>Email</h2>`)
  $(".new_user").append(`<p><input type="text" name="user[email]" id="user_email"></p>`)
  $(".new_user").append(`<h2>Password</h2>`)
  $(".new_user").append(`<p><input type="password" name="user[password]" id="user_password"></p>`)
  $(".new_user").append(`<p><input type="submit" name="commit" value="Create User" data-disable-with="Create User"></p>`)
  $(".new_user").append(`<h2><a href="/users/auth/facebook">Sign up with Facebook"</a></h2>`)
  postNewUser();
}

function postNewUser() {
  $(".new_user").on("submit", async function(e){
    e.preventDefault();
    var values = $(this).serialize();
    let posting = await $.ajax({
      type: "POST",
      url: '/users/',
      data: values
    });
    let users = await $.get(`/users.json`, function(data) {
    });
    if (users.pop) {
      newUser = users.pop()
      currentUser = newUser.id
    } else {
      alert("Let's try that again.")
      $('[type="submit"]').removeAttr("disabled");
    }
  });
}
