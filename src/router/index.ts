import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
//默认页面
import IndexPage from "../pages/IndexPage.vue";
import UserLogin from "../pages/UserLogin.vue"

import EmojiSending from "../components/EmojiSending.vue"
import Tiptap from "../components/TiptapSend.vue"
import UserHomeIndex from "../components/UserHome/UserHomeIndex.vue"


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: IndexPage,
    },
    {
        path: "/category",
        component: IndexPage,
    },
    //消息发送
    {
        path: "/emojisending-mod",
        component: EmojiSending,
    },
    {
        path: "/tiptap",
        component: Tiptap,
    },
    {
        path: "/login",
        component: UserLogin,
    },
    {
        path: "/user/home",
        component: UserHomeIndex,
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
