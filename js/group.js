

//start create group
function createGroup(group){
  var row = '';

};
// end create group

//start find username
function findUsername(username){
  var row = '';

};
// end find username

//start add member
function addMember(username){
  var row = '';

};
// end add member

// start document
$(document).ready(function(){

	//3.1 start add group
  $('#create_group_btn').click(function (e){
    e.preventDefault();
    var form = $('#create_group_form').serialize();

    $.ajax({
      url: '/groups/create',
      method: 'POST',
      dataType: 'json',
      data: form,

    }).done(function (data){
      if (data.error) {
      	console.log(data.error);
      	alert('Add failed');
      }
      else {
      	createGroup(data.group);
      	alert('Add successfully');
      }

    }).fail(function (data.error) {
      console.log(data.error); 
    });
  });
  // end add group

  //3.2.1 start find user
  $('#us_find_btn').click(function (e){
    e.preventDefault();
    var form = $('#us_find_form').serialize();

    $.ajax({
      url: '/findUser',
      method: 'POST',
      dataType: 'json',
      data: form,

    }).done(function (data){
      if (data.error) {
      	console.log(data.error);
      	console.log(data.found);
      }
      else {
      	findUsername(data.username);
      }

    }).fail(function (data) {
      console.log(data.error); 
    });
  });
  // end find user

  //3.2.2 start add member
  $('#mem_add_btn').click(function (e){
    e.preventDefault();
    // var form = $('#').serialize();

    $.ajax({
      url: '/groups/addMember',
      method: 'POST',
      dataType: 'json',
      data: form,

    }).done(function (data){
      if (data.error) {
      	console.log(data.error);
      }
      else {
      	addMember(data.member);
      }

    }).fail(function (error) {
      console.log(error);
    });
  });
  // end add member
});
// end document