var darkMode = false;

jQuery(document).ready(function($) {
    $(".clickable-content").click(function() {
        window.location = $(this).data("href");
    });

    $('#moon').click(function() {
		if (darkMode) {
			$(':root').css({
		        '--main-bg-color': 'white',
		        '--main-fg-color': '#222'
		    });
		    darkMode = false;
		} else {
			$(':root').css({
		        '--main-bg-color': '#222',
		        '--main-fg-color': 'white'
		    });
		    darkMode = true;
		}
	});
});

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
});

// document.addEventListener('contextmenu', event => event.preventDefault());
