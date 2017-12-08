/*
* 基于svg.js jQuery.js
*/
;
"use strict";

var svgPolygon = (function() {
  if (! SVG.supported) {
    console.log('SVG NOT Supported');
    return false;
  }

  var SWIDTH = 1200;            //画布宽度
  var SHEIGHT = 700;            //画布高度
  var STOKEWIDTH = 2;           //描边线粗
  var DOTSIZE = 8;              //顶点尺寸
  var PNUMBGSIZE = 40;          //序号背景尺寸
  var PNUMSIZE = 24;            //序号字号
  var PNUMOFFSETY = 4;          //序号文字y偏移
  var FILL_OPACITY = .4;        //区域不透明度
  var COLORARRAY= ['#c00', '#0c0', '#00c', '#990', '#909', '#099', '#000'];
  var defStageCls = "drawbox";
  var defPolyClass = "polyClass";

  var onDrawMode = false;       //绘图模式开关
  var isDrawing = false;        //鼠标绘图状态
  var onEditMode = false;       //编辑模式开关
  var isDragging = false;       //鼠标拖动状态
  var isSaved = true;           //当前数据保存状态
  var polyDotsData = new Array();   //一维数据，顶点数据
  var polyColorData = new Array();  //一维数据，存储各多边形实际的颜色值
  var curDotStr = "";

  var imgId;          //存储画布对应的图片ID
  var polyIdArray = new Array();    //各多边形生成一个识别ID



  var polyArray = new Array();      //一维数据，存储画布上的多边形 //可尝试用set()
  var anchorArray = new Array();    //二维数据，存储画布上的锚点
  var pNum = new Array();
  var pNumBg = new Array();

  //var draw = new Array();           //一维数据，存储画布实例
  var oDraw = {};                        //{img_id : draw}
  //var activeDraw = 0;               //当前激活的只能有一个
  var activeDrawImg = "";             //当前激活的画布对应的图片ID

  var DrawAnchor = function (curPoint, color) {
    var thiscolor = (color != undefined) ? color : '#c00';
    return oDraw[activeDrawImg].rect(DOTSIZE, DOTSIZE).fill(thiscolor).move(curPoint.x - DOTSIZE/2, curPoint.y - DOTSIZE/2);
  };
  var DrawLine = function (polyStr, color) {
    var thiscolor = (color != undefined) ? color : '#333';
    return oDraw[activeDrawImg].line(polyStr).stroke({ width: STOKEWIDTH, color: thiscolor });
  };
  var DrawPolygon = function (polyStr, color) {
    var thiscolor = (color != undefined) ? color : '#c00';
    return oDraw[activeDrawImg].polygon(polyStr).fill({color: thiscolor, opacity: FILL_OPACITY}).stroke({ width: STOKEWIDTH, color: thiscolor });
  };
  var DrawCircle = function (curPoint, color) {
    var thiscolor = (color != undefined) ? color : '#000';
    return oDraw[activeDrawImg].circle(PNUMBGSIZE).move(curPoint.x, curPoint.y).fill({color: thiscolor, opacity: FILL_OPACITY + .2});
  };
  var DrawNum = function (t, curPoint, color) {
    var thiscolor = (color != undefined) ? color : '#fff';
    return oDraw[activeDrawImg].text(t).move(curPoint.x, curPoint.y).fill(thiscolor).font({size: PNUMSIZE, leading: '1em', anchor: 'middle', family: 'sans-serif'});
  };

  return {
    init : function (container) {
      if($(container).parent().parent().find("."+defStageCls).length == 0) {
        var obj = document.createElement("div");
        var $obj = $(obj);
        activeDrawImg = $(container).attr("id");
        imgId = $(container).attr("id");
        if(oDraw[activeDrawImg] == undefined){
          oDraw[activeDrawImg] = SVG(obj).size(SWIDTH, SHEIGHT);
        }
        $(container).parent().after($obj);//待定
        console.log("oDraw[" + activeDrawImg + "]=" + oDraw[activeDrawImg]);

        $obj.addClass(defStageCls);
        $obj.attr('id', 'draw_'+activeDrawImg);
        //$obj.attr('DrawID', activeDraw);

        $obj.on({
          'mousemove' : function(e) {
            if(onDrawMode && isDrawing && curDotStr != ""){
              var tempDotCount = curDotStr.split(' ').length;
              var tempDotStr = curDotStr + ' ' + e.offsetX + "," + e.offsetY;
              polyArray[polyArray.length -1].remove();
              polyArray.pop();
              if(tempDotCount > 1){
                polyArray.push(DrawPolygon(tempDotStr, polyColorData[polyColorData.length - 1]));
              }else if(tempDotCount == 1){
                polyArray.push(DrawLine(tempDotStr, polyColorData[polyColorData.length - 1]));
              }
            }
          },

          'mousedown' : function(e) {
            var tempDotArr = curDotStr.split(' ');
            var tempDotCount = tempDotArr.length;
            if(onDrawMode && 1 == e.which){//左键单击绘制锚点
              isSaved = false;
              isDrawing = true;
              if(curDotStr == ""){
                curDotStr = e.offsetX + "," + e.offsetY;
                polyArray.push(oDraw[activeDrawImg].polygon());//先放个空的多边形
                polyColorData.push(COLORARRAY[Math.floor(Math.random() * COLORARRAY.length)]);
                anchorArray.push(new Array());
              }else{
                curDotStr += (' ' + e.offsetX + "," + e.offsetY);
                polyArray[polyArray.length - 1].remove();
                polyArray.pop();
                if(tempDotCount == 1){
                  polyArray.push(DrawLine(curDotStr, polyColorData[polyColorData.length - 1]));
                }else if(tempDotCount > 1){
                  polyArray.push(DrawPolygon(curDotStr, polyColorData[polyColorData.length - 1]));
                }
              }
              anchorArray[anchorArray.length - 1].push(DrawAnchor({ x : e.offsetX , y : e.offsetY }));
            }//1 == e.which

            if(!onDrawMode && 1 == e.which){
              $('#polyEMenu').hide();
            }

            if(onDrawMode && 3 == e.which && isDrawing && tempDotCount > 1){
            //重写右键事件为：若正在绘图状态，并且锚点数多于2个，则结束当前多边形的绘制
              isDrawing = false;
              anchorArray[anchorArray.length - 1].push(DrawAnchor({ x : e.offsetX , y : e.offsetY }));
              curDotStr += (' ' + e.offsetX + "," + e.offsetY);
              polyDotsData.push(curDotStr);

              var tempX = parseInt(tempDotArr[0].split(",")[0]), tempY = parseInt(tempDotArr[0].split(",")[1]);
              pNumBg.push(DrawCircle({x : tempX, y : tempY}));
              pNum.push(DrawNum(polyDotsData.length.toString(), {x : tempX+PNUMBGSIZE/2, y : tempY+PNUMBGSIZE/2+PNUMOFFSETY-PNUMSIZE/2}));

              //添加多边形标识
              var polyId = "poly_" + Math.ceil(100000000 * Math.random());
              polyArray[polyArray.length - 1].attr('polyId', polyId);
              polyArray[polyArray.length - 1].addClass(defPolyClass);
              polyIdArray.push(polyId);

              //关闭绘图模式
              onDrawMode = false;
              $obj.css('cursor', 'auto');
              curDotStr = "";
            }
          },//mousedown

          'dblclick': function(e) {//暂时没用，待扩充
            console.log("dblclick");
          },

          'contextmenu': function(){//禁用右键默认事件
            return false;
          }
        });//$obj.on

        return oDraw[activeDrawImg];
      }else{
        console.log("当前容器已存在绘图区")
        return false;
      }
    }

    ,getLastDots : function(){
      isSaved = true;//保存状态改变方式待定
      console.log(polyDotsData);//模拟存储到数据库
      return polyDotsData[polyDotsData.length - 1];
    }

    ,getColor: function () {
      return polyColorData[polyColorData.length - 1];
    }

    ,getSaveState: function () {
      return isSaved;
    }

    ,switchEditMode : function (){
      if(!onEditMode){
        onEditMode = true;
        var curPoly = polyArray[polyArray.length - 1];
        var curPolyData = polyDotsData[polyDotsData.length - 1];
        var curAnchorArray = anchorArray[anchorArray.length - 1];
        $(curAnchorArray).each(function(index, el) {
          el.size(12, 12).fill("#fff").stroke({ width: 1, color: '#000' }).front();
        });

        var $obj = $("#" + activeDrawImg).parent().parent().find("."+defStageCls);
        var dragDot = null;
        var dragDotStr = null;

        $obj.mousedown(function(e) {
          dragDot = null;//清除上一次的记录
          dragDotStr = null;
          console.log("mousedown");
          $(curAnchorArray).each(function(index, el) {
            if (el.inside(e.offsetX, e.offsetY)) {
              isDragging = true;
              dragDot = el;
              dragDotStr = (el.x()+DOTSIZE/2) + "," + (el.y()+DOTSIZE/2)
              console.log(dragDotStr);
              //break;
            }
          });
        })
        .mousemove(function(e) {
          if(isDragging){
            dragDot.move(e.offsetX-DOTSIZE/2, e.offsetY-DOTSIZE/2);
            curPolyData = curPolyData.replace(dragDotStr, (e.offsetX + "," + e.offsetY));
            dragDotStr = e.offsetX + "," + e.offsetY;
            curPoly.remove();
            //console.log(curPolyData);
            curPoly = DrawPolygon(curPolyData, polyColorData[polyColorData.length - 1]).back();
          }
        })
        .mouseup(function(e) {
          console.log("mouseup");
          if(isDragging){
            isDragging = false;
            dragDot.move(e.offsetX-DOTSIZE/2, e.offsetY-DOTSIZE/2);
            curPolyData = curPolyData.replace(dragDotStr, (e.offsetX + "," + e.offsetY));
            dragDotStr = e.offsetX + "," + e.offsetY;
            curPoly.remove();
            curPoly = DrawPolygon(curPolyData, polyColorData[polyColorData.length - 1]).back();
          }
        });

      }else{
        onEditMode = false;
      }
    }

    ,switchDrawMode : function () {
      if(onDrawMode){
        onDrawMode = false;
        $("."+defStageCls).css('cursor', 'auto');
        if(isDrawing){
          isDrawing = false;
          //未终止无法删除，暂时不用清理
          curDotStr = "";
          isSaved = false;
        }
      }else{
        onDrawMode = true;
        $("."+defStageCls).css('cursor', 'crosshair');
      }
      return onDrawMode;
    }

    ,delPoly : function (i) {
      var index = (i != undefined) ? i : polyDotsData.length - 1;//不指定i，则默认删除最后一个
      console.log(index);
      console.log("anchorArray="+anchorArray);
      if(polyDotsData.length > 0 && polyDotsData.length > index){
        var curAnchorArray = anchorArray[index];
        for (; curAnchorArray.length > 0;) {
          curAnchorArray[curAnchorArray.length - 1].remove();
          curAnchorArray.pop();
        }
        anchorArray.splice(index, 1);
        polyArray[index].remove();
        polyArray.splice(index, 1);
        pNum[index].remove();
        pNum.splice(index, 1);
        pNumBg[index].remove();
        pNumBg.splice(index, 1);
        curDotStr = polyDotsData[index];
        curDotStr = "";
        polyDotsData.splice(index, 1);
        polyIdArray.splice(index, 1)
        isSaved = true;
      }else{
        alert("还没有数据");
      }
    }

    ,delPolyById : function (PolyId) {
      for(var i=0; i<polyIdArray.length; ++i){
        if(polyIdArray[i] == PolyId){
          var index = i;
        }
      }
      if(polyDotsData.length > 0 && polyDotsData.length > index){
        var curAnchorArray = anchorArray[index];
        curDotStr = polyDotsData[index];
        for (; curAnchorArray.length > 0;) {
          curAnchorArray[curAnchorArray.length - 1].remove();
          curAnchorArray.pop();
        }
        anchorArray.splice(index, 1);
        polyArray[index].remove();
        polyArray.splice(index, 1);
        pNum[index].remove();
        pNum.splice(index, 1);
        pNumBg[index].remove();
        pNumBg.splice(index, 1);
        polyIdArray.splice(index, 1)
        curDotStr = "";
        polyDotsData.splice(index, 1);
        isSaved = true;
      }else{
        alert("还没有数据");
      }
    }

    ,delDraws : function () {//清屏
      oDraw[activeDrawImg].clear();
      polyArray = [];
      polyDotsData = [];
      polyColorData = [];
      anchorArray = [];
      pNum = [];
      pNumBg = [];
      polyIdArray = [];
      onDrawMode = false;
      isDrawing = false;
      curDotStr = "";
      $("."+defStageCls).css('cursor', 'auto');
      isSaved = true;
    }

    ,getImgId: function () {
        return imgId;
    }

    ,getPolyId: function () {
      if(polyIdArray.length > 0){
        return polyIdArray[polyIdArray.length - 1];
      }else{
        return null;
      }
    }

    ,getCurPolyIndex: function (PolyId) {
      for(var i=0; i<polyIdArray.length; ++i){
        if(polyIdArray[i] == PolyId){
          return i;
        }
      }
    }

    ,loadPolygon: function (imgId, posStr, color, num, polyId) {
      var obj = document.createElement("div");
      var $obj = $(obj);
      //var oDraw[activeDrawImg] = SVG(obj).size(SWIDTH, SHEIGHT);
      //$obj.addClass(defStageCls);
      //$("#" + imgId).parent().after($obj);

      polyDotsData.push(posStr);
      //绘制多边形
      polyArray.push(DrawPolygon(posStr, color));
      //绘制锚点
      anchorArray.push(new Array());
      var posArr = posStr.split(' ');
      for(var i=0; i<posArr.length; ++i){
        var curPoint = posArr[i].split(",");
        anchorArray[anchorArray.length - 1].push(DrawAnchor({x:curPoint[0],y:curPoint[1]}));
      }
      //绘制数字序号
      var tempX = parseInt(posArr[0].split(",")[0]), tempY = parseInt(posArr[0].split(",")[1]);
      pNumBg.push(DrawCircle({x : tempX, y : tempY}));
      pNum.push(DrawNum(num.toString(), {x : tempX+PNUMBGSIZE/2, y : tempY+PNUMBGSIZE/2+PNUMOFFSETY-PNUMSIZE/2}));

      //添加多边形标识
      polyArray[polyArray.length - 1].attr('polyId', polyId);
      polyIdArray.push(polyId);
      polyArray[polyArray.length - 1].addClass(defPolyClass);

      return oDraw[activeDrawImg];
    }
    ,activeDraw : function(i) {
        activeDrawImg = i;
        if(isSaved){
          polyArray = [];
          polyDotsData = [];
          polyColorData = [];
          anchorArray = [];
          pNum = [];
          pNumBg = [];
          polyIdArray = [];
          onDrawMode = false;
          isDrawing = false;
          curDotStr = "";
          return oDraw[activeDrawImg];
        }else{
          return false;
        }
    }
    ,debug : function() {

      //var group = draw[draw.length - 1].group();
      group.add(polyArray[polyArray.length - 1])
        .add(pNumBg[pNumBg.length - 1]);

      group.animate(3000).fill('#ff0');
      //group.remove();
    }
  };//return

})();
