---
title: GitHub 应用实现博客评论
updateTime: '2023/01/24'
---

以下内容系基于 VitePress + GitHub Issues，实现 GitHub Pages 静态博客的文章评论。本文或许是你能搜索到的，此应用场景下最详细的指引（当然，有可能是我没用力搜索）。

如果你使用的是 Gitee，可参考本文的关联文章「基于 Gitee 实现博客评论」。
## 创建应用
首先，到 GitHub 开发设置中，创建应用。本博客评论使用的是 GitHub Apps。

其中，常规选项卡，可获取到 `client_id` 和 `client_secret`，调用授权接口时会用到；权限和事件，可设置授权范围，注意勾选 Issues 读写权限，然后 Metadata 也会自动选上。

![OAuthApp](/assets/docs/OAuthApp.png)

## 嵌入评论组件
在博客中找一块 VitePress 预置的 `slot` 用于评论显示。评论区一般在正文之后，即 `#doc-after`。这一步很容易，基于 VitePress 的布局插槽自定义功能。文档参见 [layout-slots](https://vitepress.vuejs.org/guide/theme-introduction#layout-slots)。

```vue{6}
import Issue from './Issue.vue';

<template>
    <Layout>
        <template #doc-after>
            <Issue />
        </template>
    </Layout>
</template>
```

## 用户授权并获取授权码
需要提前在 GitHub 开发设置中，指定授权后返回地址的白名单。

![user_auth](/assets/docs/user_auth.png)

::: tip
由于评论是用于博客文档页面，那不可能逐一指定。我建立了一个 `login.md` 作为中转页，这样一来，分别指定生产环境以及本地调试环境两个地址即可。
:::

然后，在博客中，如果用户未登录，那么让用户点击访问授权链接：
```javascript{3}
const client_id = 'client_id';
const redirect_uri = 'redirect_uri';
const link_uri = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
```

用 GitHub 开发设置中的数据替换上面链接的对应内容即可。当然，可以根据自己开发的需要，封装成一个专门的方法。

## 获取 token
拿到授权码后，发一个`POST`请求到 https://github.com/login/oauth/access_token 。

这本来也很简单，但 github.com 不能直接前端跨域请求，这可能提升了一丢丢的安全性，但对前端开发人员就很不友好了。

还好现在前端用 NodeJS 什么的搞个简单的后端应用也不是什么难事。

关键是，首先得有个服务器。然而问题又来了，用 GitHub Pages 做博客，不就是为了白嫖免费资源，不用自己折腾服务器的么？主要是服务器也不便宜，为了放一个访问量并不高的技术博客挺浪费的。😏

网上介绍 GitHub Apps 的，似乎详细写这部分的也不多。

言归正传，说说我自己的方案。

刚好我有自己的服务器。[eggjs](https://www.eggjs.org/) 搭起来，部分代码如下：

::: code-group
```javascript [router]
// ~/router.js
module.exports = (app) => {
  const { router, controller } = app;
  router.post('/', controller.home.index);
};
```

```javascript [controller]
// ~/controller/home.js
const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { service, request } = this.ctx;
    const { code, state } = request.body;
    const res = await service.github.token(code, state);
    this.ctx.body = res;
  }
}

module.exports = HomeController;
```

```javascript [service]
// ~/service/github.js
const { Service } = require('egg');

class NewsService extends Service {
  async token(code, state, refresh_token, grant_type) {
    const { base_url, client_id, client_secret, redirect_uri } = this.config;

    let url = `login/oauth/access_token?state=${state}`;
    url += `&client_id=${client_id}`;
    url += `&client_secret=${client_secret}`;

    // 偷个懒，所有参数一锅炖
    // 同时满足 token 和 refresh_token 的需要
    if (code) {
      url += `&code=${code}`;
    }
    if (refresh_token) {
      url += `&refresh_token=${refresh_token}`;
    }
    if (grant_type) {
      url += `&grant_type=${grant_type}`;
    }

    const { data } = await this.ctx.curl(`${base_url}${url}`, {
      params: { redirect_uri },
      data: { clientID: client_id, clientSecret: client_secret, code },
      dataType: 'json',
      method: 'post',
    });

    return data;
  }
}
module.exports = NewsService;
```
:::

接下来的工作，又回到前端熟悉的领域了。在博客页面请求 eggjs 应用所在的服务器：

```typescript
// ~/.vitepress/uitls
// 获取方法，稍封装一下更好用
export const getAccessToken = async (code: string) => {
    // 此处换成真实的地址
    const url = 'eggHost';

    // 这里使用 axios 来请求，拦截器设置从略
    const res = await axiosService({ method: 'post', url, data: { code } });

    // ...省略 token 本地持久化的逻辑

    return res.data;
};
```

以上只是基本逻辑。实际的应用，还需要加入错误处理机制，token 过期的刷新机制等。

::: info
> access token expires in 8 hours and the refresh token expires in 6 months

`access token` 8小时过期，`refresh token` 6个月过期
:::

## 登录中转页
前文关于[用户授权并获取授权码](#用户授权并获取授权码)的说明中，提到的中转页，其作用有二：

1. 减少 GitHub 开发设置中，回调地址的配置数量，指向具体的文章页；
2. 衔接获取授权码及 token 的过程。

主要代码如下：

```javascript
import { useRouter } from 'vitepress';
import { onBeforeMount } from 'vue';
import { getUrlParam, getAccessToken, REDIRECT_KEY, getLS } from '.vitepress/utils';

const router = useRouter();

onBeforeMount(async () => {
    let code = getUrlParam('code');

    // 若地址携带了用户授权码 code
    if (code) {
        await getAccessToken(code);
    }

    // 获取Localstorage中保存的值
    const pathname = getLS(REDIRECT_KEY);

    // 跳转到对应的页面
    router.go(pathname.substring(0, pathname.lastIndexOf('.')));
});
```

## 获取数据
拿到 token 就好办了，然后就可以获取 Issues 的相关数据，包括列表、标题、评论，也可以让用户添加新的评论。

以获取 Issues 为例：
```typescript
// 获取所有、某条 issue
const OWNER = '你的GitHub用户名';
const REPO = '你的博客仓库目录';

export const getIssue = async (number?: number) => {
    const url = `/repos/${OWNER}/${REPO}/issues${number ? '/' + number : ''}`;
    return await axiosService({ url, method: 'get', params: {} });
};
```

## Issues、评论展示
内容需要支持 markdown 格式，引入 `markdown-it`。

```javascript
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
const ci = []; // 省略获取 Issues 列表的逻辑
ci.c_list = data.map((item) => ({
    ...item,
    body: md.render(item.body),
}));
```

其它没有什么特别的，直接贴伪代码：

```vue
<template if="ci && ci.length">
    <div class="cell" v-if="ci.body">
        <div class="meta">
            <!--显示 Issue 创建者头像、用户名、日期等信息-->
        </div>
        <div class="md-preview">{{ ci.body }}</div>
    </div>

    <div class="reply">
        <div class="cell" v-for="c in ci.c_list" :key="c.id">
            <div class="meta">
                <!--显示评论头像、用户名、日期等信息-->
            </div>
            <div class="md-preview" v-html="c.body"></div>
        </div>
    </div>
</template>
```

## 评论发表
原本打算使用微软开源的 `monaco-editor`，页面交互全写好了，准备发布时，才发现在生产环境，[Vite 的支持不好搞](https://github.com/vitejs/vite/discussions/1791)，干脆换成 [vditor](https://github.com/Vanessa219/vditor)，意外的好用。

## 其它细节
VitePress 是基于 Node.js 服务端渲染，将源文件预编译为 html+js 的静态内容，所以，如果页面中有使用 浏览器/DOM 相关的 API，则需要作[特殊处理](https://vitepress.vuejs.org/guide/api#clientonly)。

有两种办法：

1. 在 `beforeMount` 或 `mounted` 勾子中访问上述的 API；
```javascript
import { onBeforeMount, onMounted } from 'vue';

onMounted(() => {
    // 浏览器/DOM 相关的API调用
});

onBeforeMount(() => {
    // 浏览器/DOM 相关的API调用
});
```

2. 使用 `<clientOnly />` 包裹组件。

```vue
import Issue from './Issue.vue';

<template>
    <Layout>
        <template #doc-after>
            <ClientOnly>
                <Issue /> 
            </ClientOnly>
        </template>
    </Layout>
</template>
```

## 相关文档

### GitHub App 管理
参见 [managing-github-apps](https://docs.github.com/en/developers/apps/managing-github-apps)，重点是创建 App、授权操作，实现页面交互，让用户可以在博客页面上获得 Issue 的相关权限。

另外，注意区分 GitHub App 及 OAuth App。官方文档专门说明了其[区别](https://docs.github.com/en/developers/apps/getting-started-with-apps/differences-between-github-apps-and-oauth-apps)，本文从略。

### Issues 处理
文档参见 [GitHub Issues](https://docs.github.com/en/rest/issues)，主要使用到 issues 的查询、新增、评论操作。