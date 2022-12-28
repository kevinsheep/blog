---
title: VitePress 更新日期显示组件
updateTime: '2022/12/28'
---

实在上，官方自带了 [lastUpdated](https://vitepress.vuejs.org/config/frontmatter-configs#lastupdated) 的显示。但实际应用时与自己需求有点出入，便又另外做了一个。

官方自带的更新日期数据，是以 git 提交时的文件时间为准来生成的。个别文章想修改一些陈旧谬误，但并不想更新这个“日期显示”时，则需要以另外的方式来记录日期。

```vue
<script setup>
import dayjs from 'dayjs';
import { useData } from 'vitepress';

const { frontmatter, page } = useData();

// 生成可用的更新日期
// 优先取博文前的格式化数据 `updateTime`，若不存在则取系统生成的 git 提交时间
const lastUpdated = () => {
    if (frontmatter.value.lastUpdated === false) {
        return '';
    }
    const temp = frontmatter.value.updateTime || page.value.lastUpdated;
    return temp ? dayjs(temp).format('YYYY-MM-DD HH:mm:ss') : '';
};
</script>

<template>
    <div v-if="lastUpdated()" class="my-last-updated">Last updated: {{ lastUpdated() }}</div>
</template>
```