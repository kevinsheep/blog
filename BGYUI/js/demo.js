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
        pageNumber:2
    });

    //树形控件演示
    $('#treeDemo').tree({
        animate: true,
        checkbox: true,
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
        onContextMenu: function(e, node){
            e.preventDefault();
            // select the node
            $('#treeDemo').tree('select', node.target);
            // display context menu
            $('#treeCMenu').menu('show', {
                left: e.pageX,
                top: e.pageY
            });			
        }
    });

    $('#treeCMenu').on('click', '> div', function(e) {
        e.preventDefault();
        var $this = $(this),
                $tree = $('#treeDemo'),
                node = $tree.tree('getSelected');
        if (node){
            if ($this.hasClass('removeItem')) {
                $tree.tree('remove', node.target);
            } else if($this.hasClass('appendSibling')) {
                $tree.tree('insert', {
                    after: node.target,
                    data: [{
                        id: Math.ceil(Math.random() * 1000),
                        text: '新同级节点'
                    }]
                });
            } else if($this.hasClass('appendChild')) {
                $tree.tree('append', {
                    parent: node.target,
                    data: [{
                        id: Math.ceil(Math.random() * 1000),
                        text: '新子节点'
                    }]
                });
            }
        }		
    });
    $("#demo-combobox").combobox({
        onShowPanel: function(){
            $(".combo-panel").addClass("bgy-combo-panel");
        }
        ,onHidePanel: function(){
            $(".combo-panel").removeClass("bgy-combo-panel");
        }
    });

    //预警状态下拉选择
    $(".bgy-combo[name='alarm']").combobox({
        panelHeight: "58px"
        ,editable: false
        ,valueField: 'value'
        ,textField: 'text'
        ,data: [{
            value: "",
            text: "选择预警"
        },{
            value: "red",
            text: "红灯"
        },{
            value: "yellow",
            text: "黄灯"
        }]
        ,formatter: function(row){
            return '<span class="state-' + row.value + '">' + row.text + '</span>';
        }
        ,onLoadSuccess: function(){
            $(".combo-panel .combobox-item:first").remove();
        }
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

    $('#trigWindow3b').on('click', function(e) {
        $.messager.alert('系统提示', '您没有权限访问此数据，请联系信息管理中心项目开发小组开通权限');
    });

    $('#trigWindow4').on('click', function(e) {
        $('#tipsDemo').show('fast', function() {
            var $this = $(this);
            setTimeout(function(){
                $this.hide('fast');
            }, 3000)
        });
    });

    //按钮悬停提示
    $('#tooltipDemo').tooltip({
        onShow: function(){
            $(this).tooltip('tip').addClass('bgy-tooltip');
        }
    });
    $('#tooltipDemo2').tooltip({
        onShow: function(){
            $(this).tooltip('tip').addClass('bgy-tooltip-red');
        }
    });
    $('#tooltipDemo3').tooltip({
        onShow: function(){
            $(this).tooltip('tip').addClass('bgy-tooltip-gray');
        }
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

	// $(".bgy-upload").on("change", "input[type='file']", function(event) {

	// 	var files = $(this).get(0).files;
	// 	$(".bgy-upload").append("<span>" + (files[0].name) + "</span>");

	// 	//var imgData = new FormData();
	// 	//imgData.append('images', files);
	// 	var imgData = new FormData($("#uploadForm").get(0));

	// 	$.ajax({
	// 		url: 'https://easy-mock.com/mock/5a314952cc5f0f50cf1208f0/example/upload',
	//     method : 'POST',
	//     dataType : 'JSON',
	//     data: imgData,
	//     //data: {"name":"postmockDataDebugByKEVINSHEEP"},
 //      //processData: true,
 //      //contentType: "application/x-www-form-urlencoded",
 //      processData: false,
 //      contentType: false,
	//     success : function(d) {
	// 			console.log(d);
	//     }
	// 	});

	// });
//zhihu
var fileInput = 1;

function addImgInput() {
    fileInput = fileInput + 1;
    var $preview = $('<input class="weui_uploader_input js_file" name="file"' + 'type="file" accept="image/jpg,image/jpeg,image/png,image/gif"multiple="multiple"' + 'id="wxUploadImg' + fileInput + '"/>');
    $("#upload-form").append($preview);
    $("#wxUploadImg" + fileInput).on('change', jsFileChange);
}
$('.js_file').on('change', jsFileChange);

function jsFileChange(event) {
    var files = event.target.files; // 如果没有选中文件，直接返回
    if (files.length === 0) {
        return;
    }
    if ((files.length + selectedCount) > maxCount) {
        alert('总数最多上传4张');
        $("#wxUploadImg" + fileInput).remove();
        //有问题时先删除，再添加一个新的input                 
        addImgInput();
        return;
    }
    for (var i = 0, len = files.length; i < len; i++) {
        var file = files[i]; // 如果类型不在允许的类型范围内                 
        if (allowTypes.indexOf(file.type) === -1) {
            $.weui.alert({
                text: '本次有不允许类型，请重新选择'
            });
            $("#wxUploadImg" + fileInput).remove();
            addImgInput();
            return;
        }
        if (file.size > maxSize) {
            $.weui.alert({
                text: '本次有图片太大，请重新选择'
            });
            $("#wxUploadImg" + fileInput).remove();
            addImgInput();
            return;
        }
    }
    selectedCount = selectedCount + files.length;
    //.....预览等逻辑 //-------------             
    $("#wxUploadImg" + fileInput).css("display", 'none');;
    //正常添加后隐藏再添加             
    if ($('.weui_uploader_file').length < maxCount) {
        addImgInput();
    }
}


    //layui引用
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      
      laydate.render({
        elem: '#dateDemo'
      });

      laydate.render({
        elem: '#dateDemo2'
        ,type: 'time'
      });	  
    });


})();


$(window).on('load', function() {
    //代码着色
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    //滚动监测
    $('body').scrollspy({ target: '#toc-menu', offset: 150 });
});