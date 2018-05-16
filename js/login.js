$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});

// sign up passwords checking
$('#su_form').submit(function(e){
	var password = $('#su_password').val();
	var repassword = $('#su_repassword').val();

	if (password === repassword) {
    	// if matches then form will submit
    	return;
  	}
  	else {
  		// if not then show title
  		$('#su_repassword').attr('title', 'Not matches');
  		// console.log(password +"\n"+ repassword);
  	}
	
  	e.preventDefault();
});

// prevent special characters
$('input').attr('pattern', '[a-zA-Z0-9]{6,}');
$('input').attr('title', 'Cannot contain special characters and must be at least 6 characters');