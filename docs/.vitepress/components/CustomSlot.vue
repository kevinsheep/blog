<script setup>
import DefaultTheme from 'vitepress/theme';
import Hero from './Hero.vue';
import LastUpdated from './LastUpdated.vue';
import Issue from './Issue.vue';

const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <template #home-hero-after>
            <Hero />
        </template>

        <template #doc-before>
            <LastUpdated />
        </template>

        <template #doc-after>
            <ClientOnly>
                <Suspense>
                    <Issue />
                </Suspense>
            </ClientOnly>
        </template>
    </Layout>
</template>
