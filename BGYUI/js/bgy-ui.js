/**
 * BGY-UI 0.9.6
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

//重载easyui的onResize方法，增加自动居中功能
$.fn.window.defaults.onResize = function (left, top) {
	console.log("onResize override")
  var $c = $(this).parent(),
      $w = $c.parent(),
      setLeft = ($w.width() - $c.width()) / 2;
      setTop = ($w.height() - $c.height()) / 2;
  if (setLeft < 0) {setLeft = 0;}
  if (setTop < 0) {setTop = 0;}
  $(this).window('move', {left: setLeft, top: setTop});
};