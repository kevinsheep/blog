<script setup>
import DefaultTheme from 'vitepress/theme';
import LayoutTop from './LayoutTop.vue';
import Hero from './Hero.vue';
import LastUpdated from './LastUpdated.vue';
import Tags from './Tags.vue';
import Issue from './Issue.vue';

const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <!-- <template #layout-top>
            <LayoutTop />
        </template> -->

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
