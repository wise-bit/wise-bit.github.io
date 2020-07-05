jQuery(document).ready(function($) {
    $(".clickable-content").click(function() {
        window.location = $(this).data("href");
    });
});

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
});