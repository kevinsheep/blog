<template>
    <ol>
        <li v-for="(item, index) in list" :key="index">
            <span class="date">{{ item.updateTime }}</span>
            <a class="dir" :href="item.parentLink">{{ item.parentText }} / </a>
            <a class="tit" :href="item.link">{{ item.text || '' }}</a>
            <span class="tags-wrapper" v-if="item.tags && item.tags.length">
                <a class="tag" :href="`/tags.html?tag=${tag}`" v-for="tag in item.tags" :key="tag">{{ tag }}</a>
            </span>
        </li>
    </ol>
</template>

<script>
export default {
    name: 'List',
    props: {
        list: {
            type: Array,
            default: [],
        },
    },
};
</script>

<style scoped></style>
