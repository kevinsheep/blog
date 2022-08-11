import DefaultTheme from 'vitepress/theme';
import HeroSlot from '../components/HeroSlot.vue';
import '../styles/common.styl';

export default {
  ...DefaultTheme,
  Layout: HeroSlot,
};
