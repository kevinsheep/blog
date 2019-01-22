---
home: true
heroText: <em>C</em>EIL.TOP
tagline: JUST GO BEYOND YOUR
heroImage: /assets/img/avatar.png

footer: MIT Licensed | Copyright © 2010-present, KEVINSHEEP.
---

<template>
    <ol>
        <li v-for="(item, index) in list" :key="index">
            <a :href="item.path">{{ item.title }}</a> <sup>{{ item.frontmatter.updateTime }}</sup>
            <div class="intro" v-if="item.excerpt" v-html="item.excerpt"></div>
        </li>
    </ol>
</template>

<script>
export default {
    computed: {
        list () {
            //console.log("this.$site.pages==", this.$site.pages)
            let res = this.$site.pages.filter(item => {
                return item.regularPath.indexOf(".html") !== -1
            }).sort((a, b) => {
                const av = a.frontmatter.updateTime ? new Date(a.frontmatter.updateTime).valueOf() : 0
                const bv = b.frontmatter.updateTime ? new Date(b.frontmatter.updateTime).valueOf() : 0
                return bv - av //模糊比较，倒序排列，假定都是预期的格式
            })
            console.log("res==", res)
            return res
        }
    },
    methods: {

    },
}
</script>