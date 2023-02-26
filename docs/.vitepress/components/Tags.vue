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
    <div class="my-tags" v-if="tagArray.length && tagArray[0]">
        Tags: <a :href="`/tags.html?tag=${tag}`" v-for="tag in tagArray" :key="tag">{{ tag }}</a>
    </div>
</template>

<style scoped lang="stylus">
.my-tags {
    flex: 1;
    font-size: 14px;
    color: var(--vp-c-text-3);

    a {
        color: var(--vp-c-sponsor);
        font-weight: bolder;
        margin-left: 8px;

        &:hover {
            color: var(--vp-c-brand);
        }
    }
}
</style>
