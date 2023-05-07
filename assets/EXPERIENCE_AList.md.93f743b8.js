import{_ as s,o as a,c as t,O as e}from"./chunks/framework.19e0a886.js";const n="/assets/docs/AList01.png",r="/assets/docs/AList02.png",o="/assets/docs/AList03.png",g=JSON.parse('{"title":"基于AList部署私有云盘","description":"","frontmatter":{"title":"基于AList部署私有云盘","updateTime":"2023/04/24","tags":"AList|Cloud Storage"},"headers":[],"relativePath":"EXPERIENCE/AList.md","filePath":"EXPERIENCE/AList.md","lastUpdated":1683471901000}'),p={name:"EXPERIENCE/AList.md"},l=e('<h2 id="intro" tabindex="-1">Intro <a class="header-anchor" href="#intro" aria-label="Permalink to &quot;Intro&quot;">​</a></h2><p>最近找了些多端文件共享和传输的方案，都不太满意。</p><p>需求是在办公电脑、家用电脑、多台手机、NAS 之间共享数据。电脑操作系统包括 Windows 和两种 Linux 发行版，手机要支持 Android 和 iOS。</p><p>用工具直传的方案兼容性比较差，要多端都支持太难了，于是改思路为通过云盘传输。可是一想到那些××网盘，就有种心悸的感觉。各种收费、限速、广告……有天忽然想到，其实我可以自己部署一个私有云盘……</p><p>试用 24.7k Star 的 <a href="https://github.com/alist-org/alist" target="_blank" rel="noreferrer">AList</a>。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>官方文档相当完善，找到<a href="https://alist.nn.ci/zh/guide/install/" target="_blank" rel="noreferrer">安装介绍</a>页面，扫了一遍，直接用“一键脚本”最简单了。</p><p>ssh 打开我的服务器终端，输入安装脚本：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-fsSL</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://alist.nn.ci/v3.sh</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>我转头再看一眼文档的功夫，它就安装好了。终端会输出一些基本的信息，包括访问地址、配置文件路径、管理员账号和密码；信息后面是一些常用的操作，包括状态查看、启动服务、重启服务、停止服务。</p><h2 id="设置及使用" tabindex="-1">设置及使用 <a class="header-anchor" href="#设置及使用" aria-label="Permalink to &quot;设置及使用&quot;">​</a></h2><p>打开访问地址，发现提示无法访问，到服务器的安全组中设置好端口访问权限，再次访问，部署成功：</p><p><img src="'+n+'" alt="AList Home"></p><p>但提示还没有配置存储内容。点下面的[管理]链接进入后台配置。进入[存储]中。AList 支持<a href="https://alist.nn.ci/zh/guide/drivers/" target="_blank" rel="noreferrer">相当多的网盘、云盘服务</a>。先简单添加一个本机存储测试一下。按表单配置好挂载路径（服务访问的路径）、文件夹路径（服务器对应的路径）等，保存。</p><p><img src="'+r+'" alt="Storage Setting"></p><p>到首页查看，发现已经可以访问设置好的文件夹了。右下角多了一排相关操作按钮。</p><p>上传、下载，电脑端、手机端测试了一通，基本达到预期效果。</p><p><img src="'+o+'" alt="Usage"></p><h2 id="后记" tabindex="-1">后记 <a class="header-anchor" href="#后记" aria-label="Permalink to &quot;后记&quot;">​</a></h2><p>优点，得益于这个开源工具的功能齐全以及操作便利，相当于可以把多种网盘工具聚合在一起使用，并且在多种终端上传、下载，甚至可以当一个“文件剪贴板”来使用。</p><p>不足，受限于服务器的带宽和流量，不适合将大文件以“本地存储”的形式放到服务器上。</p>',21),i=[l];function c(d,h,_,A,u,m){return a(),t("div",null,i)}const b=s(p,[["render",c]]);export{g as __pageData,b as default};
