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
    // 取系统生成的 git 提交时间
    else {
        return dayjs(page.value.lastUpdated).format('YYYY-MM-DD HH:mm:ss') || '';
    }
};
</script>

<template>
    <div v-if="lastUpdated()" class="my-last-updated">Last updated: {{ lastUpdated() }}</div>
</template>
