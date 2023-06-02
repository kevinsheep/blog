<script setup>
import DefaultTheme from 'vitepress/theme';
import SideBanner from './SideBanner.vue';
import Hero from './Hero.vue';
import LastUpdated from './LastUpdated.vue';
import Tags from './Tags.vue';
import Issue from './Issue.vue';

const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <template #aside-ads-before>
            <SideBanner />
        </template>

        <template #home-hero-after>
            <Hero />
        </template>

        <template #doc-before>
            <div class="doc-before-wrapper">
                <Tags />
                <LastUpdated />
            </div>
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
