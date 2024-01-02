<template>
    <a-list item-layout="vertical" size="large" :data-source="props.postList">
        <template #renderItem="{ item }">
            <a-list-item class="post-item ant-list-item-no-flex" style="margin: -20px;padding: -10px;">

                <a-card>
                    <!--帖子头像、用户名称、等级、身份、说明-->
                    <a-list-item-meta :description="item.description">
                        <template #title>
                            <a-row justify="space-between">

                                <!--帖子用户弹出层-->
                                <a-space direction="horizontal">
                                    <a-popover>
                                        <template #content>
                                            <div class="user-info-card">
                                                <div class="ant-card">
                                                    <div class="ant-card-body" style="padding: 16px;">

                                                        <div class="ant-card-meta">
                                                            <div class="ant-card-meta-avatar">
                                                                <a-space :size="12">
                                                                    <a-image :width="80" :src="item.userAvatar">
                                                                    </a-image>
                                                                </a-space>
                                                            </div>

                                                            <div class="ant-card-meta-detail">
                                                                <!--标题-->
                                                                <div class="ant-card-meta-title">
                                                                    <div class="ant-space ant-space-horizontal ant-space-align-center user-title-bar"
                                                                        style="gap:8px">

                                                                        <div class="ant-space-item">
                                                                            <a target="_blank" href="/:##">
                                                                                <span class="user-name"
                                                                                    style="font-size: 18px;font-style: ;">
                                                                                    {{ item.userName }}
                                                                                </span>
                                                                            </a>
                                                                        </div>

                                                                        <div class="ant-space-item">
                                                                            <a-tag class="ant-tag-green"
                                                                                style="margin-right: 90px;">
                                                                                <a target="_blank" style="color:inherit">
                                                                                    Lv{{ item.userRole }}
                                                                                </a>
                                                                            </a-tag>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <!--说明-->
                                                                <div class="ant-card-meta-description">
                                                                    <div class="ant-space ant-space-vertical"
                                                                        style="gap: 8px;">
                                                                        <div class="ant-space-item">
                                                                            {{ item.userProfile }}
                                                                        </div>

                                                                        <div class="ant-space-item">
                                                                            <div class="ant-space ant-space-horizontal ant-space-align-center"
                                                                                style="font-size: 16px; gap: 8px;">
                                                                                <a-tooltip ref="tooltipRef">
                                                                                    <template #title>
                                                                                        <span>账号：123</span><br>
                                                                                        <span>昵称：a</span><br>
                                                                                        <span>加入时间：2023-12-08</span><br>
                                                                                    </template>
                                                                                    <comment-outlined
                                                                                        :style="{ color: 'hotpink' }"
                                                                                        @click="openTooltip" />
                                                                                </a-tooltip>
                                                                            </div>
                                                                        </div>

                                                                        <div class="ant-space-item">
                                                                            <a-button size="2px" type="primary"
                                                                                block="true">+关注</a-button>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="ant-divider ant-divider-horizontal" role="separator">
                                                        </div>

                                                        <a-descriptions style="width: 200px;">
                                                            <a-descriptions-item label="积分">{{ item.points
                                                            }}</a-descriptions-item><br>
                                                            <a-descriptions-item label="状态">{{ item.status
                                                            }}</a-descriptions-item>
                                                            <a-descriptions-item label="兴趣"></a-descriptions-item>
                                                        </a-descriptions>


                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        <a target="_blank" href="/:##"><span class="user-name"
                                                style="font-size: 18px;font-style: ;">
                                                {{ item.userName }}
                                            </span>
                                        </a>
                                    </a-popover>
                                    <!--等级-->
                                    <a-tag class="ant-tag-green" style="margin-right: 90px;">
                                        <a target="_blank" style="color:inherit">Lv{{ item.userRole }}
                                        </a>
                                    </a-tag>
                                </a-space>

                            </a-row>
                        </template>
                        <!--帖子用户头像-->
                        <template #avatar><a-avatar :src="item.avatar" style="width:40px;height: 40px;" /></template>
                    </a-list-item-meta>
                    <!--文章主内容-->
                    <a-list-item :class="['post-card-item']" style="padding: 2px;">
                        <div class="a-list-item-main">
                            <!--文章标题-->
                            <a here="/:##" target="_blank">
                                <h5 class="post-title">{{ item.title }}</h5>
                            </a>
                            <!--展开收起判断按钮 文章内容在这-->
                            <div v-if="!isContentExpanded">
                                <span class="connentclass" v-html="item.content.substring(0, maxLength) + '...'"></span>
                                <a-button type="link" block @click="isContentExpanded = true">展开<down-outlined /></a-button>
                            </div>
                            <div v-else>
                                <span class="connentclass" v-html="item.content"></span>
                                <a-button type="link" block @click="isContentExpanded = false">收起<up-outlined /></a-button>
                            </div>
                            <div class="tags" style="margin-top: 16px;">
                                <span v-for="( tag, index ) in  item.tags " :key="index">
                                    <a-tag><a href="/:##">{{ tag }}</a></a-tag>
                                </span>
                            </div>

                        </div>
                        <!--点赞、评论、收藏-->
                        <template #actions>
                            {{ item.createTime }}
                            <a-button type="button" class="ant-btn ant-btn-text" block="true" :style="{ border: 'none' }">
                                <a-space style=" gap:5px;">
                                    <like-outlined @click="dianzan" />{{ item.thumbNum }}
                                </a-space>
                            </a-button>

                            <a-button type="button" class="ant-btn ant-btn-text" block="true" :style="{ border: 'none' }">
                                <a-space style=" gap:5px;">
                                    <smile-outlined />{{ item.favourNum }}
                                </a-space>
                            </a-button>

                            <a-button type="button" class="ant-btn ant-btn-text" block="true" :style="{ border: 'none' }"
                                @click="toggleEmojiSending(item.id)">
                                <a-space style=" gap:5px;">
                                    <message-outlined />{{ item.viewNum }}条评论
                                </a-space>
                            </a-button>

                        </template>
                        <!--文章封面-->
                        <template #extra>
                            <a-image :width="120" :src="item.avatar" />
                        </template>
                    </a-list-item>
                    <!--显示评论-->
                    <emoji-sending v-if="showEmojiSending" @cancel="toggleEmojiSending" />
                </a-card>

            </a-list-item>

        </template>
        <a-card style="margin-top: 18px;margin-left: 4px;"><a-skeleton active avatar :paragraph="{ rows: 4 }" /></a-card>
    </a-list>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref } from 'vue';
