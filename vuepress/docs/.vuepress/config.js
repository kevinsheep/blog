const fslist = require('./fslist.js')

function getSubNav(folder) {
    const fs = fslist(folder)
    return fs.map(item => {
        return folder + item.filename
    })
}
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
    { text: '杂谈', link: '/ESSAY/' },
    { text: '其他', link: '/ELSE/' },
    { text: '关于', link: '/ABOUT/' }
]

module.exports = {
    title: 'Ceil.Top',
    description: 'Blog Of KEVINSHEEP',
    themeConfig: {
        lastUpdated: 'Last Updated',
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
    dest: '../docs/'
}