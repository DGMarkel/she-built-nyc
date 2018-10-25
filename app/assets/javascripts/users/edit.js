function editProfileTemplate() {
  hideSideNav();
  hideCurrentUserProfileTemplate()
  $.get(`/users/${parseInt(currentUser)}.json`, function(data) {
    $(".main").append(`
      <div id="editUserDetails">
        <h1 style="font-size:60;">Edit Profile</h1>
        <hr>
        <form class="edit_user" id="edit_user_${data.id}" action="/users" accept-charset="UTF-8" method="post">
          <h2>Name</h2>
          <input type="text" value="${data.name}" name="user[name]" id="user_name">
          <h2>Affiliation</h2>
          <input type="text" value="${data.affiliation}" name="user[affiliation]" id="user_affiliation">
          <h2>Borough</h2>
          <input type="text" value="${data.borough}" name="user[borough]" id="user_borough">
          <h2>Zip Code</h2>
          <input type="number" value="${data.zip_code}" name="user[zip_code]" id="user_zip_code">
          <h2>Profile Picture (optional)</h2>
          <input type="text" value="${data.image_url}" name="user[image_url]" id="user_image_url">
          <input type="submit" name="commit" value="Update User" data-disable-with="Update User">
        </form>
      </div>
    `);
    $("#editUserDetails").animate({"left": "31.5%"}, 10, function() {});
    updateUser();
  })
}

function updateUser() {
  $(".edit_user").on("submit", function(e){
    e.preventDefault();
    debugger
      var values = $(this).serialize();
      let posting = $.ajax({
        type: "PUT",
        url: `/users/${currentUser}`,
        data: values
      });
  });
}
