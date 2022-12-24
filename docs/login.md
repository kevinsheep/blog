---
layout: false
title: 登录页
---

<script setup>
import { useRouter } from 'vitepress';
import { onBeforeMount } from 'vue';
import { getUrlParam } from '.vitepress/utils';
import { getAccessToken, REDIRECT_KEY, getLS } from '.vitepress/utils/fetch.ts';

const router = useRouter();
let code;
onBeforeMount(async () => {
    code = getUrlParam('code');

    // 若地址携带了用户授权码 code
    if (code) {
        await getAccessToken(code);
    }

    // 根据state值，跳转到对应的页面
    const pathname = getLS(REDIRECT_KEY, '/');

    router.go(pathname.substring(0, pathname.lastIndexOf('.')));
});
</script>