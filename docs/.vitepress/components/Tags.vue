<script setup>
import { useData } from 'vitepress';
import { computed } from 'vue';

const { frontmatter } = useData();
const tagArray = computed(() => {
    const { tags = '' } = frontmatter.value;
    return tags.split('|');
});
</script>

<template>
    <div class="my-tags">
        Tags: <span v-for="tag in tagArray" :key="tag">{{ tag }}</span>
    </div>
</template>
