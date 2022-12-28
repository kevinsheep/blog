---
title: Github Issues 应用实现博客评论
updateTime: '2022/12/28'
---

## 相关文档
GitHub Docs 有详尽的操作文档。

### 关于 GitHub App 管理
参见 [managing-github-apps](https://docs.github.com/en/developers/apps/managing-github-apps)，重点是创建及通过 API 进行授权操作。

另外，注意区分 GitHub App 及 OAuth App。可从文档资料查看其区分，本文从略。

### 关于 Issues 处理
参见 [GitHub Issues](https://docs.github.com/en/rest/issues)，主要使用到 issues 的查询、新增、评论操作。