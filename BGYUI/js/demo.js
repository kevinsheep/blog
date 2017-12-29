/**
 * BGY-UI Demo Page
 *
 */
;
"use strict";
(function(){
	//生成目录树
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

	//固定目录树
	$(window).on("scroll", function () {
    if ($(window).scrollTop() >= 330) {
        $("#toc-menu").addClass("fixed");
    } else {
        $("#toc-menu").removeClass("fixed");
    }
	});

	//分页效果演示
  $('#pageDemo').pagination({
    total:169,
    pageSize:10,
    layout:['prev','first','links','last','next'],
    links:5,
    pageList:10,
    pageNumber:2,
    displayMsg:'本页显示{pageSize}条记录，共{total}条记录'
  });

  //树形控件演示
	$('#treeDemo').tree({
		animate: true,
		data: [{
		    "text":"系统权限树一",
		    "children":[{
		      "text":"应用系统设置",
		      "state":"closed",
		      "children":[{
		    				"checked":true,
			          "text":"选项一"
				      },{
			          "text":"选项二"
			      }]
			    },{
		      "text":"权限管理模块",
		      "state":"open",
		      "children":[{
		          "text":"选项一"
			      },{
		    			"checked":true,
		          "text":"选项二"
			      },{
		          "text":"选项三"
		      }]
		    }]
		},{
		    "text":"系统权限树二",
		    "state":"closed",
		    "children":[{
		      "text":"权限设置A"
		    },{
		      "text":"权限设置B"
		    }]
		}],
		checkbox: true
	});

  //树形控件演示2  
	$('#treeDemo2').tree({
		animate: true,
		data: [{
		    "text":"没有复选框的树",
		    "children":[{
		      "text":"应用系统设置",
		      "state":"closed",
		      "children":[{
			          "text":"选项一"
				      },{
			          "text":"选项二"
			      }]
			    },{
		      "text":"权限管理模块",
		      "state":"open",
		      "children":[{
		          "text":"选项一"
			      },{
		          "text":"选项二"
			      },{
		          "text":"选项三"
		      }]
		    }]
		},{
		    "text":"系统权限树二",
		    "state":"closed",
		    "children":[{
		      "text":"权限设置A"
		    },{
		      "text":"权限设置B"
		    }]
		}]
	});
	//弹窗演示
	$('#windowDemo').window({
		title: '项目巡检统计图表',
    width: 900,
    height: 700,
    modal: true,
    collapsible: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    border: false,
    closed: true,
    constrain: true,
    cls: 'bgy-window',
    headerCls: 'bgy-tit'
	});
	$('#trigWindow').on('click', function(e) {
		$('#windowDemo').window('open');
	});

})();


$(window).on('load', function() {

	//滚动监测
	$('body').scrollspy({ target: '#toc-menu', offset: 150 });
});