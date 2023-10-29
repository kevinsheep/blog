---
title: 其他代码片段
updateTime: 2019/01/25
tags: 前端
---

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

## Ajax防重复提交
```javascript
/**
* @author kevinsheep
* @since 2018.10
*/
$.ajaxSetup({
    beforeSend(xhr) {
        const _url = this.url
        if (! window.requestCount) {
            window.requestCount = {}
        }
        if (! window.requestCount[_url]) {
            window.requestCount[_url] = 1
        }
        else {
            console.log("重复提交:", _url) //这里自定义是否提示，或提示的方法
            return false
        }
    },
    complete(xhr, status) {
        const _url = this.url
        if (window.requestCount[_url]) {
            window.requestCount[_url] = 0;
        }
    }
});
```

## 修改后退按钮行为
```javascript
function pushHistory() {
  window.history.pushState({
    title: "index",
    url: "https://ceil.top" //定义需要强行跳转的链接地址
  }, "index", location.href)
  window.history.pushState({ title: "index", url: "" }, "index", "")
}
pushHistory() //页面onload时执行

window.addEventListener("popstate", () => {
  if (window.history.state && window.history.state.url) {
    location.href = window.history.state.url
  }
})
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