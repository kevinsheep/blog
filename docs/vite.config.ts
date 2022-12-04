import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 3096,
    },
});
