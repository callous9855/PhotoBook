$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});

// sign up password checking
$('#su_repassword').on('keyup', function(e){
  var password = $('#su_password').val();
  var repassword = $('#su_repassword').val();

  if (password === repassword) {
    $('#message').html('MATCHES').css("color", "green");
    $('#message').parent('div').removeAttr('hidden');
  }
  else {
    $('#message').html('NOT MATCHES').css("color", "red");
    $('#message').parent('div').removeAttr('hidden');
  }
});

// sign up submit
$('#su_form').submit(function(e){
  var password = $('#su_password').val();
  var repassword = $('#su_repassword').val();

  if (password === repassword) {
    // if matches then form will submit
    return;
  }

  e.preventDefault();
});

// prevent special characters
$('input').attr('pattern', '[a-zA-Z0-9]{6,}');
$('input').attr('title', 'Cannot contain special characters and must be at least 6 characters');

// start document
$(document).ready(function(){

});
// end document