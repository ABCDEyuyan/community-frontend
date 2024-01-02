<template>
    <div class="ant-pro-top-nav-header-menu" style="flex: 1 1 0%;">

        <a-menu class="top-nav-menu" v-model:selectedKeys="current" mode="horizontal" role="menu" tabindex="0"
            data-menu-list="true">
            <a-menu-item key="mail">
                <template #icon>
                    <mail-outlined />
                </template>
                主页
            </a-menu-item>
            <a-menu-item key="app" disabled>
                <template #icon>
                    <appstore-outlined />
                </template>
                学习
            </a-menu-item>
            <a-sub-menu key="sub1">
                <template #icon>
                    <setting-outlined />
                </template>
                <template #title>资源</template>
                <a-menu-item-group title="Item 1">
                    <a-menu-item key="setting:1">Option 1</a-menu-item>
                    <a-menu-item key="setting:2">Option 2</a-menu-item>
                </a-menu-item-group>
                <a-menu-item-group title="Item 2">
                    <a-menu-item key="setting:3">Option 3</a-menu-item>
                    <a-menu-item key="setting:4">Option 4</a-menu-item>
                </a-menu-item-group>
            </a-sub-menu>
            <a-menu-item key="alipay">
                <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
                    问答
                </a><br>
            </a-menu-item>
            <a-menu-item key="biji">
                <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
                    笔记
                </a>
            </a-menu-item>
        </a-menu>
        <div aria-hidden="true" style="display: none;"></div>
    </div>

    <div>
        <div class="handler-search">
            <!-- <a-auto-complete :options="[{ value: 'text 1' }, { value: 'text 2' }]" autosize:true style="width: 400px"
                placeholder="Email">
                <template #addonAfter>
                    <search-outlined />
                </template>
            </a-auto-complete> -->

            <a-input type="primary" allow-clear>
                <template #suffix>
                    <search-outlined v-on:click="serchtest" />
                </template>
            </a-input>

            <!-- <a-auto-complete :options="[{ value: 'text 1' }, { value: 'text 2' }]" style="width: 200px"
                placeholder="Email" />
            <a-button type="primary"><search-outlined /></a-button> -->



        </div>
    </div>

    <a target="_blank">
        <a-button block="true" :style="{ border: 'none' }" alt="写作" @click="openTiptap">
            <form-outlined :style="{ fontSize: '20px', color: '#1E90FF' }" />
        </a-button>
    </a>

    <a-avatar style="margin-right: 6px;" @click="judgeLocal" v-if="!showEmojiSending"><!--=true-->
        <!-- <a @click="formLogin"> -->
        <a>

            <a-tooltip placement="left" title="登录享有更多功能">
                <router-link to="/login">
                    <UserOutlined :style="{ fontSize: '20px' }" />
                </router-link>
            </a-tooltip>

        </a>
    </a-avatar>

    <div class="ant-dropdown-trigger action___LP4_P account___6HXOq" style="margin-left: 3px;" @click="judgeLocal"
        v-if="showEmojiSending"> <!--=false-->
        <a-dropdown>
            <a class="ant-dropdown-link" @click="handleDropdownClick">
                <a-avatar shape="circle" size="default" style="margin-bottom: 6px;margin-right: 2px;"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
            </a>
            <template #overlay>
                <a-menu>
                    <a-menu-item key="1">
                        <router-link to="/user/home"><user-outlined />&nbsp;&nbsp;个人主页</router-link>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <bell-outlined />&nbsp;&nbsp;我的消息
                    </a-menu-item>
                    <a-menu-item key="3">
                        <poweroff-outlined />&nbsp;&nbsp;退出
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
    MailOutlined, AppstoreOutlined, SettingOutlined, FormOutlined, UserOutlined, PoweroffOutlined, BellOutlined, SearchOutlined
} from '@ant-design/icons-vue';
import type { SelectProps } from 'ant-design-vue';


const value: string | null = localStorage.getItem('key');

export default defineComponent({
    methods: {
        openTiptap() {
            this.$router.push('/tiptap');
        },
        // formLogin() {
        //     // 在点击按钮、触发事件等地方调用以下代码
        //     window.open('http://localhost:8081/login.html', '_blank');
        // },
        toggleEmojiSending() {
            this.showEmojiSending = !this.showEmojiSending;
        },
        judgeLocal() {
            if (value == null) {
                this.showEmojiSending = true
            }
            if (value != null) {
                this.showEmojiSending = false
            }
        },
        handleDropdownClick() {
            // 下拉菜单的点击事件处理逻辑
            alert(1)
        },

        serchtest() {
            alert(1)
        }
        // handleMouseOver() {
        //     alert("请登录")
        // }
    },
    name: "NavigationMenu",
    data() {
        return {
            title: "NavigationMenu",
            showEmojiSending: false
        }
    },
    components: {
        MailOutlined,
        AppstoreOutlined,
        SettingOutlined,
        FormOutlined,
        UserOutlined,
        PoweroffOutlined,
        BellOutlined,
        SearchOutlined
    },
    setup() {
        const current = ref<string[]>(['mail']);
        const options = ref<SelectProps['options']>([
            {
                value: 'a1',
                label: 'a1',
            },
        ]);
        return {
            current,
            options,
        };

    },
});
</script>
<style scoped>
.ant-dropdown-trigger-action:hover .ant-dropdown-link {
    /* 触发器元素在鼠标悬停时的样式 */
    color: red;
}

.ant-dropdown-trigger-account .ant-dropdown-link {
    /* 触发器元素的样式 */
    color: blue;
}
</style>