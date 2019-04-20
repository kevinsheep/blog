---
updateTime: 2019/03/03
---

# Webpack简明学习[TODO]

## 介绍
搞前端的人，估计没有未听说过 [webpack](https://webpack.github.io/) 的吧？说webpack开创了一个新的前端发展时代，毫不为过。
但 webpack 并不是那么易于学习。文档长，配置项多，部分文档用语并不是针对初学者，以致不少人望而生畏。甚至有人只是用着各种相关的插件和工具，复制着网上文章中的配置代码到自己的项目中，但实际上并不知道为什么要这样做。
众所周知，webpack 是一个打包工具。然而什么是打包工具？它为什么而存在？它有什么不同的用法？为什么需要这么多的配置项？
本文参考自[webpack 中文文档](https://www.webpackjs.com/)，力求用最简洁的表达把最基本的要掌握的内容用一篇文章列出来。

## 介绍
什么是 webpack？不就打个包嘛，和 winrar 的“打包”有什么不同？

## 常用的命令有什么不同
npm install --save-dev 
npm install --save
npm install -D

## 那一个又一个的插件有什么用？
file-loader 就够了，为什么又要有 image-webpack-loader 和 url-loader