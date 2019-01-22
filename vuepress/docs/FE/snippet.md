---
updateTime: 2019/01/22
---
# 代码片段
## H5判断手机横竖屏状态

```javascript

//判断手机横竖屏状态：
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    if (window.orientation === 180 || window.orientation === 0) { 
        alert('竖屏状态！');
    }
    if (window.orientation === 90 || window.orientation === -90 ){ 
        alert('横屏状态！');
    }
}, false);
```