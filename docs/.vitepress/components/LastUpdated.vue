<script setup>
import dayjs from 'dayjs';
import { useData } from 'vitepress';

const { frontmatter, page } = useData();

// 生成可用的更新日期
const lastUpdated = () => {
    const temp = frontmatter.value.updateTime ? frontmatter.value.updateTime : page.value.lastUpdated;
    return temp ? dayjs(temp).format('YYYY-MM-DD HH:mm:ss') : '';
};
</script>

<template>
    <div v-if="lastUpdated()" class="my-last-updated">Last updated: {{ lastUpdated() }}</div>
</template>
