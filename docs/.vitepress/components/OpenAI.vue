<script setup>
import { ref } from 'vue';
import { generateChat, DEFAULT_CHAT } from '../utils/openai.ts';

const chat = ref(DEFAULT_CHAT);

const send = async () => {
    chat.value = await generateChat(chat.value);
};

const input = ({ target }) => (chat.value = target.value);

const reset = () => (chat.value = DEFAULT_CHAT);
</script>

<template>
    <textarea :value="chat" @input="input" placeholder="基于 ChatGPT API 的聊天程序" />
    <div class="toolbar">
        <span class="letters">{{ chat.length || 0 }}</span>
        <button @click="send" class="send">Send</button>
        <button @click="reset">Reset</button>
    </div>
</template>

<style scoped>
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
