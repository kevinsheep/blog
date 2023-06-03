---
title: 随机生成花里胡哨的背景图
updateTime: 2023/02/23
tags: Canvas|Design
---

## Intro
程序员做博客，页面大多是朴（xìng）素（lěng）简（dàn）洁风格。点进去就像是在查阅技术文档，倒是能让人专注技术本身。但有的是太素了，没有多少阅读兴趣。

好一点的，找个漂亮的博客模板，或者作为死宅 ITer，放个二次元大头萌妹在角落,眼睛忽闪忽闪地盯着浏览者的鼠标。哪怕是烂大街的模板，但至少能让人知道，那是个不懒惰的作者。

像本博客这样，过于独立，既不依附大型博客网站，也不应用模板，非要自己折腾博客的，就有点尴尬了，只好自己设计点图案装饰一下。毕竟，VitePress 原本只是一个文档展示系统啊！

[以前的博客](/ABOUT/history.html)弄得花里胡哨的，大概也是上年纪了，渐渐地不喜欢放太多东西。但有天看着空荡荡的首页……实在太素了，哪怕是随便放张背景图设置成 30% 透明度都好啊！

可是一旦放图，就有选图的问题，版权的问题，看久了会腻的问题。最后决定自己画吧，不过不是用画图软件，而是代码来折腾。反正自己的网站自己就是甲方。

## 目标
网站上找一块地方，比如首页背景吧，在留白过大的地方，随便放上一堆不规则分布的形状，半透明的，每次进入时最好是不一样的，颜色也是随机的。

## 相关
先是搜索一下有什么库、什么轮子已经实现了这效果的。结果发现要么就不合需求，要么就太大了，杀鸡用牛刀的感觉。

猛然想起来，这其实是百来行代码可以实现的事。赶紧去温习一遍 [Canvas 的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)。

## 实现

新建一个组件，放在首页某个插槽里。如本博客是放在 `#home-hero-after` 中。

首先在 `template` 中建立 Canvas 画布，并定义好样式：

::: code-group
```html [template]
<canvas
    class="canvas"
    ref="canvasRef"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
/>
```

```css [style]
.canvas {
    width: 100%;
    height: 100%;
    display: block;
    background: transparent;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
}
```
:::

以下是一些关键的方法：
```javascript
// 生成指定范围的整数
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// 以下是 methods
// 初始化画布
initCanvas() {
    const canvas = this.$refs.canvasRef;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    this.ctx = canvas.getContext('2d');
    this.ctx.clearRect(0, 0, width, height);
},

// 随机生成位置、形状、尺寸、透明度、颜色、描边或填充
// !! 兼容手机端，需要根据窗口尺寸适当调整尺寸
generateParams() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const emptyX = width > 400 ? 50 : 0;
    const emptyYFront = height > 550 ? 300 : 50;
    const emptyYRear = height > 640 ? 120 : 0;
    const r = getRandomInt(10, 25);
    const x = getRandomInt(emptyX, width - r * 2 - emptyX);
    const y = getRandomInt(emptyYFront, height - r * 2 - emptyYRear);
    const red = getRandomInt(0, 255);
    const green = getRandomInt(0, 255);
    const blue = getRandomInt(0, 255);
    const opacity = Math.random() * 0.05 + 0.05;
    const color = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    const isStroke = Math.random() > 0.5;
    return { x, y, r, color, isStroke };
},

// 画方形
drawRect() {
    const { x, y, r, color, isStroke } = this.generateParams();
    if (isStroke) {
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, r * 2, r * 2);
    } else {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, r * 2, r * 2);
    }
},

// 画圆形
drawArc() {
    const { x, y, r, color, isStroke } = this.generateParams();

    this.ctx.beginPath();
    if (isStroke) {
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
    } else {
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    this.ctx.closePath();
},

// 初始化以及响应尺寸变化时重复执行的方法
resize() {
    this.initCanvas();

    // !! 根据窗口尺寸适当调整密度
    const width = window.innerWidth;
    const density = width > 640 ? 50 : 15;

    for (let i = 0; i < density; i++) {
        this.drawArc();
    }
    for (let i = 0; i < density; i++) {
        this.drawRect();
    }
},
```

::: tip
以上，效果见博客首页。
:::
