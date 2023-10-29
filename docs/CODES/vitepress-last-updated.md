---
title: VitePress 更新日期显示组件
updateTime: '2022/12/28'
tags: 前端
---

实际上，官方自带了 [lastUpdated](https://vitepress.vuejs.org/config/frontmatter-configs#lastupdated) 的显示。但应用到博客上时，发现与自己需求有点出入，便又另外做了一个。

官方自带的更新日期数据，是以 git 提交时的文件时间为准来生成的。个别文章想修改一些陈旧谬误，但并不想更新这个“日期显示”时，则需要以另外的方式来记录日期。

评论中有网友也有类似的需求，这里详细点展开下。

首先这个「自定义」的更新日期，数据来源于文章头部的 `yaml` 定义：
```yaml
---
title: VitePress 更新日期显示组件
updateTime: '2022/12/28'
---
```

以下组件是新建的，文件位置其实随意，我在 `.vitepress` 新建立了个目录，专门用来存放自定义的组件：

```vue
<!-- .vitepress/components/LastUpdated.vue -->
<script setup>
import dayjs from 'dayjs';
import { useData } from 'vitepress';

const { frontmatter, page } = useData();

const lastUpdated = () => {
    // 禁用日期显示标志
    if (frontmatter.value.lastUpdated === false) {
        return '';
    }
    // 优先取博文前的自定义时间日期 `updateTime`
    else if (frontmatter.value.updateTime) {
        return dayjs(frontmatter.value.updateTime).format('YYYY-MM-DD');
    }
    // 若无自定义日期，则取系统生成的 git 提交时间
    else {
        return dayjs(page.value.lastUpdated).format('YYYY-MM-DD HH:mm:ss') || '';
    }
};
</script>

<template>
    <div v-if="lastUpdated()" class="my-last-updated">Last updated: {{ lastUpdated() }}</div>
</template>
```

扩展默认主题，使用布局插槽添加自定义组件，可以看官方文档：[Layout Slots](https://vitepress.dev/guide/extending-default-theme#layout-slots)

以本组件为例，theme 中的定义可以是这样：

```typescript
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import MyLayout from '../components/MyLayout.vue';
// import styles

export default {
    ...DefaultTheme,
    Layout: MyLayout,
};
```

`MyLayout.vue` 中的调用可以是这样：

```vue
<!-- .vitepress/components/MyLayout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme';
import LastUpdated from './LastUpdated.vue';
import Tags from './Tags.vue';

const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <template #doc-before>
            <div class="doc-before-wrapper">
                <Tags />
                <LastUpdated />
            </div>
        </template>
    </Layout>
</template>
```

css 样式定义比较琐碎，这里就不再赘述了。