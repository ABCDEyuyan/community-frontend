<template>
    <div class="chatIcon">
        <el-popover popper-class="biaoqing" placement="top" :width="400" trigger="click">
            <template #reference>
                <el-button class="emotionSelect"></el-button>
            </template>
            <div class="emotionList">
                <a href="javascript:void(0);" @click="getEmo(index)" v-for="(item,index) in faceList" :key="index"
                    class="emotionItem">{{item}}</a>
            </div>
        </el-popover>
    </div>
</template>
<script>
import appData from "../utils/emoji-ts/emoji"
export default {
    mounted() {
        for (let i in appData) {
            this.faceList.push(appData[i].char);
        }
    },
    data() {
        return {
            faceList: [],
            emojiItem: null,
        };
    },
    methods: {
        getEmo(index) {
            this.emojiItem = index;
            this.$emit("changeText")
        }
    }
}
</script>
<style scoped>
.emotionSelect {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.emotionSelect img {
    width: 14px;
    height: 14px;
}
.chatIcon {
    padding: 0 0px;
    font-size: 25px;
}
.emotionList {
    display: flex;
    flex-wrap: wrap;
    /* padding: 5px; */
}
.emotionItem {
    width: 10%;
    font-size: 20px;
    text-align: center;
}
/*包含以下四种的链接*/
.emotionItem {
    text-decoration: none;
    width: 25px;
    padding: 0;
    margin: 1.5;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
    text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
    text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
    text-decoration: none;
}
</style>