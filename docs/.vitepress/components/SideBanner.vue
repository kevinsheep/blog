<script setup>
import { useData } from 'vitepress';
import { ref, watch } from 'vue';

const { theme, page } = useData();
const { banner } = theme.value;

const r = ref({});

watch(
    page,
    () => {
        const index = Math.floor(Math.random() * banner.length);
        r.value = banner[index];
        // console.log(r.value);
    },
    { immediate: true }
);
</script>

<template>
    <a :href="r.link" target="_blank" class="banner">
        <img :src="r.banner" :alt="r.title" />
        <span>{{ r.nav || '广而告之' }}</span>
    </a>
</template>

<style lang="stylus">
.banner {
    display: block;
    width: 100%;
    position: relative;

    span {
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        font-size: 10px;
        padding: 0px 3px;
        line-height: 18px;
        background-color: rgba(0, 0, 0, 0.2);
    }

    img {
        width: 100%;
    }
}
</style>
