---
title: VitePress Banner组件
updateTime: 2023/06/02
tags: FE|Banner|广告
---

## Intro
写博客主要目的是为了分享与记录。可是这毕竟需要精力，像本站这种独立博客甚至会产生服务器的成本。

所以，如果能带来一定收入，不多不少吧，能支持服务器运作费用就好了。

如果没有特别的赞助和打赏，那就自然想到投放广告。

官方自带支持 [Carbon Ads](https://vitepress.dev/reference/default-theme-carbon-ads)，这是独一家支持，而且要先申请；有投放门槛，如日 IP/PV 太低，人家根本就不会理睬你。

有时也不一定是为了投放第三方广告，也可以是自己博客的内容推荐，如自己觉得写得特别好的文章，希望得到更多关注。另外，如果想自定义广告位，包括样式、位置、内容，同时，我还想自己博客的广告清爽、美观、不扰民……还是自己做个简单的广告模块更好。

以下是我定制适合自己的 Banner 组件的过程。

## 基础数据准备

预期的设置方式，是可以针对特定栏目，每篇文章都可以自主选择是否显示为推荐内容。

如 [一枝红杏代理](/GOODS/yizhihongxing) 这篇内容，在文章头部设置以下内容作为源数据：

```yaml
---
title: 一支红杏
banner: /assets/banner/yizhihongxing.jpg
link: https://order.yizhihongxing.org/aff.php?aff=4353
---
```

写一个编译时方法，将有带 banner 内容的文章筛选出来，将基础数据生成一个列表：

```typescript{28}
// ～/.vitepress/dev/index.ts
import { readdir } from 'fs/promises';
import matter from 'gray-matter';

// COLS 为指定可能需要展示 banner 的目录
export const COLS = [
    { text: '好物推荐', link: '/GOODS/' },
    // ...
];

export const getBanners = () => {
    const list: BannerType[] = [];

    COLS.forEach(async ({ link, text }) => {
        const dir = `./docs${link}`;
        const files = (await readdir(dir)) || [];
        files.forEach((file) => {
            const path = `${dir}${file}`;
            const filename = file.replace(/\.md$/, '');
            const filepath = `${link}${filename}`;
            const { data } = (matter.read(path) || {}) as Formatters;
            if (data?.banner) {
                list.push({
                    ...data,
                    nav: text,
                    // banner 链接，若不设置则链接到文章路径，相当于内容推荐
                    link: data.link ?? filepath,
                });
            }
        });
    });

    return list;
};
```

## Banner 组件

有了基础数据，再来制作展示组件。

```vue
<!-- ~/.vitepress/components/SideBanner.vue -->
<script setup>
import { useData } from 'vitepress';
import { ref, watch } from 'vue';

const { theme, page } = useData();
const { banner } = theme.value;
const r = ref({});

// 监听页面跳转，不同页面自动切换广告内容
watch(
    page,
    () => {
        // 广告位只有一个，但广告有多个，这里来个随机闪现
        const index = Math.floor(Math.random() * banner.length);
        r.value = banner[index];
    },
    { immediate: true }
);
</script>

<template>
    <a :href="r.link" target="_blank" class="banner">
        <img :src="r.banner" :alt="r.title" />
        <span>{{ r.nav ?? '广而告之' }}</span>
    </a>
</template>
```

在主题布局插槽中引入上面的组件。

```vue{2,9}
<script setup>
import SideBanner from './SideBanner.vue';
const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <template #aside-ads-before>
            <SideBanner />
        </template>
    </Layout>
</template>
```

也可能你不想放到侧边的这个位置。完整的可用插槽列表，参考官方文档中布局插槽 [Layout Slots](https://vitepress.dev/guide/extending-default-theme#layout-slots) 的相关介绍。

::: tip
以上，css 样式及 typescript 使用到的类型定义，不在此赘述。
:::