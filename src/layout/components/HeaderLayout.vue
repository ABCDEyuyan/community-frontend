<template>
    <header class="ant-header">
        <!-- Logo -->
        <div class="ant-logo">
            <!-- 这里放置你的 Logo -->
            <AntDesignOutlined style="font-size: 28px; color: #1E90FF;"></AntDesignOutlined>
        </div>
        <!-- 导航菜单 -->
        <NavigationMenu />
    </header>
</template>
  
<script setup lang="ts">
import NavigationMenu from "../../components/Menu.vue";
import { AntDesignOutlined } from '@ant-design/icons-vue';
</script>
  
<style scoped>
.ant-header {
    display: flex;
    align-items: center;
    padding: 0 24px;
    background-color: white;
    height: 48px;
    line-height: 48px;
    width: 100%;
    z-index: 19;
    background-color: white;
}

.ant-header .ant-logo {
    height: 64px;
    display: flex;
    align-items: center;
    flex: 0 0 60px;
}
</style>