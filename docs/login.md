---
layout: false
title: 登录页
---

<script setup>
import { useRouter } from 'vitepress';
import { getUrlParam } from '.vitepress/utils';
import { getAccessToken } from '.vitepress/utils/fetch.ts';

const code = getUrlParam('code');

// 若地址携带了用户授权码 code
if (code) {
    await getAccessToken(code);
}

// 根据state值，跳转到对应的页面
const state = getUrlParam('state');
const pathname = state.split('|')[0].replace('--', '/');
const router = useRouter();

router.go(pathname);
</script>