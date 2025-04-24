---
title: VitePress 首页内容推荐
updateTime: '2022/12/28'
tags: 前端
---

基本的原理，是提取 `useData` 中的导航数据，将原来带级别的导航改成扁平列表。根据 `updateTime` 来排序并提取指定条数。

导航数据的构造，在另一篇文章有举例说明：[VitePress 自动内容导航](/CODES/vitepress-navigation)。

::: warning 注意
需要显示在这个推荐列表中的，必须在博文头部显示地定义格式化数据 `updateTime`
:::

```vue
// template#home-hero-after

<script setup>
import { useData, useRouter } from 'vitepress';

const { theme } = useData();
const router = useRouter();

// 生成扁平列表
const { sidebar } = theme.value;
const list = [];
Object.keys(sidebar).forEach((dir) => {
    const onlyChild = sidebar[dir][0]; // ! 有且仅有一个子栏目
    onlyChild.items.forEach((item) =>
        list.push({
            ...item,
            parentLink: dir,
            parentText: onlyChild.text,
        })
    );
});

// 过滤列表数据
const LIST_AMOUNT = 15; // 显示最新15条
const recList = list
    .filter((item) => item.updateTime)
    .sort((a, b) => {
        const av = new Date(a.updateTime).getTime();
        const bv = new Date(b.updateTime).getTime();
        return bv - av;
    })
    .filter((item, index) => index < LIST_AMOUNT);
</script>
<template>
    <ol>
        <li v-for="(item, index) in recList" :key="index" @click="router.go(item.link)">
            <span class="dir">{{ item.parentText }} / </span>
            <span class="tit">{{ item.text || '' }}</span>
            <span class="date">{{ item.updateTime }}</span>
        </li>
    </ol>
</template>

// 样式从略
```