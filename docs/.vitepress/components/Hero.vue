<script setup>
import { useData, useRouter } from 'vitepress';
import Canvas from './Canvas.vue';

const { theme } = useData();
const router = useRouter();
const indexBlacklist = ['/ARCHIVE/', '/ABOUT/'];

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
            tags: item.tags && item.tags.split('|'),
        })
    );
});

console.log(list);

// 过滤列表数据
const LIST_AMOUNT = 16;
const recList = list
    .filter((item) => item.updateTime && !indexBlacklist.includes(item.parentLink))
    .sort((a, b) => {
        const av = new Date(a.updateTime).getTime();
        const bv = new Date(b.updateTime).getTime();
        return bv - av;
    })
    .filter((item, index) => index < LIST_AMOUNT);
</script>

<template>
    <Canvas />

    <div class="index-wrapper">
        <header class="hero">
            <img src="/assets/img/avatar.png" />
            <p>JUST GO BEYOND YOUR</p>
            <img src="/assets/img/logo-text.png" />
        </header>
        <ol>
            <li v-for="(item, index) in recList" :key="index" @click="router.go(item.link)">
                <span class="date">{{ item.updateTime }}</span>
                <span class="dir">{{ item.parentText }} / </span>
                <span class="tit">{{ item.text || '' }}</span>
                <template v-if="item.tags && item.tags.length">
                    <span class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                </template>
            </li>
        </ol>
    </div>
</template>

<style scoped lang="stylus">
.index-wrapper {
  max-width: 640px;
  margin: 0 auto;
  z-index: 100;

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
      color: var(--vp-c-text-1);
      cursor: pointer;
      line-height: 1.7;

      &:first-child, &:nth-child(2), , &:nth-child(3) {
        color: var(--vp-c-sponsor);

        .date {
          color: var(--vp-c-sponsor);
        }
      }
      &:hover {
        color: var(--vp-c-brand);

        .date {
          color: var(--vp-c-brand);
        }
      }

      .tag {
        font-size: 10px;
        line-height: 15px;
        padding: 0 2px;
        vertical-align: text-top;
        color: var(--vp-c-text-inverse-1);
        background-color: var(--vp-c-mute-darker);
        display: inline-block;
        border-radius: 4px;
        margin-left: 5px;
      }

      .date {
        font-size: 10px;
        line-height: 1;
        color: var(--vp-c-text-2);
        margin-right: 8px;
        font-family: var(--vp-font-family-mono);
        vertical-align: text-bottom;
      }
    }
  }
}
</style>
