<script setup>
import { useData, useRouter } from 'vitepress';
import { ref, watch, onMounted } from 'vue';
import { getUrlParam, notify } from '../utils';
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
const router = useRouter();

let { access_token } = getLS();

const ci = ref(null);

const getCi = async () => {
    if (!access_token) {
        return;
    }

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
        return {};
    }
    const { data } = (await getComments(ci.value.number)) || {};
    ci.value.c_list = data.map((item) => ({
        ...item,
        body: md.render(item.body),
    }));
};

// 监听页面变动，加载评论列表
watch(page, () => getCi(), { immediate: true });

// 若地址携带了用户授权码 code
const code = getUrlParam('code');
if (code) {
    const res = await getAccessToken(code, router.route.path);
    access_token = res.access_token;
}

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

onMounted(() => {
    if (!access_token) {
        return;
    }
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
</script>

<template>
    <div class="wrapper-comments">
        <div class="title">
            评论一番
            <span>基于 Gitee Issues</span>
        </div>

        <div class="no-login" v-if="!access_token">
            请 <a :href="link_get_code(router.route.path)">登录你的 Github 账号</a> 后发表评论
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

        <div id="vditor" v-if="access_token"></div>

        <span class="btn-add" @click="toComment" v-if="access_token">发表</span>

        <div class="to-gitee" v-if="ci && ci.html_url">或者到 <a :href="ci.html_url">Gitee Issues</a> 表扬作者</div>
    </div>
</template>
