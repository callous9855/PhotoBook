

//start add group
function addGroup(group){
  var row = '';

};
// end add group

// start document
$(document).ready(function(){

	//3.1 start add group
  $('#').click(function (e){
    e.preventDefault();
    var form = $('#').serialize();

    $.ajax({
      url: '/groups/create',
      method: 'POST',
      dataType: 'json',
      data: form,

    }).done(function (data){
      
      // reload
      // getGroupList();

    }).fail(function (error, group) {
      console.log(error.message); 
    
      // json group object 
      console.log(group);
    });
  });
  // end add group

  //3.2.1 start search user
  $('#us_find_btn').click(function (e){
    e.preventDefault();
    var form = $('#').serialize();

    $.ajax({
      url: '/findUser',
      method: 'POST',
      dataType: 'json',
      data: form,

    }).done(function (data){
      

    }).fail(function (error, username, found) {
      console.log(error.message); 
      console.log(found);
      // json username object 
      console.log(username);
    });
  });
  // end search user

  //3.2.2 start add user
  $('#us_add_btn').click(function (e){
    e.preventDefault();
    var form = $('#').serialize();

    $.ajax({
      url: '/groups/addMember',
      method: 'POST',
      dataType: 'json',
      data: form,

    }).done(function (data){
      

    }).fail(function (error, member) {
      console.log(error.message); 
    
      // json photo object 
      console.log(member);
    });
  });
  // end add user
});
// end document