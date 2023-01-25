---
title: VitePress 深度折腾
updateTime: '2023/02/25'
---

## 前言及介绍
2019年年初，写了篇[「VuePress 折腾记」](/ARCHIVE/vuepress-play-around)，一晃快4年过去。

这次更新博客，选用了同为尤大出品的 [VitePress](https://vitepress.vuejs.org/)。如果使用过 [VuePress](https://vuepress.vuejs.org/)，你不会对这个工具感到陌生，并会惊讶地发现，核心功能和使用习惯十分相似。

## 官方文档

官方介绍：`VitePress` 简单、强大、高效。它是 `VuePress` 的小弟，但基于 `Vite`。

官方特别解释了下（[Motivation](https://vitepress.vuejs.org/guide/what-is-vitepress.html#motivation)），为什么有 `VuePress` 又搞了个 `VitePress`：

翻译一下就是：**我们是爱 VuePress@v1 的，可webpack它慢啊。**


[官方帮助文档](https://vitepress.vuejs.org/guide/getting-started)，一如既往地贴心，几乎是在手把手地教了。所以文档有说明的，这里就不再赘述，会直接援引。

截止本文完成，`VitePress` 最新版本为 `1.0.0-alpha.40`。

## 自定义主题
虽然没有了插件机制，但我觉得自定义的自由度还是极高的（换言之，就是要好多个性化的地方需要手动编码的意思）。详见 [Theme Introduction](https://vitepress.vuejs.org/guide/theme-introduction)。

这里举一个小例子：[VitePress 自定义更新日期显示](/CODES/vitepress-last-updated.html)。

## 发布设置
一般文档，写到构建完成就该差不多了。可 `VitePress` 相当认真地，写了在好几种平台上的部署方案。详见 [Deploying](https://vitepress.vuejs.org/guide/deploying)。

本博客同时发布到 Github 与 Gitee，有对比就伤害，差距太大了。

Github 你只需要配置好 GitHub Actions，每次 git push 后就可以自动发布。当然，前提是你已本地测试完善没有构建错误，也没有文章死链等。

Gitee 这边的免费服务就没那么好用了。要自动发布？有个“流水线”不知道好不好用，反正收费。自定义域名？收费。每次发布的过程中，Gitee Pages 还会有中国特色的“内容审查”，发布时会提示查出问题，可只告诉你是哪页内容，而不告诉你有什么问题。谁知道那些落后的关键词匹配法，会包括哪些敏感词？

## 内容导航 
从 `VuePress` 到 `VitePress`，都没有一个官方的导航链接构造工具。这是我没有想到的。那就自己来吧。

参见：[VitePress 自动内容导航](/CODES/vitepress-navigation.html)

## 首页推荐列表
个人博客毕竟不需要像某个开源库一样，在首页放一堆吸引人来使用和加入的广告语及特性介绍。所以要么就直接不要首页，要的话放一个推荐、最新文章列表就好了。

同样地，这样的模块也是不想每次都手动整理的。

参见：[VitePress 自动内容推荐](/CODES/vitepress-recommendation.html)

## 评论系统
作为一个静态博客，博客本身是无法实现评论互动的。既然博客的内容存放在代码仓库中，并使用他们提供的 **Pages 功能，评论自然也可以使用代码 issues 来进行互动。

以前使用 `VuePress` 时是引用了别人写好的一个插件来实现的，费了不少功夫，效果和稳定性一般。这次改版干脆自己来写一下评论应用好了。

参见：

[Github 应用实现博客评论](/CODES/vitepress-github-issues.html)