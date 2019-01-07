module.exports = {
    title: 'Ceil.Top',
    description: 'Blog Of KEVINSHEEP',
    footer: 'MIT Licensed | Copyright © 2013-present KEVIN SHEEP',
    themeConfig: {
        repo: 'https://github.com/kevinsheep',
        // docsRepo: 'https://github.com/kevinsheep/blog',
        // docsDir: 'docs',
        // editLinks: true,
        // editLinkText: '帮助完善此页面',
        nav: [
            { text: '首页', link: '/' },
            { text: '前端', link: '/fe' },
            { text: '杂谈', link: '/else/' },
            { text: '关于', link: '/about' }
        ],
        sidebar: [
            '/',
            ['/about', '关于']
        ]
    },
    dest: '../docs/'
}