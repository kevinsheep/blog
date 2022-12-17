<script setup>
import { useData } from 'vitepress';
import { ref, watch, onMounted, computed, nextTick, toRaw } from 'vue';
import { getUrlParam, getAuthState, notify } from '../utils';
import { getIssue, getComments, addComment, addIssue, getLS, getAccessToken, link_get_code } from '../utils/fetch.ts';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import MarkdownIt from 'markdown-it';
import relativeTime from 'dayjs/plugin/relativeTime';

import Vditor from 'vditor';
import 'vditor/dist/index.css';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

let vditor;
const md = new MarkdownIt();
const { page } = useData();

const access_token = ref(null);
const ci = ref(null);
const apiError = ref(false);

// 获取issues及评论列表
const getCi = async () => {
    try {
        const issues = await getIssue();
        if (!issues || !issues.data) {
            return;
        }

        const { relativePath, title } = page.value;
        ci.value = issues.data.find(({ title: issueTitle }) => {
            // issue 标题是页面路径的一部分 || 页面标题是 issue 标题的一部分
            return relativePath.indexOf(issueTitle) > -1 || issueTitle.indexOf(title) > -1;
        });

        if (!ci.value || !ci.value.number) {
            return;
        }
        const { data } = (await getComments(ci.value.number)) || {};
        ci.value.c_list = data.map((item) => ({
            ...item,
            body: md.render(item.body),
        }));
    } catch (error) {
        apiError.value = true;
    }
};

// 发布评论
const onComment = async (words) => {
    if (ci.value && ci.value.number) {
        await addComment(ci.value.number, words);
        const { data } = (await getComments(ci.value.number)) || {};
        ci.value.c_list = data.map((item) => ({
            ...item,
            body: md.render(item.body),
        }));
    }
    // 未有 issue，则新建一个
    else {
        const title = page.value.title;
        await addIssue(title, words);
        getCi();
    }
};

const toComment = () => {
    const val = vditor?.getValue();
    if (!val || val === '\n') {
        notify('输入评论内容才能发表啊！');
    } else {
        onComment(val);
        vditor?.setValue('');
    }
};

onMounted(async () => {
    const code = getUrlParam('code');
    const state = getAuthState();

    access_token.value = getLS();

    // 若地址携带了用户授权码 code
    if (code) {
        const res = await getAccessToken(code, state);
        access_token.value = res.access_token;
    }
});

const isLogin = computed(() => {
    const hasToken = access_token.value && JSON.stringify(toRaw(access_token.value)) !== '{}';
    return hasToken && !apiError.value;
});

// 监听页面变动，加载评论列表
watch(page, () => getCi(), { immediate: true });

// 监听页面变动，加载评论列表
watch(isLogin, (isLogin) => {
    if (!isLogin) {
        return;
    }
    nextTick(() => {
        vditor = new Vditor('vditor', {
            toolbar: [
                'emoji',
                'headings',
                'bold',
                'italic',
                'strike',
                'link',
                '|',
                'list',
                'ordered-list',
                'check',
                'outdent',
                'indent',
                '|',
                'quote',
                'line',
                'code',
                'inline-code',
                'table',
                '|',
                'undo',
                'redo',
                'fullscreen',
                '|',
            ],
            hint: {
                emoji: {
                    nice: '👍',
                    bad: '👎',
                    stare: '👀️',
                    tada: '🎉️',
                    laugh: '🤣',
                    love: '🥰',
                    heart: '❤️',
                },
            },
        });
    });
});
</script>

<template>
    <div class="wrapper-comments">
        <div class="title">
            评论一番
            <span>基于 Github Issues</span>
        </div>

        <div class="no-login" v-if="!isLogin">
            <ClientOnly> 请 <a :href="link_get_code()">登录你的 Github 账号</a> 后发表评论 </ClientOnly>
        </div>

        <template v-else-if="ci">
            <div class="cell" v-if="ci.body">
                <div class="meta">
                    <a class="avatar" :href="ci.user.html_url"><img :src="ci.user.avatar_url" :alt="ci.user.name" /></a>
                    <a class="name" :href="ci.user.html_url">{{ ci.user.name }}</a>
                    <span
                        >{{ dayjs(ci.created_at).format('YYYY-MM-DD HH:mm:ss') }} /
                        {{ dayjs(ci.created_at).fromNow() }} 发起话题</span
                    >
                    <em>#{{ ci.number }}</em>
                    <em>{{ ci.state }}</em>
                </div>
                <div class="content">{{ ci.body }}</div>
            </div>

            <div class="reply">
                <div class="cell" v-for="c in ci.c_list" :key="c.id">
                    <div class="meta">
                        <a class="avatar" :href="c.user.url"><img :src="c.user.avatar_url" :alt="c.user.name" /></a>
                        <a class="name" :href="ci.user.url">{{ c.user.name }}</a>
                        <span
                            >{{ dayjs(c.created_at).format('YYYY-MM-DD HH:mm:ss') }} /
                            {{ dayjs(c.created_at).fromNow() }}</span
                        >
                    </div>
                    <div class="content md-preview" v-html="c.body"></div>
                </div>
            </div>
        </template>

        <div id="vditor" v-if="isLogin"></div>

        <span class="btn-add" @click="toComment" v-if="isLogin">发表</span>

        <div class="to-gitee" v-if="isLogin && ci && ci.html_url">
            或者到 <a :href="ci.html_url">Github</a> 表扬作者
        </div>
    </div>
</template>
