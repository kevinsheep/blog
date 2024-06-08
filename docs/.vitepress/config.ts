import { getSidebar, getBanners, COLS } from './dev';
import { gitee } from './base-img';

export default {
    title: ' ',
    titleTemplate: 'Ceil.Top',
    description: 'Blog Of KEVINSHEEP',
    outDir: './dist',
    lastUpdated: true,
    markdown: {
        lineNumbers: true,
        breaks: true,
    },
    themeConfig: {
        logo: '/logo.svg',
        nav: [{ text: '首页', link: '/' }, ...COLS],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/kevinsheep/' },
            // {
            //     icon: {
            //         svg: gitee,
            //     },
            //     link: 'https://kevinsheep.gitee.io/blog',
            // },
        ],
        sidebar: getSidebar(),
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2010-present, KEVINSHEEP.',
        },
        search: {
            provider: 'local',
        },
        banner: getBanners(),
    },
    head: [
        [
            'script',
            {
                src: 'https://hm.baidu.com/hm.js?ff7110a78443140968558cad1f050297',
            },
        ],
    ],
};
