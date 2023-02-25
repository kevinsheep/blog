<script setup>
import { useData } from 'vitepress';
import { getUrlParam, getFlatList } from '../utils/index';
import { onBeforeMount } from 'vue';
import Canvas from './Canvas.vue';
import Avatar from './Avatar.vue';
import List from './List.vue';

const { theme } = useData();
// 生成扁平列表
const { sidebar, footer } = theme.value;
const list = getFlatList(sidebar);

let tag = '';
let relList;

onBeforeMount(async () => {
    tag = getUrlParam('tag');
    if (tag) {
        relList = list.filter((l) => l.tags && l.tags.includes(tag));
    }
});
</script>

<template>
    <div class="tag-page">
        <Canvas />
        <nav>
            <span>TAG: {{ tag }}</span>
            <a class="VPLink" href="/">首页</a>
        </nav>
        <div class="list-wrapper">
            <Avatar />

            <List :list="relList" />
        </div>

        <footer class="VPFooter">
            <p class="message">{{ footer.message }}</p>
            <p class="copyright">{{ footer.copyright }}</p>
        </footer>
    </div>
</template>

<style scoped lang="stylus">
.tag-page {
    position: absolute;
    top: 0;
    width: 100%;
    min-height: 100vh;
}
nav {
    display: flex;
    justify-content: flex-end;
    line-height: var(--vp-nav-height);
    color: var(--vp-c-text-1);
    transition: color 0.25s;
    padding-right: 20px;

    &>* {
        font-size: 14px;
        font-weight: 500;
        padding: 0 12px;
        display: flex;
        align-items: center;
    }

    a {
        color: var(--vp-c-text-2);
        &:hover {
            color: var(--vp-c-brand);
        }
    }

    span {
        color: var(--vp-c-sponsor);
        font-weight: bolder;

        &::after {
            margin-left: 28px;
            width: 1px;
            height: 24px;
            background-color: var(--vp-c-divider);
            content: "";
        }
    }
}
footer.VPFooter {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 32px 0;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    font-family: var(--vp-font-family-base);
}
</style>
