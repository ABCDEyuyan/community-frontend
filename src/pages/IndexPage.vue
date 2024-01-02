<template>
  <div class="index-page">
    <a-row style="margin-left: -8px; margin-right: -8px; row-gap: 16px;margin-top: 30px;">
      <!--这是左边边-->
      <a-col class="ant-col ant-col-xs-24 ant-col-lg-17" style="padding-left: 8px; padding-right: 8px;">
        <a-row class="ant-row ant-row-no-wrap" style="margin-left: -6px; margin-right: -6px;">
          <a-col style="padding-left: 6px; padding-right: 6px; flex: 1 1 auto; min-width: 0px;">
            <a-tabs class="ant-tabs ant-tabs-top ant-tabs-card topic-tabs" v-model:activeKey="activeKeys"
              :tab-position="mode" v-on:click="handleTabClick">
              <a-tab-pane key="new" tab="最新">
                <PostList :post-list="newList" />
              </a-tab-pane>
              <a-tab-pane key="hot" tab="最热">
                <PostList :post-list="hotList" />
              </a-tab-pane>
              <a-tab-pane v-for="(tag) in tagList" :key="tag.tagName" :tab="tag.tagName">
                <PostList :post-list="tagsList" />
              </a-tab-pane>
            </a-tabs>
          </a-col>
        </a-row>

      </a-col>
      <!--这是右边边-->
      <a-col class="ant-col ant-col-xs-24 ant-col-lg-7" style="padding-left: 8px; padding-right: 8px;">
        <a-col style="padding-left: 6px; padding-right: 6px; flex: 1 1 auto; min-width: 0px;">

          <a-card title="🔥 创作中心">
            <template #extra>
              <a-tag class="ant-tag-green" style="margin-right: 90px;"><a target="_blank"
                  style="color:inherit">Lv1</a></a-tag>
            </template>
            🔥🔥🔥hahahahaha这是个免费编程博客导航🔥🔥🔥
          </a-card>

          <a-card title="本月排行" :style="{ marginTop: '16px' }">
            <template #extra>
              <a href="#">More</a>
            </template>
            Inner Card content
          </a-card>

          <a-card title="推荐好友" :style="{ marginTop: '16px' }">
            <template #extra>
              <a href="#">More</a>
            </template>
            Inner Card content
          </a-card>

        </a-col>
        <div class="global-op-action">
          <a-back-top class="ant-btn-default ant-btn-icon-only action-btn" style="right: 24px;" />
        </div>
      </a-col>

    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import PostList from "@/components/PostList.vue";
import myAxios from "../plugins/myAxios";
import type { TabsProps } from 'ant-design-vue';


const mode = ref<TabsProps['tabPosition']>('top');
const activeKeys = ref('new');

// //鼠标在滚动滑轮时触发
// const callbacks: TabsProps['onTabScroll'] = val => {
//   alert(val)
// };

//查询标签
const tagList = ref<{ tagName: string }[]>([]);

function loadtags() {
  myAxios.get('/tag/list').then((res) => {
    tagList.value = res.data
  })
}

//查询最新帖子
const newList = ref([] as any[]);
//查询最热帖子
const hotList = ref([] as any[]);
//查询标签帖子
const tagsList = ref([] as any[]);
const tagsMap = new Map();


const pageNo = ref(1)     // 当前页面

let isLoading = false; // 标志位，表示当前是否正在加载数据

// 将事件监听函数保存到变量中
const scrollListener = throttle(function (this: Window) {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  const clientHeight = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
  const bottomOffset = 100; // 底部偏移量，用来触发加载下一页的条件

  if (!isLoading && scrollTop + clientHeight >= scrollHeight - bottomOffset) {
    // 当滚动到离底部一定距离时加载下一页
    isLoading = true;
    pageNo.value++;
    loadPage();
  }
}, 800);

function handleTabClick() {
  loadPage()
}


function loadPage() {///////////////重复代码  需要优化
  if (activeKeys.value === "hot") {
    // 根据上面给出的代码进行相应的数据加载逻辑
    myAxios
      .get('/post/hottest', { params: { pageNo: pageNo.value } })
      .then((res) => {
        // 处理加载到的数据
        const hotData = res.data;
        hotList.value = [...hotList.value, ...hotData];
        isLoading = false; // 加载完成后将 isLoading 标志位设为 false

        // 判断是否还有更多数据
        if (hotData.length === 0) {
          alert("到底了")
        }
      })
      .catch((error) => {
        console.error(error);
        isLoading = false; // 出错时也要将 isLoading 标志位设为 false
      });
  }
  else if (activeKeys.value === "new") {
    myAxios
      .get('/post/new/date', { params: { pageNo: pageNo.value } })
      .then((res) => {
        // 处理加载到的数据
        const newData = res.data;
        newList.value = [...newList.value, ...newData];
        isLoading = false; // 加载完成后将 isLoading 标志位设为 false

        // 判断是否还有更多数据
        if (newData.length === 0) {
          console.log()
        }
      })
      .catch((error) => {
        console.error(error);
        isLoading = false; // 出错时也要将 isLoading 标志位设为 false
      });
  }
  else {
    myAxios
      .get('/post/tag', {
        params:
          { pageNo: pageNo.value, tag: activeKeys.value }
      })
      .then((res) => {
        //处理加载得到的数据
        const tagData = res.data;


        // const tagsDataToAdd = tagData.filter(item => !tagsList.value.includes(item));
        // tagsList.value = [...tagsList.value, ...tagsDataToAdd];

        for (const tags of tagsList.value) {
          tagsMap.set(activeKeys.value, tags)
        }

        for (const tagDatas of tagData) {
          tagsMap.set(activeKeys.value, tagDatas)
        }

        // const test = ref(["dasdas"] as any[]);
        // const test1 = new Map();
        // test1.set("h", "test1a");
        // test1.set("j", "test1b");

        // for (const test12 of test.value) {
        //   test1.set("q", test12)
        // }

        // test.value = Array.from(test1.get("q"))
        // console.log(test1.get("q"))
        // console.log(test.value.length)


        tagsList.value = Array.from(tagsMap.get(activeKeys.value));
        console.log(tagsMap.get(activeKeys.value))
        console.log(tagList.value.length)


        // //Set只存储唯一的值，重复的数据将自动被过滤掉
        // const uniqueData = new Set([...tagsList.value, ...tagData]);
        // tagsList.value = Array.from(uniqueData);



        isLoading = false;

        // 判断是否还有更多数据
        if (tagData.length === 0) {
          console.log()
        }
      })
      .catch((error) => {
        console.error(error);
        isLoading = false; // 出错时也要将 isLoading 标志位设为 false
      });
  }

}


// 节流函数
function throttle(callback: () => void, delay: number) {
  let timeoutId: number;
  let previousTime = 0;

  return function (this: any, ...args: any[]) {
    const now = Date.now();
    const elapsedTime = now - previousTime;

    const later = function () {
      previousTime = Date.now();
      if (Array.isArray(args)) {
        callback.apply(this, args);
      }
    };

    clearTimeout(timeoutId);

    if (elapsedTime > delay) {
      later();
    } else {
      timeoutId = setTimeout(later, delay - elapsedTime);
    }
  };
}


onMounted(() => {
  loadPage()
  loadtags()
  // 添加事件监听
  window.addEventListener('scroll', scrollListener);
})

// 组件销毁时，移除滚动事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', scrollListener);
})

</script>

<style scoped>
.index-page {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
