const fslist = require('./fslist.js')

function getSubNav(folder) {
    const fs = fslist(folder)
    return fs.map(item => {
        return '/' + folder + '/' + item.filename
    })
}

module.exports = {
    title: 'Ceil.Top',
    description: 'Blog Of KEVINSHEEP',
    footer: 'MIT Licensed | Copyright © 2013-present KEVIN SHEEP',
    themeConfig: {
        repo: 'https://github.com/kevinsheep',
        docsRepo: 'https://github.com/kevinsheep/blog',
        docsDir: 'vuepress/docs',
        editLinks: true,
        editLinkText: '帮助完善此页面',
        nav: [
            { text: '首页', link: '/' },
            { text: '前端', link: '/FE/' },
            { text: '杂谈', link: '/ELSE/' },
            { text: '关于', link: '/ABOUT/' }
        ],
        sidebar: {
            '/FE/': [{
                title: '前端',
                collapsable: false,
                children: getSubNav('FE')
            }],
            '/ELSE/': [{
                title: '杂谈',
                collapsable: false,
                children: getSubNav('ELSE')
            }]
        }

    },
    dest: '../docs/'
}