---
title: Gitee 应用实现博客评论
updateTime: '2023/01/25'
---

以下内容系基于 VitePress + Gitee Issues，实现 Gitee Pages 静态博客的文章评论。

如果你使用的是 Github，可参考本文的关联文章[「基于 GitHub 实现博客评论」](/CODES/vitepress-github-issues.html)。

Gitee 在功能实现上部分模仿 Github（没有证据），所以即使是使用 Gitee Issues 实现评论功能，仍然推荐先看看上面的文章。部分过于接近的内容，本文不再重复说明。

## 创建应用
首先，到 GitHub 开发设置中，创建「第三方应用」。

其中，`Client ID` 和 `Client Secret`，调用授权接口时会用到；权限，可设置授权范围，注意勾选 issues 及 notes；另外，需要提前指定应用回调地址的白名单。

## 用户授权并获取授权码
在博客中，如果用户未登录，那么让用户点击访问授权链接：
```javascript{3}
const client_id = 'client_id';
const redirect_uri = 'redirect_uri';
const link_uri = `https://gitee.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=user_info%20issues%20notes`;
```

用 Gitee 开发设置中的数据替换上面链接的对应内容即可。

## 获取 token
与 GitHub Issues 不同，Gitee 可以直接通过前端获取 token。

```typescript
// ~/.vitepress/uitls
// 获取方法，稍封装一下更好用
export const getAccessToken = async (code: string) => {
    const url = 'oauth/token';
    const grant_type = 'authorization_code';

    const res = await axiosService({
        url,
        method: 'post',
        params: { grant_type, redirect_uri, client_id, code },
        data: { client_secret },
    });
    // ...省略 token 本地持久化的逻辑

    return res.data;
};
```

## 其它内容
登录中转页、获取数据、评论发表、VitePress 实现细节，在[「基于 GitHub 实现博客评论」](/CODES/vitepress-github-issues.html)一文中已介绍过，不再细说。

## 相关文档

### Gitee 第三方应用管理
参见 [https://gitee.com/oauth/applications](https://gitee.com/oauth/applications)

### Gitee API 文档
文档参见 [https://gitee.com/api/v5/swagger](https://gitee.com/api/v5/swagger)，主要使用到 issues 的查询、新增、评论操作。

### Gitee OAuth 文档
文档参见 [https://gitee.com/api/v5/oauth_doc](https://gitee.com/api/v5/oauth_doc#/)