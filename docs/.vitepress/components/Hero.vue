<script setup>
import { useData, useRouter } from 'vitepress';

const { theme } = useData();
const router = useRouter();

// 生成扁平列表
const { sidebar } = theme.value;
const list = [];
Object.keys(sidebar).forEach((dir) => {
    const onlyChild = sidebar[dir][0]; // ASSERT 有且仅有一个子栏目
    onlyChild.items.forEach((item) =>
        list.push({
            ...item,
            parentLink: dir,
            parentText: onlyChild.text,
        })
    );
});

// 过滤列表数据
const LIST_AMOUNT = 15;
const recList = list
    .filter((item) => item.updateTime)
    .sort((a, b) => {
        const av = new Date(a.updateTime).getTime();
        const bv = new Date(b.updateTime).getTime();
        return bv - av;
    })
    .filter((item, index) => index < LIST_AMOUNT);
</script>

<template>
    <div class="index-wrapper">
        <header class="hero">
            <img src="/assets/img/avatar.png" />
            <p>JUST GO BEYOND YOUR</p>
            <img src="/assets/img/logo-text.png" />
        </header>
        <ol>
            <li v-for="(item, index) in recList" :key="index" @click="router.go(item.link)">
                <span class="dir">{{ item.parentText }} / </span>
                <span class="tit">{{ item.text || '' }}</span>
                <span class="date">{{ item.updateTime }}</span>
            </li>
        </ol>
    </div>
</template>

<style scoped lang="stylus">
.index-wrapper {
  max-width: 960px;
  margin: 0 auto;

  header {
    text-align: center;
    margin-bottom: 50px;

    img {
      display: block;
      margin: 0 auto;
    }
    p {
      color: var(--vp-c-gray);
      font-size: 12px;
      line-height: 32px;
    }
    h1 {
      color: var(--vp-c-brand);
      font-size: 24px;
    }
  }

  ol {
    padding-left: 0;

    li {
      list-style: none;
      color: #aaa;
      cursor: pointer;
      line-height: 1.7;

      &:hover {
        color: var(--vp-c-brand);
      }

      .date {
        font-size: 10px;
        line-height: 1;
        color: var(--vp-c-gray-light-2);
        margin-left: 5px;
        vertical-align: text-top;
      }
    }
  }
}
</style>
