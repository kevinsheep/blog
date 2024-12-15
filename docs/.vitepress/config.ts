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
            copyright:
                'Copyright © 2010-present, KEVINSHEEP. <a href="http://beian.miit.gov.cn/">粤ICP备2023053325号-1</a>',
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
            'meta',
            {
                name: 'baidu-site-verification',
                content: 'codeva-1ZlyLGCh2Z',
            },
        ],
    ],
    sitemap: {
        hostname: 'https://www.ceil.top',
    },
};
