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
    height: 500,
    collapsible: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    border: false,
    closed: true,
    constrain: true,
    cls: 'bgy-window',
    headerCls: 'bgy-tit',
    modal: true
	});
	$('#windowDemoSmall').window({
		title: '小编辑弹窗',
    width: 700,
    height: 400,
    collapsible: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    border: false,
    closed: true,
    constrain: true,
    cls: 'bgy-win-small',
    headerCls: 'bgy-tit',
    modal: true
	});
	$('#alertDemo').window({
		title: '系统提示',
    width: 700,
    height: 220,
    collapsible: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    border: false,
    closed: true,
    constrain: true,
    cls: 'bgy-alert',
    headerCls: 'bgy-tit',
    modal: true
	});

	$('#trigWindow').on('click', function(e) {
		$('#windowDemo').window('open');
	});

	$('#trigWindow2').on('click', function(e) {
		$('#windowDemoSmall').window('open');
	});

	$('#inputPrompt').on('click', function(e) {
		$('#windowDemoSmall').window('open');
	});


	$('#trigWindow3').on('click', function(e) {
		$('#alertDemo').window('open');
	});

	$('#trigWindow4').on('click', function(e) {
		$('#tipsDemo').show('fast', function() {
			var $this = $(this);
			setTimeout(function(){
				$this.hide('fast');
      }, 3000)
		});
	});

	//表格演示
	$('.bgy-table table').datagrid({
		//scrollbarSize:0,fitColumns:true两属性同时设置时可以彻底消除表格右侧留白
	    scrollbarSize:0, //滚动条宽度，设置为0时，
	    fitColumns:true, //设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
	    rowStyler: function(index,row){
  			if (index%2==1){
      			return 'background-color:#f4f4f4;';//隔行变色
      		}        		
		},
		singleSelect: true
	});

	//图片上传
	$("#uploadPic").on('click', function(event) {
		$(".bgy-upload input[type='file']").attr("multiple", "multiple").removeAttr("capture").click();
	});
	$("#takeAPhoto").on('click', function(event) {
		$(".bgy-upload input[type='file']").removeAttr("multiple").attr("capture", "camera").click();
	});
		$(".bgy-upload input").initInput();

	//$(".bgy-upload").on("change", "input[type='file']", function(event) {

		//var files = $(this).get(0).files;
		//$(".bgy-upload").append("<span>" + (files[0].name) + "</span>");

		// var imgData = new FormData();
		// imgData.append('images', files);

		// $.ajax({
		// 	url: 'https://easy-mock.com/mock/5a314952cc5f0f50cf1208f0/example/upload',
	 //    method : 'POST',
	 //    dataType : 'JSON',
	 //    data: imgData,
	 //    //data: {name:"mockDataDebugByKEVINSHEEP"},
  //     processData: false,
  //     contentType: false,
	 //    success : function(d) {
		// 		console.log(d);
	 //    }
		// });

	//});

})();


$(window).on('load', function() {

	//滚动监测
	$('body').scrollspy({ target: '#toc-menu', offset: 150 });
});