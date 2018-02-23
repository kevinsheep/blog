/**
 * BGY-UI 1.0.0
 *
 */
;
"use strict";

$(window).on('load', function() {
    //按钮字数判断处理
    $(".bgy-btn").each(function(index, el) {
        var $el = $(el), 
                n = $el.text().length;
        if(n == 2 || n == 3){
            $el.addClass('btn-n' + n);
        }
    });

    //下拉按钮处理
    var $dbt = $(".bgy-dropBtn"),
        $dt = $("<dt></dt>"),
        $dd = $dbt.find("dd");
        //console.log($dd.find("a").eq(0))
    $dt.html($dd.find("a").eq(0).clone());
    $dbt.prepend($dt);
    $dt.on('mouseover', function(e) {
        $dd.toggle();
    });
    $dbt.on('mouseleave', function(e) {
        $dd.hide();
    });
    // $dda.on('click', function(e) {
    // 	var $dta = $dt.find(">a"),
    // 		$dda = $dd.find(">a");
    // 	$dd.prepend($dta);
    // 	$dt.html($(this));
    // 	return false;
    // });
});

//重载easyui默认window的onOpen方法，增加自动居中功能，修改mask的样式
$.fn.window.defaults.onOpen = function (left, top) {
  var $c = $(this).parent(),
      $w = $(window),
      setLeft = ($w.width() - $c.width()) / 2;
      setTop = ($w.height() - $c.height()) / 2 + $(window).scrollTop();
  if (setLeft < 0) {setLeft = 0;}
  if (setTop < 0) {setTop = 0;}
  $(this).window('move', {left: setLeft, top: setTop});

  $(".window-mask").appendTo('body').css({
  	width: $(window).width(),
  	height: $(window).height(),
  	backgroundColor: "#000"
  }); 
};

//重载easyui默认messager的属性及onOpen方法，修改mask的样式
$.messager.defaults.cls = "bgy-alert";
$.messager.defaults.headerCls = "bgy-tit";
$.messager.defaults.bodyCls = "bgy-tit";
$.messager.defaults.border = false;
$.messager.defaults.width = 700;
$.messager.defaults.height = 220;
$.messager.defaults.buttons = [{
    text:'Save'
}];
$.messager.defaults.onOpen = function (left, top) {
    $(".window-mask").appendTo('body').css({
        width: $(window).width(),
        height: $("body").height(),
        backgroundColor: "#000"
    }); 
};