<script setup>
import { getLS, setLS } from '../utils/index.ts';
import { ref } from 'vue';

const LS_KEY = 'NoticeRead';
const getNoticeRead = () => {
    const res = getLS(LS_KEY);
    if (res === true) {
        return true;
    }
    document.querySelector(':root').style.setProperty('--vp-layout-top-height', '36px');
    return false;
};

const isNoticeRead = ref(getNoticeRead());

const setNoticeRead = () => {
    isNoticeRead.value = true;
    document.querySelector(':root').style.setProperty('--vp-layout-top-height', '0');

    setLS(LS_KEY, true);
};
</script>

<template>
    <div class="top-notice" v-if="!isNoticeRead">
        <div class="notice-wrapper">
            <p>
                如果开启了代理访问本站，请确保您的代理正常工作，否则可能出现异常跳转，详情可<a
                    href="https://github.com/kevinsheep/blog/issues/62"
                    target="_blank"
                    >点击这里了解</a
                >。
            </p>
            <span class="close-btn" @click="setNoticeRead()">知道了，消失吧 X</span>
        </div>
    </div>
</template>

<style scoped lang="stylus">
.top-notice {
    background-color: #fcfcf3;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    width 100%;
    position fixed
    z-index 999

    p {
        margin-left: 32px;
    }

    a {
        text-decoration: underline;
    }

    .close-btn {
        cursor: pointer;
        color: var(--vp-c-brand-1);
        user-select: none;
        margin-right: 16px;
    }

    .notice-wrapper {
        max-width: calc(var(--vp-layout-max-width) - 64px);
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
