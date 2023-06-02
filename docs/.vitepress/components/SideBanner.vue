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
        console.log(r.value);
    },
    { immediate: true }
);
</script>

<template>
    <a :href="r.link" target="_blank">
        <img :src="r.banner" :alt="r.title" class="banner" />
    </a>
</template>

<style lang="stylus">
.banner {
    width: 100%;
}
</style>
