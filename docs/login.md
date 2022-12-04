---
layout: false
title: 登录页
---

<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vitepress';
import { getUrlParam, getSearch } from '.vitepress/utils';

onBeforeMount(() => {
    const state = getUrlParam('state');
    const pathname = state.split('|')[0].replace('--', '/');
    const url = `${pathname}${getSearch()}`;

    const router = useRouter();
    router.go(url);
});
</script>