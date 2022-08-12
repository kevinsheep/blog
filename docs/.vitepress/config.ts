import { getSidebar, COLS } from './utils';

export default {
  title: ' ',
  titleTemplate: 'Ceil.Top',
  description: 'Blog Of KEVINSHEEP',
  outDir: './dist',
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/assets/img/logo.png',
    nav: [{ text: '首页', link: '/' }, ...COLS],
    sidebar: getSidebar(),
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2010-present, KEVINSHEEP.',
    },
  },
};
