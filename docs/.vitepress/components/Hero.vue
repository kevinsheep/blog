<script setup>
import { useData } from 'vitepress';
import Canvas from './Canvas.vue';
import Avatar from './Avatar.vue';
import List from './List.vue';
import { getFlatList } from '../utils/index';

const { theme } = useData();
const indexBlacklist = ['/ARCHIVE/', '/ABOUT/'];

// 生成扁平列表
const { sidebar } = theme.value;
const list = getFlatList(sidebar);

// 过滤列表数据
const LIST_AMOUNT = 16;
const recList = list
    .filter((item) => item.updateTime && !indexBlacklist.includes(item.parentLink))
    .sort((a, b) => {
        const av = new Date(a.updateTime).getTime();
        const bv = new Date(b.updateTime).getTime();
        return bv - av;
    })
    .filter((item, index) => index < LIST_AMOUNT);
</script>

<template>
    <Canvas />

    <div class="list-wrapper">
        <Avatar />
        <List :list="recList" />
    </div>
</template>
