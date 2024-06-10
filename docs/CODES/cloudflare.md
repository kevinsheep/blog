---
title: 博客搬家到 CLOUDFLARE 啦！
updateTime: 2024/06/08
tags: Blog|CLOUDFLARE
---

## Intro
GitHub Pages 在国内访问实在太慢了。

慢到，静态网站的优势全无；慢到，我时常怀疑自己断网了；慢到，首页的JS特效有时要半分钟后才出现；慢到，一张几十 KB 的图片都是一截一截加载显示的。

除了 GitHub Pages，其实选择还是挺多的。当然，Gitee Pages 就别提了，一开始找替代品时就用过，被众所周知的审核机制，以及不能白嫖自定义域名劝退。

网上翻了下评测，综合考虑换到 CLOUDFLARE。

控制台**不用翻墙**，就能快速访问，这点很重要；全球 CDN 加速；支持从 Github/Gitlab 等平台自动部署……

## 注册 & 设置
发现语言切换列表支持繁简中文，对中国用户友好。尽管部分内容翻译得怪怪的。

常规邮件注册、邮箱验证，就可以正常使用。

直奔 Workers & Pages，创建应用，选创建新页面。可以直接 Connect to Git，选择仓库和分支，十分便捷。

评测有提及“部署速度较慢”，而且也不想重新再配置一轮构建细节了。于是仍然使用 GitHub 进行构建，而将构建结果 `gh-pages` 分支引入到 CLOUDFLARE。

首次部署十分顺利地完成，并且告知我可通过 https://blog-7zn.pages.dev 进行访问。

## 自定义域名
自动分配的域名太长，也没有想要的含义。还是需要使用自己的域名的。

设置自定义域名前，要求先修改 DNS 服务，使用 CLOUDFLARE 的。

发现不能像 GitHub Pages 那样，添加为 A 记录，有点失望。不过 CNAME 也行，于是添加好 `@` 指向 `blog-7zn.pages.dev`。

本来，按 DNS 规范，根域名是不能设置 CNAME 记录的。但 CLOUDFLARE 炫耀地提示我，他们使用 CNAME flattening 技术，可以实现这种解析，并且号称解析能提速 30%，以弥补自定义域名不是 A 记录的不足。🙃

## 更新部署测试
在本地修改博客文章，提交代码，触发 GitHub Actions，23秒构建完成。

CLOUDFLARE 监听到 `gh-pages` 分支变化后，12秒部署完成。不知道算不算慢，但关系不大啦！

大功告成！