---
title: VitePress 折叠边栏组件
updateTime: 2024/05/30
tags: 前端
---

## Intro
有网友问到，手动展开和折叠左侧导航栏的方法。

这确实也是个常用功能，也不复杂，折腾了下实现了。方法很多，本文采用的是比较直接的动态修改样式实现的。

效果，点左边的蓝色小按钮看看吧！

## 样式
`VitePress` 默认的布局模板中，原本就带了折叠左侧导航栏的效果。但那是基于媒体查询，根据设备和浏览器尺寸而自动变化的，并没有提供访客主动折叠导航栏的交互方案。但我们可以直接沿用一些已有的布局及样式，减少重复劳动。

首先，预设一个 `.collasped` 样式类，挂在顶层节点 `div#app` 上，提高样式优先级。

以下样式可以放在公共样式文件中：

```stylus
// ~\.vitepress\styles\common.styl
#app.collasped {
  .VPNav {
    .VPNavBar {
      .VPNavBarTitle {
        .title {
          padding-left: 0;
          padding-right: 0;
          border-bottom: 0;
        }
      }

      .divider {
        padding-left: 0;
      }
    }
  }

  .VPSidebar {
    transform: translateX(-100%);

    &.open {
      transform: translateX(0);
      z-index: 60;
    }
  }

  .VPLocalNav {
    left: 0;
    padding-left: 0;
    width: 100%;

    .menu {
      display: flex;
    }
  }

  .VPContent {
    padding-left: 0;
    padding-right: 0;

    .VPDoc {
      width: 100%;
      padding: 32px 24px 96px;

      .content-container {
        max-width: unset;
      }
    }
  }

  .VPBackdrop {
    z-index: 50;
  }
}
```

## 控制按钮组件

制作一个控制按钮，点击时 `div#app` 添加或移除 `.collasped` 样式类。

```vue{52-56}
<!-- ~/.vitepress/components/CollapseSidebar.vue -->
<script setup>
import { ref } from 'vue';

const clsName = 'collasped';
const text = ref('<');

const toggleMenu = () => {
    document.querySelector('#app').classList.toggle(clsName);
    text.value = document.querySelector('#app').classList.contains(clsName) ? '>' : '<';
};
</script>

<template>
    <span class="toggle-btn" @click="toggleMenu()">{{ text }}</span>
</template>

<style scoped lang="stylus">
.toggle-btn {
    position fixed
    z-index 80
    top 250px
    left 50%
    margin-left -465px
    display inline-block
    font-weight bolder
    font-size 21px
    cursor pointer
    width 32px
    height 32px
    line-height 32px
    text-align center
    border-radius 16px
    font-family monospace
    color var(--vp-button-brand-text)
    background-color var(--vp-c-brand)
    box-shadow 0 0 10px rgba(0, 0, 0, 0.3)
    transition all 0.5s
}
.collasped {
    .toggle-btn {
        left -5px
        margin-left 0
    }
}
@media (max-width: 1440px) {
    .toggle-btn {
        left 260px
        margin-left 0
    }
}
@media (max-width: 960px) {
    .toggle-btn {
        display none
    }
}
</style>
```

::: tip
为兼容 `VitePress` 原有的效果，缩小页面尺寸时自动隐藏按钮。
:::

在主题布局插槽中引入上面的组件。

```vue{2,10}
<script setup>
import CollapseSidebar from './CollapseSidebar.vue';
const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <template #doc-before>
            <div class="doc-before-wrapper">
                <CollapseSidebar />
            </div>
        </template>
    </Layout>
</template>
```

以上。