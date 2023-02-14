<script setup>
import { ref } from 'vue';
import { generateChat, DEFAULT_CHAT } from '../utils/openai.ts';

const chat = ref(DEFAULT_CHAT);
const loading = ref(false);

const send = async () => {
    loading.value = true;
    chat.value = await generateChat(chat.value);
    loading.value = false;
};

const input = ({ target }) => (chat.value = target.value);

const reset = () => (chat.value = DEFAULT_CHAT);
</script>

<template>
    <div class="wrapper">
        <textarea :value="chat" @input="input" placeholder="基于 ChatGPT API 的聊天程序" />
        <div v-if="loading" class="loading spin"></div>
    </div>
    <div class="toolbar">
        <span class="letters">{{ chat.length || 0 }}</span>
        <button @click="send" class="send">Send</button>
        <button @click="reset">Reset</button>
    </div>
</template>

<style scoped>
/* prettier-ignore */
.loading {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -8px;
    margin-top: -8px;
    width: 3px;
    height: 3px;
    border-radius: 100%; /* 圆角 */
    box-shadow: 
    0 -10px 0 1px #00a0e8, /* 上, 1px 扩展 */ 
    0 10px #00a0e8, /* 下 */ 
    -10px 0 #00a0e8, /* 左 */
    10px 0 #00a0e8, /* 右 */ 
    -7px -7px 0 0.5px #00a0e8, /* 左上, 0.5px扩展 */
    7px -7px 0 1.5px #00a0e8, /* 右上, 1.5px扩展 */
    7px 7px #00a0e8,/* 右下 */
    -7px 7px #00a0e8; /* 左下 */
}
.spin {
    animation: spin 1s steps(8) infinite;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.wrapper {
    position: relative;
}
textarea {
    width: 100%;
    height: calc(100vh - 600px);
    min-height: 300px;
    padding: 18px;
    margin-top: 10px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    font-size: 14px;
    background-color: var(--vp-c-bg);
    color: var(--vp-c-text-1);
}
textarea:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
.toolbar {
    text-align: right;
    padding-top: 5px;
    margin-bottom: -50px;
}
.letters {
    float: left;
    font-size: 14px;
    color: var(--vp-c-text-2);
    background-color: var(--vp-c-divider);
    border-radius: 8px;
    padding: 0 12px;
}
button {
    margin-left: 12px;
    line-height: 36px;
    font-size: 16px;
    padding: 0 0.8em;
    color: var(--vp-c-text-1);
    border-radius: 8px;
    background-color: var(--vp-c-divider);
    user-select: none;
}
button.send {
    color: var(--vp-c-text-inverse-1);
    background-color: var(--vp-c-brand);
}
.VPDocFooter {
    margin-top: 20px;
}
</style>
