---
title: 基于AList部署私有云盘
updateTime: 2023/04/24
tags: AList|Cloud Storage
---

## Intro
最近找了些多端文件共享和传输的方案，都不太满意。

需求是在办公电脑、家用电脑、多台手机、NAS 之间共享数据。电脑操作系统包括 Windows 和两种 Linux 发行版，手机要支持 Android 和 iOS。

用工具直传的方案兼容性比较差，要多端都支持太难了，于是改思路为通过云盘传输。可是一想到那些××网盘，就有种心悸的感觉。各种收费、限速、广告……有天忽然想到，其实我可以自己部署一个私有云盘……

试用 24.7k Star 的 [AList](https://github.com/alist-org/alist)。

## 安装
官方文档相当完善，找到[安装介绍](https://alist.nn.ci/zh/guide/install/)页面，扫了一遍，直接用“一键脚本”最简单了。

ssh 打开我的服务器终端，输入安装脚本：

```bash
curl -fsSL "https://alist.nn.ci/v3.sh" | bash -s install
```

我转头再看一眼文档的功夫，它就安装好了。终端会输出一些基本的信息，包括访问地址、配置文件路径、管理员账号和密码；信息后面是一些常用的操作，包括状态查看、启动服务、重启服务、停止服务。

## 设置及使用

打开访问地址，发现提示无法访问，到服务器的安全组中设置好端口访问权限，再次访问，部署成功：

![AList Home](/assets/docs/AList01.png)

但提示还没有配置存储内容。点下面的[管理]链接进入后台配置。进入[存储]中。AList 支持[相当多的网盘、云盘服务](https://alist.nn.ci/zh/guide/drivers/)。先简单添加一个本机存储测试一下。按表单配置好挂载路径（服务访问的路径）、文件夹路径（服务器对应的路径）等，保存。

![Storage Setting](/assets/docs/AList02.png)

到首页查看，发现已经可以访问设置好的文件夹了。右下角多了一排相关操作按钮。

上传、下载，电脑端、手机端测试了一通，基本达到预期效果。

![Usage](/assets/docs/AList03.png)

## 超级好用的在线预览功能
AList 内置了多种文件的[在线预览功能](https://alist.nn.ci/zh/config/preview.html)，普通的文本、图片、音视频自不在话下。它甚至支持预览 office 文件、pdf、epub 文件。

其中使用得最多的自然是 office 文件预览，该功能基于 Microsoft 或 Google 的预览页面。其中谷歌需要翻墙使用；而微软的页面限制比较多：
1. AList 站点需要以域名访问，不能是 IP 地址
2. AList 站点需要通过 80 或 443 端口访问
3. 需要预览的文件能被外网免登录访问

是不是头都大了？当然，AList 还支持使用自部署的 onlyoffice 预览。但我发现自己的弱鸟服务器，跑起 onlyoffice 服务后，资源立即耗尽，还是老老实实白嫖微软的免费预览服务吧。

作好好上述三个配置准备后，我尝试预览一个文档，发现[在 AList 中无法预览](https://github.com/alist-org/alist/discussions/594#discussioncomment-6771007)

直接使用 https://view.officeapps.live.com/op/view.aspx?src=xxx 打开文件预览，发现一切正常，再仔细查看，发现在 AList 点开的预览页，文件地址确实不太正常。

将 `$e_url` 改成 `$durl` 后，预览功能暂时正常使用。特意使用了带中文的文件名，也能正常预览。效果如下：

![Office Preview](/assets/docs/AList04.png)


## 后记
优点，得益于这个开源工具的功能齐全以及操作便利，相当于可以把多种网盘工具聚合在一起使用，并且在多种终端上传、下载，甚至可以当一个“文件剪贴板”来使用。

不足，受限于服务器的带宽和流量，不适合将大文件以“本地存储”的形式放到服务器上。
