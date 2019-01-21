const fslist = require('./fslist.js')

function getSubNav(folder) {
    let res = [];
    for (let item of fslist(folder)) {
        res.push(['/' + folder + '/' + item.filename, item.title || item.filename])
    }
    return res;
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
        sidebar: [
            //['/about/', '关于'],
            {
                title: '前端',
                collapsable: false,
                children: getSubNav('FE')
            },
        ]
    },
    dest: '../docs/'
}