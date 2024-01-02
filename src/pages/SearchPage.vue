<template>
    <div class="index-page">
        <a-input-search v-model:value="searchText" placeholder="搜索一下" enter-button="Search" size="large"
            @search="onSearch" />
        <MyDivider />
        <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
            <a-tab-pane key="post" tab="文章">
                <PostList :post-list="postList" />
            </a-tab-pane>
            <a-tab-pane key="picture" tab="图片" force-render>
                <PictureList :picture-list="pictureList" />
            </a-tab-pane>
            <a-tab-pane key="user" tab="用户">
                <UserList :user-list="userList" />
            </a-tab-pane>
        </a-tabs>
    </div>
    <div>
        <a href="baidu.com">dasdasdasds</a>
        <router-link to="/:emojisending-mod">emojisending</router-link>
        <router-link to="/tiptap">tiptap</router-link>
        <router-view></router-view>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import PictureList from "@/components/PictureList.vue";
import { useRoute, useRouter } from "vue-router";
import myAxiox from "../plugins/myAxios";
import { message } from "ant-design-vue";

//查询帖子
const postList = ref([]);
//查询用户
const userList = ref([]);
//查询图片
const pictureList = ref([]);

//设置动态路由
const router = useRouter();
//获取url地址参数
const route = useRoute();

//默认选择文章
const activeKey = ref(route.params.category);

const initSearchParams = {
    type: activeKey,
    text: "",
    pageSize: 10,
    pageNum: 1,
};
const searchText = ref(route.query.text || "");
/**
 * 加载数据
 * @param params
 */
const loadDataOld = (params: any) => {
    //加载图片
    const pictureQuery = {
        ...params,
        searchText: params.text,
    };
    // myAxiox.post("/picture/list/page/vo", pictureQuery).then((res: any) => {
    //   pictureList.value = res.records;
    // });
    //加载用户数据
    const userQuery = {
        ...params,
        userName: params.text,
    };
    // myAxiox.post("/user/list/page/vo", userQuery).then((res: any) => {
    //   userList.value = res.records;
    // });
    //加载文章数据
    const postQuery = {
        ...params,
        searchText: params.text,
    };
    myAxiox.post("/post/hottest", postQuery).then((res: any) => {
        postList.value = res.data;

    });
    myAxiox.get("/likcollcomm/likcollcommData").then((res: any) => {
        console.log(res.data);
    });
};

/**
 * 加载数据
 * @param params
 */
const loadDataNew = (params: any) => {
    const query = {
        ...params,
        searchText: params.text,
    };
    // myAxiox.post("/search/all", query).then((res: any) => {
    //   pictureList.value = res.picrureList;
    //   postList.value = res.postList;
    //   userList.value = res.userList;
    // });
};
/**
 * 加载数据
 * @param params
 */
const loadData = (params: any) => {
    myAxiox.post("/post/hottest").then((res: any) => {
        postList.value = res.data;
    });
    const { type } = params;
    // if (!type) {
    //   message.error("类别为空");
    //   return;
    // }
    const query = {
        ...params,
        searchText: params.text,
    };
    // myAxiox.post("/search/all", query).then((res: any) => {
    //   if (type === "picture") {
    //     pictureList.value = res.dataList;
    //   } else if (type === "post") {
    //     postList.value = res.dataList;
    //   } else if (type === "user") {
    //     userList.value = res.dataList;
    //   }
    // });
};
const searchParams = ref(initSearchParams);
//首次执行
loadData(searchParams);

//监听参数是否改变
watchEffect(() => {
    searchParams.value = {
        ...initSearchParams,
        text: route.query.text as string,
        type: route.params.category,
    } as any;
});
watchEffect(() => {
    loadData(searchParams.value);
});
//搜索的执行方法
const onSearch = (value: string) => {
    router.push({
        query: {
            ...searchParams.value,
            text: value,
        },
    });
    loadData(searchParams.value);
};
//选择tab切换时修改url不清空查询参数
const onTabChange = (key: string) => {
    router.push({
        path: `/${key}`,
        query: searchParams.value,
    });
};

</script>
  
<style scoped>
.index-page {
    max-width: 1024px;
}
</style>
  