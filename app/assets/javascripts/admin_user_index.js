function userIndexTemplate() {
  $(".main").empty();
  $.get(`/users.json`, function(data) {
    if (data[0].id === parseInt(currentUser)) {
      $(".main").append(`
        <div style="margin:20px 50px">
          <h1 style="font-size:60px;margin-bottom:10px;">Users Index - For Admin Only</h1>
          <hr style="border-top:1px solid black;">
          <ul>
      `);
      data.forEach(function(user) {
        userDetailsForIndex(user)
      });
      $(".main").append(`
      </ul>
      </div>
      `);
    }
  });
}

function userDetailsForIndex(user) {
  $(".main").append(`
    <div style="height:150px;margin-top:20px;margin-left:100px;">
      <img src="${user.image_url}" style="float:left;height:90%;margin-right:20px;">
      <h1><a href="#" onclick="getOtherUserProfile(${user.id}); return false;">${user.name}</a></h1>
      <h3>Joined ${user.created_at}</h3>
    </div>
      <hr style="border-top:1px solid black;margin-left:100px;">
  `);
}
