var darkMode = false;

jQuery(document).ready(function($) {
    $(".clickable-content").click(function() {
        window.location = $(this).data("href");
    });

    $('#moon').click(function() {
		if (darkMode) {
			$(':root').css({
		        '--main-bg-color': 'white',
		        '--main-fg-color': 'black'
		    });
		    darkMode = false;
		} else {
			$(':root').css({
		        '--main-bg-color': 'black',
		        '--main-fg-color': 'white'
		    });
		    darkMode = true;
		}
	});
});

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
});