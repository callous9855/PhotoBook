$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});

// sign up password checking
$('#su_form').one('submit', function(e) {
    e.preventDefault();
    
    var password = $('#su_password').val();
	var repassword = $('#su_repassword').val();

	if (password === repassword) {
		$(this).submit();
	}else {
		alert('Password and Repassword do not match');
	}
});
