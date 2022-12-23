import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        build: {
            chunkSizeWarningLimit: 3096,
        },
        define: {
            __REDIRECT_URI__: JSON.stringify(env.__REDIRECT_URI__),
        },
    };
});
