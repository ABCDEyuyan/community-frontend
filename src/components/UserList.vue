<template>
    <a-list item-layout="horizontal" :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
        :data-source="props.userList">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-card hoverable style="width: 240px">
                    <template #cover>
                        <!-- <img alt="example" :src="bianfuxia" class="gege"/> -->
                    </template>
                    <a-card-meta title="item.userName">
                        <template #description>{{ item.userProfile }}</template>
                    </a-card-meta>
                </a-card>
            </a-list-item>
        </template>
    </a-list>
</template>
 
<script setup lang="ts">

// import bianfuxia from "../assets/img/1.jpg";
import { withDefaults, defineProps } from 'vue';

interface Props {
    userList: any[];
}

const props = withDefaults(defineProps<Props>(), {
    userList: () => [],
});

</script>

<style lang="scss" scoped>
.gege {
    width: 200px;
}
</style>