import EmojiSending from "@/components/EmojiSending.vue";
import myAxios from "../plugins/myAxios";

import {
    LikeOutlined,
    MessageOutlined,
    SmileOutlined,
    DownOutlined,
    UpOutlined,
    CommentOutlined
} from '@ant-design/icons-vue';

const showEmojiSending = ref(false);

const toggleEmojiSending = (prams: any) => {
    showEmojiSending.value = !showEmojiSending.value;
    alert(prams)
    // myAxios
    //     .get('/post/comment', { params: { postId: prams } })
    //     .then((res) => {
    //         //处理得到的帖子评论
    //         const
    //     })

}

const tooltipRef = ref();

const openTooltip = () => {
    tooltipRef.value.setVisible(true); // 打开Tooltip
};

interface Props {
    postList: any[];
}

const props = withDefaults(defineProps<Props>(), {
    postList: () => [],
});

const dianzan = () => {
    console.log(1)
};

const isContentExpanded = ref(false)
const maxLength = ref(100)

const actions: Record<string, string>[] = [
    { type: 'StarOutlined', text: '156' },
    { type: 'LikeOutlined', text: '156' },
    { type: 'MessageOutlined', text: '2' },
];

</script>

<style lang="scss" scoped>
#title {
    text-decoration: none;
}

.user-name {
    color: black;
    text-decoration: none;
    font-weight: normal;
}

.user-name:hover {
    color: rgb(29, 115, 244);
}

.post-title {
    color: black;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
}

.post-title:hover {
    color: rgb(29, 115, 244);
}

.tags {
    font-size: 16px;
}
</style>
<style>
.connentclass pre {
    background-color: #f8f8f8bd !important;
    color: black !important;
}

.connentclass strong {
    font-weight: 500;
}

.connentclass p {
    margin-bottom: 15px;
}
</style>