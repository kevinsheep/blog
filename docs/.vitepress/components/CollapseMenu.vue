<script setup>
import { ref } from 'vue';

const clsName = 'collasped';
const text = ref('<');

const toggleMenu = () => {
    document.querySelector('#app').classList.toggle(clsName);
    text.value = document.querySelector('#app').classList.contains(clsName) ? '>' : '<';
};
</script>

<template>
    <span class="toggle-btn" @click="toggleMenu()">{{ text }}</span>
</template>

<style scoped lang="stylus">
.toggle-btn {
    position absolute
    z-index 80
    left -50px
    display inline-block
    font-weight bolder
    font-size 21px
    cursor pointer
    width 32px
    height 32px
    line-height 32px
    text-align center
    border-radius 16px
    font-family monospace
    color var(--vp-button-brand-text)
    background-color var(--vp-c-brand)
    box-shadow 0 0 10px rgba(0, 0, 0, 0.3)
    transition left 0.6s
}
.collasped {
    .toggle-btn {
        left -35px
    }
}
</style>
