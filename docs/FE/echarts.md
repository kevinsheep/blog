---
title: ECHARTS 代码片段
updateTime: 2019/01/25
---

[官方网站](https://echarts.baidu.com/)上各种示例、配置接口文档、社区生态链接及为详尽。  
地图数据很常用，**因故**在官网下架，但还是能找到，比如[GitHub](https://github.com/apache/incubator-echarts/tree/master/map)

## 图表初始化或重载配置
```javascript
const option = {}//配置数据，需要预定义好
const CHART_HEIGHT = 650
const dom = document.getElementById("echartBox")
let ecInst = echarts.getInstanceByDom(dom)
if (! ecInst) {
    ecInst = echarts.init(dom, "", {height: CHART_HEIGHT})
}
else {
    ecInst.clear() //清空已有图形缓存
}
ecInst.setOption(option)
```

## 图表响应页面宽度变化
```javascript
//就是这么简单，却是一个很重要的控制，应该默认就带上
//ecInst 假定已获取好
window.onresize = () => {
  ecInst.resize()
}
```