---
updateTime: 2019/03/03
title: VuePress 折腾记
---

## 前言及介绍
VuePress 是一款静态网站生成器，自带一套蛮耐看的网站主题，响应式适应不同尺寸的浏览设备。
支持 Markdown；由于是基于 Vue 开发，天生支持各种好用的 Vue 特性；一行命令即可自动生成静态网站，并且能结合脚本自动发布到 Github Pages。
作者开发这个工具的初衷，是为了“[爽爽地写文档](https://weibo.com/1761511274/Gc2gCAjHW)”。也就是说这个天生适合写技术文档。
我关注到时，本来是想找一个博客管理平台/工具的。vuepress对博客的支持并不完善，很多东西需要自己处理。但对于静态化管理的个人博客，这个是不错的解决方案了。

我入坑时已是 1.x 版。大概了解了下，就把新版博客迁移到 VuePress 上。

下文内容，假定你已经：
1. 注册好自己的域名，有自己的 Github Pages 并作好相关配置
2. 已阅读了官方文档或能自己查阅对应的内容
3. 了解 webpack 的基本配置或能自己查阅对应的内容
4. 熟悉 Javascript 和 CSS 知识，包括 ES6、ES7、CSS3，了解 CSS 预处理框架 stylus 或能自己查阅对应的内容
5. 对 node.js 有所了解，并对一些偶然的使用可自己查阅对应的内容

## 官方帮助文档
使用时应该认真查阅相关的帮助文档及 API。
更新最快的[英文原版文档](https://vuepress.vuejs.org/)。
也可以看[中文文档](https://vuepress.vuejs.org/zh/)，毕竟 Vue/VuePress 作者及目前 VuePress 的主要贡献者都是中国人嘛，所以中文化支持还是比较好的。

## 添加博客文档
原创内容是一个技术博客最重要的组成部分。
VuePress 作者是为了爽爽地写文档，并顺便造福了广大同行。我使用它也是为了能集中精力写一些有意思的东西的。
一个 `*.md` 文件即相当于一篇文章，这于以前用的 Jeykll 的方式是一样的，支持 Markdown 语法。在 Vuepress 里， `*.md` 还支持里面直接使用 Vue。

## 样式修改
按官方文档部署好站点，试了下添加文档后，下一件事就是测试样式修改，各种想改的地方都先不考虑美观折腾下。如果很难操作，不便于个性化修改的话，那还搞什么个人博客？应该及早弃坑了。
我来到这一步时，走了些弯路：一开始测试时，安装完又卸载，版本后来都没留意了。在正式的 blog 目录用的是 0.x 版，但我一直以为自己是用 1.x 版，于是查阅的是 1.x 的官方文档。
结果这两个版本的推荐目录结构并不一致，于是加了 `*.styl` 文件后反复试都没效果。当察觉这一问题时，已经是两天后了，浪费了不少时间。

::: warning 提醒
在**安装**这一步时，一定要留意自己所安装的版本哦！
:::

```bash
yarn global add vuepress # 或者：npm install -g vuepress，全局安装，安装的是 0.x 版本
yarn add -D vuepress@next # 或者：npm install -D vuepress@next，局部安装，安装的是 1.x 版本
```

#### 公共样式“调色板”
```stylus
// ~/.vuepress/styles/palette.styl
$accentColor = #080 //主色调
$textColor = #444 //默认文字颜色
$contentWidth = 1000 //内容区最大宽度
// $borderColor、$codeBgColor，就如命名一样了，本博客暂未改变
```

#### “弹出”（Eject）默认样式进行个性化修改
使用覆盖式的定义，限制还是蛮多的。样式的优先级也往往并非预期。这个样式权重机制并没有深究，直接复制一份默认主题样式来修改即可。
我自己是手动复制、配置的。也可以使用官方介绍的方法：[Ejecting](https://v1.vuepress.vuejs.org/theme/default-theme-config.html#ejecting)

::: tip 官方样式升级
文档中强调：一旦你使用 Eject 的样式，将无法获得官方的更新及 Bugs 的补丁。
这个说法当然也是相对而言的。意思是，你要手动升级了。用个对比工具，耐心看看更新了什么，手动同步下即可。还能从中看到大牛们造的轮子是如何逐渐完善的。
:::

#### 首页“内容搜索框”修改
在博客的首页，我并不想要一个时刻完整的搜索框。最好就是只有一个图标，想使用搜索功能时，才会展开完整的输入框。
为了实现这一功能，我直接修改了主题样式：

```stylus
// ~/.vuepress/theme/styles/theme.styl
.indexPage
  .search-box
    input
      width 0
      border-color transparent
      padding-right 0
      cursor pointer
      &:focus
        width 10rem
        border-color #3eaf7c
        cursor text
```

其中 `.indexPage` 是首页的自定义 CSS 类名。
```yaml
---
home: true
pageClass: indexPage
---
```

原本的“放大镜”图标样式略粗犷，顺便换了它。
计划是引入 `Iconfont`，但目前只定义一个图标，引入一个新库不太好。于是自定义了一个图标

```stylus
// ~\theme\styles\theme.styl
.iconfont
.search-box
  &:before
    font-family "iconfont"
    font-size 1rem
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    content "\e604"
    margin-right -1.8rem
  &:hover
    font-weight bolder
  input
    background none

@font-face
  font-family "iconfont"
  src url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALEAAsAAAAABnQAAAJ5AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAp8gREBNgIkAwgLBgAEIAWEbQcxG7gFyB6SJEWqktjmsQ7MRGIgHvrf73977plvIvFH0SyayHgokF4FT4WQKUVXF8ua7v/N6S+BEfd8qJVDVkUd+Jfw5V1+R37CkRHoJjtXtbqB2lQrJxzBBpxYroFNvPr+/1yO766AApn/+ZXLHJMm9QKMAwporE2RFUjoDWMXvMDjBNpNU+SOd456UJXscYF46LsmVAteKVmiVWhuWJriNTRprZ7kX4BX0ffjl3ZUqTQVdsnZ7W0H1r4WnZTS+G+4Fejh3XJmsFUUbAJJXDVGTxQEIxW0MxbNAykDX7OuA704qkawv87O7wSTkPtMPI//qPgKJPnMA/uImNeU9s7OR5dPGdyM9K8a+fvg48fw/Vv/3eu5K+7F7HzXD++rnfJ+Ppn81x4LdVkKxvn3V3wujgPxmLIzNmTBkmbh+rbMvxR8/N18dpt3xdln5+1svrefCZbe/Mye7d/VRoJPD/4/RSNqJaFsAq07twU/iTewIQ2BratS4zUmK/MKJy9r144asLPf11Tl0B0lQ6uh+7K3mMqgaLWIJHETmnTYgmat9qDdht3VHQZIBZFtWHcBIPR6hEq3t1D0miJJ/IQmw76hWW8UoN1NDGzZYTn8+pFEk9Bh1hnzbZFw10D1uLCD7igyZV4QkQcoMz/AWppRTuxignKJGdmx2ybijEsRsx1wGkaRYKkUAdqkeUTpgq7zpjdptoih7oiETAQ5GMsZxmcTEjxoTeqVz3cg10jEJDvq6swDSMr4nTMtGmMAsitNBtU9yiuZY642QjiGk4QYswMGoUhEYNLmQQFkIxpvQji1QHea8aFSbXt5/HfboJ2tqsLpW7Q8FiIWIwIA') format('woff2')
```

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

然后，每次写完文档或更新完内容，执行 `yarn release` 或 `npm release` 即可。

## 内容导航
在 `~/docs/` 简单分一下文件夹后，往里面放 Markdown 文档，就会自动发布出来了。
不过默认的导航系统并不能满足全部需求。稍作加工：

#### 自动生成 `config.js` 中的配置数据
VuePress 配置文件中，需要手动指定顶部及侧边的父级导航。虽然这个也不是经常会变动，但还要手动改，总觉得麻烦啊！
用 `node.js` 撸了下，实现自动生成：

```javascript
// 新增 [fslist.js]
const YAML = require('yamljs')
const fs = require('fs')

/**
 * @description 取得文件夹中的文章列表元数据
 */
module.exports = function fslist(folder) {
    const path = './docs/' + folder + '/';
    const files = fs.readdirSync(path);
    let list = [];
    for (let item of files) {
        let file = {}
        file.filename = item.split('.').slice(0, -1).join('.')
        if (file.filename.toLowerCase() === "readme") {
            continue
        }

        let stat = fs.statSync(path + item)
        let fstr = fs.readFileSync(path + item).toString().replace('\r\n', '')
        file.createTime = stat.birthtime
        file.mTime = stat.mtime
        if (fstr.indexOf('---') !== -1) {
            let cstr = fstr.split('---')
            let fobj = YAML.parse(cstr.length ? cstr[1] : cstr[0])
            file.title = fobj.title
            file.description = fobj.description
            file.pic = fobj.pic
        }
        fs.closeSync(2)

        list.push(file)
    }
    return list;
}

// [config.js]
const fslist = require('./fslist.js')

// 取得顶部导航所需的配置数据
function getSubNav(folder) {
    const fs = fslist(folder)
    return fs.map(item => {
        return folder + item.filename
    })
}

// 取得侧边导航所需的配置数据
function getSidebar(cols) {
    let obj = {}
    cols.forEach(item => obj[item.link] = [{
        title: item.text,
        collapsable: false,
        children: getSubNav(item.link)
    }])
    return obj
}

const columns = [
    { text: '前端', link: '/FE/' },
    { text: '观点', link: '/VIEWPOINT/' },
    { text: '杂谈', link: '/ESSAY/' },
    { text: '关于', link: '/ABOUT/' }
]

module.exports = {
    // 省略其他配置
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            ...columns
        ],
        sidebar: getSidebar(columns)
    },
    dest: '../docs/'
}
```

#### 首页推荐列表
目前还不想像 Vue/Vuepress 一样放大大的标语、介绍在首页，而是想直入主题，放上推荐/最新博文的列表即可。
同样没有找到这方面的内置组件，就利用“[全局计算属性](https://v1.vuepress.vuejs.org/guide/global-computed.html)” `this.$site.pages` 构造了一个想要的列表出来。
在首页文件 `README.md` 直接使用 Vue。

```vue
// ~/docs/README.md
<template>
    <ol>
        <li v-for="(item, index) in list" :key="index" @click="go(item)">
            <span class="dir">{{ nav[item.dir] }} /</span> <!--匹配当前文章所属栏目-->
            <span class="tit">{{ item.title }}</span>
            <span class="date">{{ item.frontmatter.updateTime }}</span>
            <div class="intro" v-if="item.excerpt" v-html="item.excerpt"></div>
        </li>
    </ol>
</template>

<script>
export default {
    computed: {
        list () {
            let res = this.$site.pages
                .filter(item => item.regularPath.indexOf(".html") !== -1) //只显示内容页，不显示栏目首页
                .sort((a, b) => {
                    const av = a.frontmatter.updateTime ? new Date(a.frontmatter.updateTime).valueOf() : 0
                    const bv = b.frontmatter.updateTime ? new Date(b.frontmatter.updateTime).valueOf() : 0
                    return bv - av //模糊比较，倒序排列，此处未对非预期日期格式作兼容处理
                })
                .filter((item, index) => index < 15) //显示最新15条
                .map(item => {
                        item.dir = '/' + item.path.split('/')[1] + '/'
                        return item
                    })
            return res
        },

        //栏目数组
        nav () {
            const n = this.$site.themeConfig.sidebar
            let res = {}
            for(let key in n) {
                res[key] = n[key][0].title
            }
            return res
        }
    },

    methods: {
        go(item) {
            location.href = item.path
        }
    }
}
</script>
```

## Markdown 扩展配置
VuePress 使用 markdown-it 将代码渲染为 markdown 格式，并暴露了扩展的接口，在 `.vuepress/config.js` 中可以自定义 markdown-it 实例的配置，增加 markdown-it 插件。
比如本站目前使用了简单但好用的两个插件：
1. markdown-it-center-text，用于内容居中显示的……虽然 markdown 的并不是为了富文件样式开发的，但“对齐方式”这么重要的功能缺失，会很麻烦。
2. mdfigcaption，用于显示图片标题……这也是常用功能，markdown/markdown-it 预留了填写的格式，但并没有实现，说是实验中的功能。

```javascript
// ~/.vuepress/config.js
module.exports = {
    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-center-text'))
            md.use(require('mdfigcaption'))
        }
    }
}
```

以上插件只实现了 html 结构的生成，还需要自己去定义一下对应的 css 样式。

```stylus
// ~/theme/styles/theme.styl
.content:not(.custom)
  img
    display block
    max-width 100%
  .text-align-center
    text-align center
  figure
    display inline-block
    text-align center
    margin 0 0 1rem
    figcaption
      background-color #f7f7f7
      color $accentColor
      font-size .8rem
      padding .4rem
```

另外，希望页面上的“段落换行”能体现到渲染出来的实际文本中，而不用在每行后面敲两个空格。敲了蛮久的空格，才在 [markdown-it API 文档](https://markdown-it.github.io/markdown-it) 中发现是可以配置的。

```javascript
// ~/.vuepress/config.js
module.exports = {
    markdown: {
        extendMarkdown: md => {
            md.set({ breaks: true }) //将段落中的 '\n' 转换为 <br>
        }
    }
}
```

## 评论系统
曹操兵败，在马上大笑三声，尚且需要个人陪笑呢！博客怎么能没有个与访客交互的地方？
静态网站的评论最好是依附一些已有的资源。几番比较后选定了 [Gitalk](https://gitalk.github.io/)，基于 Github issue。
下面简单说说一些使用的要点。

首先还是要仔细看看[官方文档](https://github.com/gitalk/gitalk)；
然后需要获取一个 [GitHub Application 授权](https://github.com/settings/applications/new)；
在内容页组件中引入 Gitalk，并在合适的地方（一般在底部）放置一个包裹容器。

```vue
// ~/.vuepress/theme/components/Page.vue
<template>
  <main class="page">
    <!-- 省略其他内容 -->
    <div id="gitalk-container"></div>
    <slot name="bottom"/>
  </main>
</template>

<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
</script>
```

在 [enhanceApp.js](https://v1.vuepress.vuejs.org/guide/global-computed.html) 中增加应用级别的功能：

```javascript
// ~/.vuepress/enhanceApp.js
function createGitalk (commentID) {
  if (typeof window === 'undefined') { //只在浏览器中运行，以免发布时出错
    return
  }

  const gitalk = new Gitalk({
    clientID: '这里填写申请到的clientID',
    clientSecret: '这里填写申请到的clientSecret',
    repo: 'blog',
    owner: 'kevinsheep',
    admin: ['kevinsheep'],
    id: commentID,
    distractionFreeMode: true
  })

  const gtBox = document.querySelector('#gitalk-container')

  if (gtBox) {
    gtBox.innerHTML = "" //清空之
    gitalk.render('gitalk-container')
  }
  else {
    window.onload = () => {
      gitalk.render('gitalk-container')
    }
  }
}

export default ({
  Vue,
  options,
  router, // 当前应用的路由实例
  siteData
}) => {
  router.afterEach((to, from) => {
    if (to.fullPath.split('#')[0] === from.fullPath.split('#')[0]) { //页面内的路由变化不作处理
      return
    }
  
  const pn = to.fullPath.split('/')
    const cid = pn[pn.length - 1].split('.')[0]
    createGitalk(cid)
  })
}
```