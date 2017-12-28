/**
 * BGY-UI 1.0
 *
 */
;
"use strict";
(function(){
	var $nav = $("#toc-menu .nav"),
			$doc = $("#toc-doc");
	$doc.find("h3").each(function(index, el) {
		var $el = $(el),
				tid = "doc-p" + index,
				link = "#" + tid,
				text = $el.text();
		$el.attr("id", tid);
		$nav.append('<li><a href="' + link + '">' + text + '</a></li>');
	});

  

	$(window).on("scroll", function () {
    if ($(window).scrollTop() >= 330) {
        $("#toc-menu").addClass("fixed");
    } else {
        $("#toc-menu").removeClass("fixed");
    }
	});
})();


$(window).on('load', function() {
	$('body').scrollspy({ target: '#toc-menu', offset: 150 });
});