---
updateTime: 2019/02/23
title: VuePress 折腾记
---

## 前言及介绍
VuePress 是一款静态网站生成器，自带一套蛮耐看的网站主题，响应式适应不同尺寸的浏览设备。  
支持 Markdown；由于是基于 Vue 开发，天生支持各种好用的 Vue 特性；一行命令即可自动生成静态网站，并且能结合脚本自动发布到 Github Pages。  
作者开发这个工具的初衷，是为了“[爽爽地写文档](https://weibo.com/1761511274/Gc2gCAjHW)”。也就是说这个天生适合写技术文档。  
我关注到时，本来是想找一个博客管理平台/工具的。vuepress对博客的支持并不完善，很多东西需要自己处理。但对于静态化管理的个人博客，这个是不错的解决方案了。  

我入坑时已是 1.x 版。大概了解了下，就把新版博客迁移到 VuePress 上。  

以下内容，假定你已经：
1. 注册好自己的域名
2. 有自己的 Github Pages 并作好相关配置
3. 已阅读了官方文档或能自己查阅对应的内容
4. 了解 webpack 的基本配置或能自己查阅对应的内容

## 官方文档
使用时应该认真查阅相关的帮助文档及 API。  
更新最快的[英文原版文档](https://vuepress.vuejs.org/)。  
而毕竟 Vue/VuePress 作者及目前 VuePress 的主要贡献者都是中国人嘛，所以中文化支持还是比较好的，入门或英文不好的，也可以看[中文文档](https://vuepress.vuejs.org/zh/)。

## 样式修改
[TODO]

## 发布设置
这里没有使用官方文档中示例的 bash 脚本，而是使用 node + execa 执行 js 脚本
```javascript
const execa = require('execa')
const inquirer = require('inquirer')

const release = async () => {
  console.log("========== release begin")

  //先 build 一下新内容
  await execa('vuepress', ['build', 'docs'], { stdio: 'inherit' })

  //由于 build 时所有内容被清空了，Github Pages 相关的域名设置也被清空，于是得每次生成一下
  await execa.shell('echo ceil.top > ../docs/CNAME');

  //使用 inquirer，每次发布新 docs 还是写一下备注吧，否则每次都一样……
  //这里如果打算实现无值守的发布，就不必放了，没有 commit 备注就没有吧
  const { msg } = await inquirer.prompt([{
    name: 'msg',
    message: `Enter Commit Message:`,
    type: 'input'
  }])

  //如果不想填时就弄个默认值
  const cmsg = msg || 'via release.js'
  
  //一系列 git 推送操作，这个一时没想到怎样优化好，先这样了
  await execa('git', ['add', '-A'])
  await execa('git', ['commit', '-m', cmsg], { stdio: 'inherit' })
  await execa('git', ['push'], { stdio: 'inherit' })

  await console.log("========== release end")
}

release().catch(err => {
  console.error(err)
  process.exit(1)
})
```

在 `~/package.json` 中，加上相关的脚本指令
```javascript
"scripts": {
    "release": "node release.js"
}
```

然后，每次写完文档或更新完内容，执行 `yarn release` 或 `npm release` 就好了。

## 内容导航
[TODO]

## 评论系统
[TODO]
相关插件：[Gitalk](https://gitalk.github.io/)，基于 Github issue。