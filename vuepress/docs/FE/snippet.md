---
updateTime: 2019/01/25
---
# 其他代码片段

## 数据规整处理
```javascript
/**
 * @author kevinsheep
 * @description 根据不同位数，取最接近的10(n)*5倍数
 * @param val 整型数值
 */
function getFixNum(val) {
  const n = Math.max(1, val.toString().length - 1)
  const d = Math.pow(10, n-1) * 5
  return Math.ceil(val / d) * d
}
getFixNum(1) //5
getFixNum(4) //5
getFixNum(7) //10
getFixNum(12) //15
getFixNum(231) //250
getFixNum(3991) //4000
```

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