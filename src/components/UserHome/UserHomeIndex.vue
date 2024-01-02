<template>
    <div>
        <!--用户头部-->
        <div class="Head">
            <a-card class="CardHead">
                <!--封面上传-->
                <div>
                    <a-upload class="background-image-button" v-model:file-list="fileList" name="file" :headers="headers"
                        @change="handleChangeBack">
                        <a-button class="transparent-button">
                            <upload-outlined></upload-outlined> 编辑封面图片
                        </a-button>
                    </a-upload>
                    <div class="background-image" v-if="!imageUrl"></div>
                    <div class="no-background-image" v-else></div>
                </div>
                <!--头像上传-->
                <a-upload name="file" list-type="picture-card" class="avatar-uploader" :show-upload-list="false"
                    :before-upload="beforeUpload" :customRequest="selfUpload" @change="handleChange" :progress="progress">
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
                <a-button type="primary" class="user-button">编辑个人资料</a-button>
            </a-card>
        </div>
        <!-- 卡片间隔 -->
        <div style="margin-bottom: 16px;"></div>
        <a-row>
            <!-- 左边边 -->
            <a-col class=" ant-col ant-col-xs-24 ant-col-lg-14" style="padding-left: 8px; padding-right: 8px;">
                <a-row class="ant-row ant-row-no-wrap" style="margin-left: -6px; margin-right: -6px;">
                    <a-col style="padding-left: 6px; padding-right: 6px; flex: 1 1 auto; min-width: 0px;">
                        <!--用户中心-->
                        <a-card>
                            <a-tabs v-model:activeKey="activeKey">
                                <a-tab-pane key="1" tab="Tab 1" style="height: 200px">Content of Tab Pane 1</a-tab-pane>
                                <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
                                <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
                                <template #renderTabBar="{ DefaultTabBar, ...props }">
                                    <component :is="DefaultTabBar" v-bind="props" :style="{ opacity: 0.5 }" />
                                </template>
                            </a-tabs>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
            <!-- 右边边 -->
            <a-col class="ant-col ant-col-xs-24 ant-col-lg-7" style="padding-left: 8px; padding-right: 8px;">
                <a-col style="padding-left: 6px; padding-right: 6px; flex: 1 1 auto; min-width: 0px;">
                    <a-card></a-card>
                </a-col>
            </a-col>
        </a-row>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { PlusOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import myAxios from "../../plugins/myAxios";


const activeKey = ref('1');

const handleChangeBack = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
};

const fileList = ref([]);
const headers = {
    authorization: 'authorization-text',
};

const loading = ref<boolean>(false);
let imageUrl = ref<string>('');

const handleChange = (info: UploadChangeParam) => {
    console.log(info.file.status)
    if (info.file.status === 'uploading') {
        loading.value = true;
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url;
            loading.value = false;
        });
    }
    if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
    }
};

const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const selfUpload = ({ action, file, onSuccess, onError, onProgress }) => {
    const formData = new FormData();
    formData.append('file', file)
    // console.log(formData, 'formData')
    myAxios({
        url: '/user/avatarUpload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    }).then(res => {
        if (res.status === 200) {
            imageUrl = res.data.url
        } else {
            message.error(res.data.msg)
        }
    })
}
function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}


const progress: UploadProps['progress'] = {
    strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
    },
};
</script>
<style scoped>
.Head {
    margin: 10px auto 10px auto;
    padding: 0 16px 0 16px;
    position: relative;
    width: 1088px;
}

.avatar-uploader {
    margin-top: 140px;

}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}

.CardHead {
    width: 100%;
    height: 380px;
    background: #fff;
    border-radius: 2px;
    margin-bottom: 0px;
    box-shadow: 0 1px 3px hsla(0, 0%, 7%, .1);
    overflow: hidden;
    position: relative;
    z-index: 0;
}

.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 66%;
    /* Adjust the height as needed */
    background-image: url('https://s.cn.bing.net/th?id=OHR.SleepingFox_ZH-CN2622967726_1920x1080.webp&qlt=50&quot;); opacity: ; display: block');
    background-size: cover;
    background-position: center;
    z-index: -1;
}

.no-background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 66%;
    /* Adjust the height as needed */
    background-image: url('https://th.bing.com/th/id/R.38938dc19ac95eeee5b00f451b355b70?rik=zlT%2bYdAjRYFpMw&riu=http%3a%2f%2fbpic.588ku.com%2felement_pic%2f00%2f94%2f14%2f9556f2bab6ab8be.jpg&ehk=ZZcQdjoGKuRlBOkw431kq9c8rp%2bJzz0TikU2BjlE1No%3d&risl=&pid=ImgRaw&r=0');
    background-size: cover;
    background-position: center;
    z-index: -1;
}

.background-image-button {
    margin-left: 88%;
}

.transparent-button {
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    border-color: transparent;
    color: #ffffffd5;
    /* 设置按钮文本颜色 */
}

.user-button {
    margin-left: 900px;
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    border-color: #1772f6;
    color: #1772f6;
    /* 设置按钮文本颜色 */
}
</style>
