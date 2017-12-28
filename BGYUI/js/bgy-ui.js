/**
 * BGY-UI 0.9.5
 *
 */
;
"use strict";
(function(){


})();

//按钮字数判断处理
$(window).on('load', function() {
	$(".bgy-btn").each(function(index, el) {
		var $el = $(el), 
				n = $el.text().length;
		if(n == 2 || n == 3){
			$el.addClass('btn-n' + n);
		}
	});
});