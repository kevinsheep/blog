/*
 * Polygon Drawing, jQuery PlugIn By KEVIN SHEEP, Dec 2017
 * Based On jQuery.js, compatibled with the latest version
 * Licensed under the MIT License
 */
;
"use strict";

(function($){
  $.fn.idata = {
     debug      : ""
    ,fileType   : ["jpg", "png", "bmp", "jpeg"]  //允许上传的文件类型
    ,fileSize   : 1024 * 1024 * 10               //上传文件的大小10M
    ,fileAmount : 5
  };//默认设置

  var validate = function (files) {
    var validFiles = [];
    for (var i = 0, file; file = files[i]; i++) {
      var fa = file.name.split("."),
          suffix = fa[fa.length - 1];
      if (suffix == null || jQuery.inArray(suffix.toLowerCase(), $.fn.idata.fileType) == -1) {
        alert(file.name + '不是允许上传的图片类型');
        break;
      }
      if (file.size >= $.fn.idata.fileSize) {
        alert(file.name + '文件过大');
        break;
      }
      validFiles.push(file);
    }
    return validFiles;
  };

  $.fn.extend({
    initInput : function(options){
      this.idata = this.extend(this.idata, options);
      var fn = this,
          $fn = $(fn);
      $(fn).each(function(index, ele){
        $(ele).on("change", function(event) {
          var imgContainer = $(this).parent(), //存放图片的父元素
              fileArr = [],
              numUp = imgContainer.find(".up-section").length,
              fileList = $(ele).get(0).files,
              totalNum = numUp + fileList.length; //总的数量
          if (fileList.length > $.fn.idata.fileAmount || totalNum > $.fn.idata.fileAmount) {
            //本次上传或累计上传数量超过限制
            alert("上传图片数目不可以超过5个");
          } else if (numUp < $.fn.idata.fileAmount) {
            fileArr = validate(fileList);
            for (var i = 0; i < fileArr.length; i++) {
              var $img = $(document.createElement("img"))
                .attr("src", window.URL.createObjectURL(fileArr[i]))
                .hide();
              $(document.createElement("div"))
                .addClass('up-section')
                .addClass('loading')
                .append("<span class='bgy-icon-close'></span>")
                .append($img)
                .prependTo(imgContainer);
            }
          }
          setTimeout(function() {
            $(".up-section").removeClass("loading")
                            .find("img").show();
          }, 450);
          numUp = imgContainer.find(".up-section").length;
          if (numUp < $.fn.idata.fileAmount) {
            //显示上传按钮
          }else{
            //隐藏上传按钮
          }
        });
      });//each
    }//initInput

    ,debug : function(){
      $(this).each(function(index, ele){
        console.log(fileList);
      });//each
    }

  });//extend

  //绑定删除图片事件
  $(".bgy-upload").on("click", ".bgy-icon-close", function() {
    var $parent = $(this).parent();
    $parent.remove();

    if ($parent.siblings(".up-section").length < $.fn.idata.fileAmount) {
      //显示上传按钮;
    }
  });

})(jQuery);
