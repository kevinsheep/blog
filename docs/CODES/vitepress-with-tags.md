---
title: 给VitePress博文加上标签
updateTime: '2023/02/21'
tags: FE
---

## Intro
博客文章，光是标题和栏目分类，有时候并不足以良好地表达文章的主旨和关键内容。比如说本博客，只分了代码技术类栏目[「折腾」](/CODES/)，以及文章类栏目[「杂谈」](/ESSAY/index.html)。可是技术的种类也太多了，一个个划分栏目太麻烦，而且内容分布也不平均。文章也是如此。

这时候再来个标签就好多了。标签的选择我比较随意，其实相当于 `keywords` 吧。

VitePress 是支持格式化地自定义一些文章的信息的，可以利用起来，存放标签信息。

以下内容，是基于 VitePress 的 [Frontmatter](https://vitepress.vuejs.org/guide/frontmatter#frontmatter) 功能，以及自定义组件实现。关于自定义组件，也可以参考[VitePress深度折腾](/CODES/vitepress-play-around.html)系列介绍。

## 首页显示
首先参考[VitePress首页内容推荐](/CODES/vitepress-recommendation.html)，生成首页推荐列表。在生成列表数据时映射 `tags` 数据并格式化处理。

```js
// 生成扁平列表
const { sidebar } = theme.value;
const list = [];
Object.keys(sidebar).forEach((dir) => {
    const onlyChild = sidebar[dir][0]; // ASSERT 有且仅有一个子栏目
    onlyChild.items.forEach((item) =>
        list.push({
            ...item,
            parentLink: dir,
            parentText: onlyChild.text,
            tags: item.tags && item.tags.split('|'), // [!code  ++]
        })
    );
});
```

然后，就可以在 `<template>` 的列表中使用了。

## 内容页显示
在内容页中，可以直接使用 `$frontmatter.tags` 显示。但这样有两个不足：
1. 每一篇文章都要手动添加；
2. 样式调整麻烦。

考虑到这些问题，这里仍然使用自定义组件处理。

```vue
<script setup>
import { useData } from 'vitepress';
import { computed } from 'vue';

const { frontmatter } = useData();
const tagArray = computed(() => {
    const { tags = '' } = frontmatter.value;
    return tags.split('|');
});
</script>

<template>
    <div class="my-tags">
        Tags: <span v-for="tag in tagArray" :key="tag">{{ tag }}</span>
    </div>
</template>
```

注意使用到 `computed`，否则在切换页面时，标签内容将不会响应变化。

组件引入后，放置在 `<template #doc-before />` 内即可。

样式定义从略。