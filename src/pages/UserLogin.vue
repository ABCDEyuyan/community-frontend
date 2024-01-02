<template>
    <div id="login" class="loginContainer">
        <div class="loginHeader">
            <span>欢迎登陆</span>
        </div>
        <div class="loginMainWrapper">
            <div class="loginWrapper">
                <div class="loginTipsWrapper" style="color: #ffffff">
                    <span class="siteSummaryTitle">有问题，就会有答案</span>
                    <div class="siteSummary">
                        <ul>
                            <li><a-icon type="check-square" style="margin-right: 10px" /><span>hhhh</span></li>
                            <li><a-icon type="check-square" style="margin-right: 10px" /><span>友好的界面展示，基于AntDesign组件库</span>
                            </li>
                            <li><a-icon type="check-square" style="margin-right: 10px" /><span>基于角色权限划分，更利于资源隔离</span></li>
                        </ul>
                    </div>
                </div>
                <div class="loginBoxWrapper">
                    <a-form-model v-model="formInline" @submit="handleSubmit" style="width: 100%">
                        <a-form-model-item style="text-align: center">
                            <h1>欢迎登录</h1>
                        </a-form-model-item>
                        <a-form-model-item>
                            <a-input v-model:value="formInline.user" placeholder="手机号">
                                <a-icon type="user" style="color:rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-model-item>
                        <a-form-model-item>
                            <a-input v-model:value="formInline.password" type="password" placeholder="密码">
                                <a-icon type="lock" style="color:rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-model-item>
                        <a-form-model-item>
                            <div class="rememberMeWrapper">
                                <a-checkbox-group v-model="formInline.resource">
                                    <a-checkbox value="true" name="type">记住密码</a-checkbox>
                                </a-checkbox-group>
                                <a href="">忘记密码</a>
                            </div>
                        </a-form-model-item>
                        <a-form-model-item>
                            <a-button @click="login" style="width: 100%" class="ant-btn ant-btn-primary">立即登录</a-button>
                            <!-- <router-link to="/admin" @click="login" style="width: 100%"
                                class="ant-btn ant-btn-primary">立即登录</router-link> -->
                            还没有账号?


                            <a-button type="primary" @click="showModal">立即注册</a-button>
                            <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
                                <p>这是一个弹窗的内容。</p>
                            </a-modal>

                            <!-- <a class="ant-btn ant-btn-link">立即注册
                                <el-dialog>
                                    <emoji></emoji>
                                </el-dialog>
                            </a> -->

                        </a-form-model-item>
                        <a-divider>其他登录方式</a-divider>
                        <a-form-model-item style="text-align: center">
                            <a-space size="large">
                                <a-icon type="weibo" style="font-size: 2em;cursor: pointer;color:#f50" />
                                <a-icon type="qq" style="font-size: 2em;cursor: pointer;color:#2b92e4;" />
                                <a-icon type="github" style="font-size: 2em;cursor: pointer;color:#333;" />
                            </a-space>
                        </a-form-model-item>
                    </a-form-model>
                </div>
            </div>
            <div class="loginFooter">
                © 2018-2021 CoreCmd 版权所有. 京ICP备18063315号-1 贵公网安备 52038202001416号
            </div>
        </div>
    </div>
</template>

<script>
import { Modal, Button } from 'ant-design-vue';
import myAxios from '../plugins/myAxios.ts';

// import Emoji from "../components/EmojiSending.vue";
export default {
    name: "UserLogin",
    // components: {
    //     Emoji
    // },
    components: {
        'a-modal': Modal,
        'a-button': Button,
    },
    data() {
        return {
            formInline: {
                user: '',
                password: '',
                resource: '',
                visible: false
            },
        };
    },
    methods: {
        login() {
            if (this.formInline.user == "") {
                alert("账号不能为空");
                return;
            }
            if (this.formInline.password == "") {
                alert("密码不能为空");
                return;
            }
            myAxios({
                url: "/user/login",
                method: "POST",
                params: {
                    phoneOrAccount: this.formInline.user,
                    userPassword: this.formInline.password,
                }
            }).then(function (resp) {
                if (resp.code == 200) {
                    alert("登入成功")
                    localStorage.setItem("nfLoginJwt", resp.data.token);
                    localStorage.setItem("userAccount", resp.data.userAccount);

                }
                else if (resp.code == 500) {
                    alert(resp.message)
                }
            })
        },
        handleSubmit(e) {
            console.log(this.formInline);
        },
        showModal() {
            this.visible = true;

        },
        handleOk() {
            // 处理弹窗确认按钮点击事件
            this.visible = false;
        },
        handleCancel() {
            // 处理弹窗取消按钮点击事件
            this.visible = false;
        },

    },
}
</script>

<style scoped>
.loginContainer {
    width: 100%;
    position: relative;
    background: url("../assets/img/back1.jpg");
    background-attachment: fixed;
    background-repeat: no-repeat !important;
    background-size: cover;
    background-position: center;
    padding-top: 185px;
    min-height: 100vh;

    /* position: relative;
    width: 100%;
    min-height: 100vh;
    background: url("../assets/img/back1.jpg") center center no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    padding-top: 25px; */

}

.loginHeader {
    width: 100%;
    height: 64px;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 15px rgba(0, 0, 0, .2);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding: 10px;
}

.loginHeader span {
    font-size: 25px;
    font-weight: 700;
}

.loginMainWrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
}

.loginWrapper {
    width: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    height: 100%;
}

.loginFooter {
    width: 100%;
    min-height: 64px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    text-align: center;
    color: #ffffff;
    margin-top: 40px;
}

.siteSummary ul {
    list-style: none;
    padding: 0;
}

.siteSummary ul li {
    margin-top: 10px;
    list-style: none;
}

@media screen and (min-width: 1200px) {
    .loginTipsWrapper {
        padding: 20px 30px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        min-height: 100%;
    }

    .loginBoxWrapper {
        background-color: #ffffff;
        padding: 20px;
        width: 400px;
        height: 100%;
        border-radius: 5px;
    }
}

@media screen and (min-width: 769px) and (max-width: 1200px) {
    .loginTipsWrapper {
        padding: 20px 30px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        height: 100%;
    }

    .loginBoxWrapper {
        background-color: #ffffff;
        padding: 20px;
        width: 400px;
        height: 100%;
        border-radius: 5px;
    }
}

@media screen and (max-width: 768px) {
    .loginTipsWrapper {
        display: none;
    }

    .loginBoxWrapper {
        background-color: #ffffff;
        padding: 20px;
        width: 100%;
        border-radius: 5px;
    }
}

.rememberMeWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
}

.siteSummaryTitle {
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 700;
}

.siteSummary {
    margin-top: 25px;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 300;
}
</style>

