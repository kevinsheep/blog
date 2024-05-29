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
    left -47px
    display inline-block
    font-weight bolder
    cursor pointer
    width 30px
    height 30px
    line-height 28px
    text-align center
    border-radius 15px
    color var(--vp-button-brand-text)
    background-color var(--vp-c-brand)
    box-shadow 0 0 10px rgba(0, 0, 0, 0.3)
    transition left 0.25s
}
.collasped {
    .toggle-btn {
        left -40px
    }
}
</style>
