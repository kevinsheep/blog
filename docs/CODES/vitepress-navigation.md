---
title: VitePress 自动内容导航
updateTime: '2022/12/28'
tags: 前端
---

先定义好用于构造导航的方法并暴露：
```typescript
// ~/docs/.vitepress/dev/index.ts

import { readdir } from 'fs/promises';
import matter from 'gray-matter';

/**
 * 定义顶部导航
 */
export const COLS = [
    { text: '代码', link: '/CODES/' },
    { text: '杂谈', link: '/ESSAY/' },
    { text: '关于', link: '/ABOUT/' },
    { text: '归档', link: '/ARCHIVE/' },
];

/**
 * ! 各分类只对应单一文件夹，不考虑多级目录、混合目录的情况
 * @description 根据 `COLS` 生成侧边导航（二级）
 * @returns {Object} sidebar
 */
export const getSidebar = (): Object => {
    const list = {};
    const INDEX_FILE = 'index';

    COLS.forEach(async ({ link, text }) => {
        const dir = `./docs${link}`;
        const files = (await readdir(dir)) || [];

        list[link] = [
            {
                text,
                items: files
                    .map((file) => {
                        const path = `${dir}${file}`;
                        const filename = file.replace(/\.md$/, '');
                        const filepath = `${link}${filename}`;
                        const { data = {} } = matter.read(path) || {};
                        return {
                            ...data,
                            text: data.title || filename,
                            link: filepath,
                        };
                    })
                    .filter(({ text, link }) => link.indexOf(INDEX_FILE) === -1),
            },
        ];
    });

    return list;
};
```

在网站配置中导入：
```typescript
// ~/docs/.vitepress/config.ts

import { getSidebar, COLS } from './dev';

export default {
    themeConfig: {
        nav: [{ text: '首页', link: '/' }, ...COLS],
        sidebar: getSidebar(),
    },
};
```

如上，建立好与一级导航一致的目录名，每次只需要专注于内容添加即可。