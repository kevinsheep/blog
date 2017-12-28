/**
 * BGY-UI 1.0
 *
 */
;
"use strict";
(function(){


})();


$(window).on('load', function() {
	$(".bgy-btn").each(function(index, el) {
		var $el = $(el), 
				n = $el.text().length;
		if(n == 2 || n == 3){
			$el.addClass('btn-n' + n);
		}
	});
});