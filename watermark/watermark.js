"use strict";

var watermark = function (settings) {
    //默认设置
    var s = {
        _txt:"text",
        _x:20,//水印起始位置x轴坐标
        _y:50,//水印起始位置Y轴坐标
        _rows:10,//水印行数
        _cols:10,//水印列数
        _xspace:200,//水印x轴间隔
        _yspace:80,//水印y轴间隔
        _color:'#aaa',//水印字体颜色
        _alpha:0.4,//水印透明度
        _fontsize:'15px',//水印字体大小
        _font:'Microsoft YaHei',//水印字体
        _width:210,//水印宽度
        _height:80,//水印长度
        _angle:15//水印倾斜度数
    };
    //采用配置项替换默认值，作用类似jquery.extend
    if(arguments.length===1&&typeof arguments[0] ==="object" ){
        var src = arguments[0]||{};
        for(var key in src){
            if(src[key]&&s[key]&&src[key]===s[key])continue;
            else if(src[key])s[key] = src[key];
        }
    }

    var oTemp = document.createElement('div');
    oTemp.className = "wmWrapper";

    //获取页面最大宽高
    var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);  
    var page_height = Math.max(document.body.scrollHeight, document.body.clientHeight);

    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    //if (s._cols == 0 || (parseInt(s._x + s._width *s._cols + s._xspace * (s._cols - 1)) > page_width)) {
        s._cols = parseInt((page_width - s._x + s._xspace) / (s._width + s._xspace));
        //s._xspace = parseInt((page_width - s._x - s._width * s._cols) / (s._cols - 1));
    //}
    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    //if (s._rows == 0 || (parseInt(s._y + s._height * s._rows + s._yspace * (s._rows - 1)) > page_height)) {
        s._rows = parseInt((page_height - s._y + s._yspace) / (s._height + s._yspace));
        //s._yspace = parseInt(((page_height - s._y) - s._height * s._rows) / (s._rows - 1));
        console.log("_cols=", s._cols, ";_rows=", s._rows, ";_yspace=", s._yspace)
    //}
    var x;
    var y;
    for (var i = 0; i < s._rows; i++) {
        y = s._y + (s._yspace + s._height) * i;
        for (var j = 0; j < s._cols; j++) {
            x = s._x + (s._width + s._xspace) * j;

            var mask_div = document.createElement('div');
            mask_div.id = 'mask_div' + i + j;
            mask_div.className = 'mask_div';
            mask_div.appendChild(document.createTextNode(s._txt));
            //设置水印div倾斜显示
            mask_div.style.webkitTransform = "rotate(-" + s._angle + "deg)";
            mask_div.style.MozTransform = "rotate(-" + s._angle + "deg)";
            mask_div.style.msTransform = "rotate(-" + s._angle + "deg)";
            mask_div.style.OTransform = "rotate(-" + s._angle + "deg)";
            mask_div.style.transform = "rotate(-" + s._angle + "deg)";
            mask_div.style.visibility = "";
            mask_div.style.position = "absolute";
            mask_div.style.left = x + 'px';
            mask_div.style.top = y + 'px';
            mask_div.style.overflow = "hidden";
            mask_div.style.zIndex = "9999";
            mask_div.style.pointerEvents = 'none';//pointer-events:none  让水印不遮挡页面的点击事件
            //mask_div.style.border="solid #eee 1px";
            mask_div.style.opacity = s._alpha;
            mask_div.style.fontSize = s._fontsize;
            mask_div.style.fontFamily = s._font;
            mask_div.style.color = s._color;
            mask_div.style.textAlign = "center";
            mask_div.style.width = s._width + 'px';
            mask_div.style.height = s._height + 'px';
            mask_div.style.display = "block";
            oTemp.style.height = page_height + 'px';
            oTemp.style.pointerEvents = 'none';
            oTemp.appendChild(mask_div);
        };
    };
    document.body.appendChild(oTemp);
};