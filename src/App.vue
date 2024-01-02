<template>
  <div id="app">
    <Header />
    <a-layout>
      <a-layout-content style="min-height: 100%;">
        <!-- 这里放置你的页面内容 -->
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './layout/components/HeaderLayout.vue';
import Footer from './layout/components/FooterLayout.vue';
import layouts from './assets/styles/layout.css';

onMounted(() => {
  // 页面初始化时的逻辑
});

import { onMounted } from 'vue';
import { defineComponent } from 'vue';

defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
  },
});

const style = document.createElement('style');
style.innerHTML = layouts;
document.head.appendChild(style);
</script>

<style>
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>