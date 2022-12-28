import{_ as e,o as r,c as t,a}from"./app.826cdb19.js";const g=JSON.parse('{"title":"VitePress 深度折腾","description":"","frontmatter":{"title":"VitePress 深度折腾","updateTime":"2022/12/28"},"headers":[{"level":2,"title":"前言及介绍","slug":"前言及介绍","link":"#前言及介绍","children":[]},{"level":2,"title":"官方文档","slug":"官方文档","link":"#官方文档","children":[]},{"level":2,"title":"自定义主题","slug":"自定义主题","link":"#自定义主题","children":[]},{"level":2,"title":"发布设置","slug":"发布设置","link":"#发布设置","children":[]},{"level":2,"title":"内容导航","slug":"内容导航","link":"#内容导航","children":[]},{"level":2,"title":"首页推荐列表","slug":"首页推荐列表","link":"#首页推荐列表","children":[]},{"level":2,"title":"评论系统","slug":"评论系统","link":"#评论系统","children":[]}],"relativePath":"CODES/vitepress-play-around.md","lastUpdated":1672236013000}'),s={name:"CODES/vitepress-play-around.md"},i=a('<h2 id="前言及介绍" tabindex="-1">前言及介绍 <a class="header-anchor" href="#前言及介绍" aria-hidden="true">#</a></h2><p>2019年年初，写了篇<a href="/ARCHIVE/vuepress-play-around.html">「VuePress 折腾记」</a>，一晃快4年过去。</p><p>这次更新博客，选用了同为尤大出品的 <a href="https://vitepress.vuejs.org/" target="_blank" rel="noreferrer">VitePress</a>，如果使用过 <a href="https://vuepress.vuejs.org/" target="_blank" rel="noreferrer">VuePress</a>，你不会对这个工具感到陌生，并会惊讶地发现，核心功能和使用习惯十分相似。</p><h2 id="官方文档" tabindex="-1">官方文档 <a class="header-anchor" href="#官方文档" aria-hidden="true">#</a></h2><p>官方介绍：<code>VitePress</code> 简单、强大、高效。它是 <code>VuePress</code> 的小弟，但基于 <code>Vite</code>。</p><p>官方特别解释了下（<a href="https://vitepress.vuejs.org/guide/what-is-vitepress.html#motivation" target="_blank" rel="noreferrer">Motivation</a>），为什么有 <code>VuePress</code> 又搞了个 <code>VitePress</code>：</p><blockquote><p>我们是爱 VuePress@v1 的，可webpack它慢啊。</p></blockquote><p><a href="https://vitepress.vuejs.org/guide/getting-started" target="_blank" rel="noreferrer">官方帮助文档</a>，一如既往地贴心，几乎是在手把手地教了。所以文档有说明的，这里就不再赘述，会直接援引。</p><p>截止本文完成，<code>VitePress</code> 最新版本为 <code>1.0.0-alpha.33</code>。</p><h2 id="自定义主题" tabindex="-1">自定义主题 <a class="header-anchor" href="#自定义主题" aria-hidden="true">#</a></h2><p>虽然没有了插件机制，但我觉得自定义的自由度还是极高的（换言之，就是要好多个性化的地方需要手动编码的意思）。详见 <a href="https://vitepress.vuejs.org/guide/theme-introduction" target="_blank" rel="noreferrer">Theme Introduction</a>。</p><p>这里举一个小例子：<a href="/CODES/vitepress-last-updated.html">VitePress 自定义更新日期显示</a>。</p><h2 id="发布设置" tabindex="-1">发布设置 <a class="header-anchor" href="#发布设置" aria-hidden="true">#</a></h2><p>一般文档，写到构建完成就该差不多了。可 <code>VitePress</code> 相当认真地，写了在好几种平台上的部署方案。详见 <a href="https://vitepress.vuejs.org/guide/deploying" target="_blank" rel="noreferrer">Deploying</a>。</p><p>本博客同时发布到 Github 与 Gitee，有对比就伤害，差距太大了。</p><p>Github 你只需要配置好 GitHub Actions，每次 git push 后就可以自动发布。当然，前提是你已本地测试完善没有构建错误，也没有文章死链等。</p><p>Gitee 这边的免费服务就没那么好用了。要自动发布？有个“流水线”不知道好不好用，反正收费。自定义域名？收费。每次发布的过程中，Gitee Pages 还会有中国特色的“内容审查”，发布时会提示查出问题，可只告诉你是哪页内容，而不告诉你有什么问题。谁知道那些落后的关键词匹配法，会包括哪些敏感词？</p><h2 id="内容导航" tabindex="-1">内容导航 <a class="header-anchor" href="#内容导航" aria-hidden="true">#</a></h2><p>从 <code>VuePress</code> 到 <code>VitePress</code>，都没有一个官方的导航链接构造工具。这是我没有想到的。那就自己来吧。</p><p>参见：<a href="/CODES/vitepress-navigation.html">VitePress 自动内容导航</a></p><h2 id="首页推荐列表" tabindex="-1">首页推荐列表 <a class="header-anchor" href="#首页推荐列表" aria-hidden="true">#</a></h2><p>个人博客毕竟不需要像某个开源库一样，在首页放一堆吸引人来使用和加入的广告语及特性介绍。所以要么就直接不要首页，要的话放一个推荐、最新文章列表就好了。</p><p>同样地，这样的模块也是不想每次都手动整理的。</p><p>参见：<a href="/CODES/vitepress-recommendation.html">VitePress 自动内容推荐</a></p><h2 id="评论系统" tabindex="-1">评论系统 <a class="header-anchor" href="#评论系统" aria-hidden="true">#</a></h2><p>作为一个静态博客，博客本身是无法实现评论互动的。既然博客的内容存放在代码仓库中，并使用他们提供的 **Pages 功能，评论自然也可以使用代码 issues 来进行互动。</p><p>以前使用 <code>VuePress</code> 时是引用了别人写好的一个插件来实现的，费了不少功夫，效果和稳定性一般。这次改版干脆自己来写一下评论应用好了。</p><p>参见：</p><p><a href="/CODES/vitepress-github-issues.html">Github Issues 应用实现博客评论</a></p>',29),d=[i];function l(p,h,o,n,c,u){return r(),t("div",null,d)}const _=e(s,[["render",l]]);export{g as __pageData,_ as default};
