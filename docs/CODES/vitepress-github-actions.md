---
title: 自动部署博客
updateTime: '2023/01/28'
tags: CD
---

一般文档，写到构建完成就该差不多了。可 `VitePress` 相当认真地，写了在好几种平台上的部署方案。详见 [Deploying](https://vitepress.vuejs.org/guide/deploying)。


## Github
使用 GitHub Actions 发布的体验很舒服。

你只需要配置好 GitHub Actions，每次 Git Push 后，坐等几分钟就看到自己的博客自动更新了，当然，前提是你已本地测试完善没有构建错误，也没有文章死链等。

VitePress 官方文档连[使用 GitHub Actions 部署的方法](https://vitepress.vuejs.org/guide/deploying)都有教，可谓相当贴心了。

官方文档的 yml 配置是基于 `yarn` 打包的，这里分享一下我基于 `pnmp` 打包的配置文件：

```yml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ['master']

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: write
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - uses: pnpm/action-setup@v2
        name: Install pnpm
        id: pnpm-install
        with:
          version: 7
          run_install: false

      - name: Get pnpm store directory
        id: pnpm-cache
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT

      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm docs:build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/dist
```


## Gitee

本博客同时发布到 GitHub 与 Gitee，有对比就伤害，差距太大了。

Gitee 这边的免费服务就没那么好用了。要自动发布？有个“流水线”不知道好不好用，反正收费。自定义域名？收费。每次发布的过程中，Gitee Pages 还会有中国特色的“内容审查”，发布时会提示查出问题，可只告诉你是哪页内容，而不告诉你有什么问题。谁知道那些落后的关键词匹配法，会包括哪些敏感词？

我仍然是使用本地手动生成静态，再上传更新这种传统而麻烦方式。过段时间打算写个本地脚本执行好了。**TODO**