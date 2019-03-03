---
home: true
heroText: <em>C</em>EIL.TOP
tagline: JUST GO BEYOND YOUR
heroImage: /assets/img/avatar.png
pageClass: indexPage
footer: MIT Licensed | Copyright © 2010-present, KEVINSHEEP.
---

<template>
    <ol>
        <li v-for="(item, index) in list" :key="index" @click="go(item)">
            <span class="dir">{{ nav[item.dir] }} /</span>
            <span class="tit">{{ item.title }}</span>
            <span class="date">{{ item.frontmatter.updateTime }}</span>
            <div class="intro" v-if="item.excerpt" v-html="item.excerpt"></div>
        </li>
    </ol>
</template>

<script>
export default {
    computed: {
        list () {
            //console.log("this.$site==", this.$site)
            let res = this.$site.pages
                .filter(item => item.regularPath.indexOf(".html") !== -1)
                .sort((a, b) => {
                    const av = a.frontmatter.updateTime ? new Date(a.frontmatter.updateTime).valueOf() : 0
                    const bv = b.frontmatter.updateTime ? new Date(b.frontmatter.updateTime).valueOf() : 0
                    return bv - av //模糊比较，倒序排列，假定都是预期的格式
                })
                .filter((item, index) => index < 15)
                .map(item => {
                        item.dir = '/' + item.path.split('/')[1] + '/'
                        return item
                    })
            //console.log("res==", res)
            return res
        },

        nav () {
            const n = this.$site.themeConfig.sidebar
            let res = {}
            for(let key in n) {
                res[key] = n[key][0].title
            }
            //console.log("res==", res)
            return res
        }
    },
    methods: {
        go(item) {
            location.href = item.path
        }
    }
}
</script>