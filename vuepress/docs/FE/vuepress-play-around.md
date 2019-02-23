---
updateTime: 2019/02/23
title: VuePress 折腾记
---

## 前言及介绍
VuePress 是一款静态网站生成器，自带一套蛮耐看的网站主题，响应式适应不同尺寸的浏览设备。  
支持 Markdown；由于是基于 Vue 开发，直接就支持各种好用的 Vue 特性；一行命令自动生成静态站，并且能结合脚本自动发布到 Github Pages。  
作者开发这个工具的初衷，是为了“爽爽地撸文档”。也就是说这个天生适合写技术文档。但目前对博客的支持还不太完善，很多东西需要自己处理。  
但对于静态化管理的个人博客，这个是不错的解决方案了。  

我入坑时已是在开发 1.x 版了。大概了解了下，就把新版博客迁移到 VuePress 上。

## 官方文档
使用时应该认真查阅相关的帮助文档及 API。  
更新最快的[英文原版文档](https://vuepress.vuejs.org/)。  
而毕竟 Vue/VuePress 作者及目前 VuePress 的主要贡献者都是中国人嘛，所以中文化支持还是比较好的，入门或英文不好的，也可以看[中文文档](https://vuepress.vuejs.org/zh/)。

## 相关插件
[Gitalk](https://gitalk.github.io/)，基于 Github issue 的评论系统。