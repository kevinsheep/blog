const fslist = require('./fslist.js')

// 取得顶部导航所需的配置数据
function getSubNav(folder) {
    const fs = fslist(folder)
    return fs.map(item => {
        return folder + item.filename
    })
}

// 取得侧边导航所需的配置数据
function getSidebar(cols) {
    let obj = {}
    cols.forEach(item => obj[item.link] = [{
        title: item.text,
        collapsable: false,
        children: getSubNav(item.link)
    }])
    return obj
}

const columns = [
    { text: '前端', link: '/FE/' },
    { text: '观点', link: '/VIEWPOINT/' },
    { text: '杂谈', link: '/ESSAY/' },
    // { text: '其他', link: '/ELSE/' },
    { text: '关于', link: '/ABOUT/' }
]

module.exports = {
    title: 'Ceil.Top',
    description: 'Blog Of KEVINSHEEP',
    themeConfig: {
        lastUpdated: '最后更新',
        repo: 'https://github.com/kevinsheep',
        docsRepo: 'https://github.com/kevinsheep/blog',
        docsDir: 'vuepress/docs',
        editLinks: true,
        editLinkText: '帮助完善此页面',
        nav: [
            { text: '首页', link: '/' },
            ...columns
        ],
        sidebar: getSidebar(columns)
    },
    dest: '../docs/',
    markdown: {
        extendMarkdown: md => {
            md.set({ breaks: true })
            md.use(require('markdown-it-center-text'))
            md.use(require('mdfigcaption'))
        }
    }
}