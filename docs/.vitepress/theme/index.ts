import DefaultTheme from 'vitepress/theme';
import CustomSlot from '../components/CustomSlot.vue';
import '../styles/common.styl';
import '../styles/markdown.styl';
import '../styles/list.styl';

export default {
    ...DefaultTheme,
    Layout: CustomSlot,
};
