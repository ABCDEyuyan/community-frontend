<template>
    <div style="background-color: rgb(255, 255, 255); padding-top: 1px;">
        <div class="div-a-input-clas">
                类型：
                <a-radio-group class="div-a-input-clas" v-model:value="categoryvalue">
                    <a-radio-button value="文章">文章</a-radio-button>
                    <a-radio-button value="随笔">随笔</a-radio-button>
                    <a-radio-button value="资源" disabled>资源</a-radio-button>
                    <a-radio-button value="问答" disabled>问答</a-radio-button>
                    <a-radio-button value="简历" disabled>简历</a-radio-button>
                    <a-radio-button value="面试题" disabled>面试题</a-radio-button>
                    <a-radio-button value="笔记" disabled>笔记</a-radio-button>
                    <a-radio-button value="代码" disabled>代码</a-radio-button>
                    <a-radio-button value="求资源" disabled>求资源</a-radio-button>
                    <a-radio-button value="draft" >查看稿件</a-radio-button>
                </a-radio-group>
            </div>
        <div v-if="categoryvalue!='draft'">
            <div>
                <div v-show="categoryvalue=='文章'">
                    <div class="div-a-input-clas">
                        <span>标题：</span><a-input v-model:value="titlevalue" class="a-input-clas"/>
                    </div>
                    <div class="div-a-input-clas">
                        <span>描述：</span><a-input v-model:value="descriptionvalue" class="a-input-clas"/>
                        <!-- <label for="">描述  ：<input type="text" name="" id="" style="width: 800px;"></label> -->
                    </div>
                </div>
            </div>
            <div class="div-a-input-clas">
                <span>编辑：</span>
                <div class="tiptapbody">
                    <div v-if="editor" class="tiptapButton">
                        <button @click="editor.chain().focus().toggleBold().run()" 
                            :disabled="!editor.can().chain().focus().toggleBold().run()"
                            :class="{ 'is-active changeColor': editor.isActive('bold')}">
                            <img src="../assets/tiptap-img/text--bold.svg" alt="粗体">
                        </button>
                        <button @click="editor.chain().focus().toggleItalic().run()"
                            :disabled="!editor.can().chain().focus().toggleItalic().run()"
                            :class="{ 'is-active changeColor': editor.isActive('italic')}">
                            <img src="../assets/tiptap-img/text--italic.svg" alt="斜线">
                        </button>
                        <button @click="editor.chain().focus().toggleStrike().run()"
                            :disabled="!editor.can().chain().focus().toggleStrike().run()"
                            :class="{ 'is-active changeColor': editor.isActive('strike')}">
                            <img src="../assets/tiptap-img/text--strikethrough.svg" alt="删除线">
                        </button>
                        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                            :class="{'is-active changeColor': editor.isActive('heading', { level: 1 })}">
                            <img src="../assets/tiptap-img/H1-22.svg" alt="H1">
                        </button>
                        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                            :class="{'is-active changeColor': editor.isActive('heading', { level: 2 }) }">
                            <img src="../assets/tiptap-img/h2.svg" alt="H2">
                        </button>
                        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                            :class="{'is-active changeColor': editor.isActive('heading', { level: 3 }) }">
                            <img src="../assets/tiptap-img/h3.svg" alt="H3">
                        </button>
                        <button @click="editor.chain().focus().toggleCodeBlock().run()"                                                                                                         
                            :class="{'is-active changeColor': editor.isActive('codeBlock') }">
                            <img src="../assets/tiptap-img/code.svg" alt="code">
                        </button>
                        <button @click="editor.chain().focus().toggleBulletList().run()"
                            :class="{ 'is-active changeColor': editor.isActive('bulletList') }">
                            <img src="../assets/tiptap-img/list--bulleted.svg" alt="无序列表">
                        </button>
                        <button @click="editor.chain().focus().toggleOrderedList().run()"
                            :class="{'is-active changeColor': editor.isActive('orderedList') }">
                            <img src="../assets/tiptap-img/list--numbered.svg" alt="有序列表">
                        </button>
                        <div class="emojibodyte">
                            <div class="emojibody" v-if="stat">
                                <Emoji ref="getEmoji" @changeText="changeText"></Emoji>
                            </div>
                            <button @click="statEmoji" class="emojclick"><img src="../assets/emoji-img/face--activated.svg"
                                    alt="小表情"></button>
                        </div>
                        <div style="padding: 10px,5px,0,5px; height: 40px;width: 40px;">
                            <label for="addfile">
                                <img src="../assets/tiptap-img/JPG.svg" alt="图片上传" style="width: 30px; height: 30px;margin-top: 5px;margin-bottom: 5px;">
                            </label>
                            <input  type="file" id="addfile" @change="addImage(event)" accept=".png, .jpg, .jpeg"
                                style="display: none; " />
                        </div>
                    </div>
                    <editor-content :editor="editor" />
                </div>
            </div>
            
            
            <div class="div-a-input-clas" style=" flex-wrap: wrap;width: 250px;">
                <span style="">封面</span>
                <div style="margin: 0 0 20px 90px;">
                    <label for="avatar" >
                        <div style="border: 1px dashed black; width: 160px; height: 160px;margin: 0; border-radius: 5px;"><img src="../assets/tiptap-img/JPG.svg" id="showimgto" alt="上传图片" style="max-width: 158px;max-height: 158px;"></div>
                    </label>
                    <input type="file" name="" id="avatar" @change="imageshow()" accept=".png, .jpg, .jpeg" style="display: none; ">
                </div>
            </div>
            <div class="div-a-input-clas" >
                <span>标签：</span>
                <a-select class="a-input-clas"
                        v-model:value="tagsvalue"
                        mode="multiple"
                        style="width: 80%"
                        placeholder="最多支持选择5个标签"
                        :options="options"
                        :field-names="{ label: 'tagName', value: 'tagName' }"
                        @change="tagchag"
                    >
                    </a-select>
            </div>
            <div>
                <button class="buttonsout" @click="getjson(event)">发布</button>
                <button class="buttonsout" @click="pushDraft">存稿件箱</button>
            </div>
        </div>
        <div v-else>
            
        </div>
    </div>
</template>
 
 
<script>

import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Image from '@tiptap/extension-image'
import myaxios from '../plugins/myAxios.ts'
import Emoji from './Emoji-mode.vue'
import { message } from 'ant-design-vue';
import { ref, reactive } from 'vue'

const stat = ref(false);

function createUUid() {
    return new Date().getTime() + Math.random().toString(36).substr(2);
}
const buttonstat=ref(true)
var imgsum = [];
var imgindex = 0;
var removeimgname = [];
const options=ref([]);
const tagsvalue = ref();
const titlevalue=ref();
const categoryvalue=ref("文章")
const descriptionvalue=ref();
// var buttonstat=false
export default {
    components: {
        EditorContent,
        Emoji,
        
    },
    data() {
        return {
            imgsum,
            editor: null,
            options,
            stat,
            titlevalue,
            tagsvalue,
            descriptionvalue,
            categoryvalue,
        }
    },
    methods: {
        imageshow(){
            var that=document.getElementById("avatar").files[0];
            if (that == null) {
                message.warning('未选中图片')
                return;
            }
            console.log(that)
            var f = new FileReader();
            f.onload = function() {
                var img= document.getElementById("showimgto");
                img.src=f.result;
            }
            f.readAsDataURL(that);

        },
        tagchag(tagsvalue){
            if(tagsvalue.length>5){
                tagsvalue.splice(tagsvalue.length-1,tagsvalue.length)
                message.warning('最多支持5个标签')
            }
        },
        statEmoji() {
            if (stat.value) {
                stat.value = false
            } else {
                stat.value = true
            }
        },
        changeText() {
            this.editor.commands.insertContent(this.$refs.getEmoji.faceList[this.$refs.getEmoji.emojiItem])
            stat.value = false
            this.editor.commands.focus()
        },
        // changeText() {
        //     this.editor.commands.insertContent(this.$refs.getEmoji.faceList[this.$refs.getEmoji.emojiItem])
        // },
        isStringNull(obj){
            if(obj!=null&&obj!=""&&obj.length>0)
                return false
            else
                return true
        },
        //发送编辑器内容
        getjson(l) {
            var htmldata = this.editor.getHTML()
            // 提交前的条件判断
            if(htmldata.replace(/<\/?.+?\/?>/g,'').length<15){
                message.warning('最少包含15个字')
                return
            }
            if(categoryvalue.value=='文章'&&(this.isStringNull(titlevalue.value)||this.isStringNull(descriptionvalue.value))||this.isStringNull(tagsvalue.value)){
                message.warning('请填写内容')
                return
            }

            let imgdom=document.getElementById("avatar").files[0];
            myaxios({method:'Post',url:'/tiptapfile/add',headers: { "Content-Type": "multipart/form-data" },data: { file:imgdom}})
            .then((rest)=>{    
                this.postpush("/post/insert",rest)
            })

        },
        postpush(geturl,rest){
            var htmldata = this.editor.getHTML()
            myaxios({
                    method: 'POST',
                    url: geturl,
                    data: {
                        //用户账号
                        userAccount: '2',
                        //标题
                        title: titlevalue.value,
                        //内容
                        content: htmldata,
                        //描述
                        description:descriptionvalue.value,
                        //标签以 ,分隔
                        tags: tagsvalue.value,
                        //文章种类
                        category: categoryvalue.value,
                        //帖子封面名
                        avatar:rest.data.fileName,
                    },
                }).then((res) => {
                    console.log(res)
                });
        },
        pushDraft(){
            let imgdom=document.getElementById("avatar").files[0];
            myaxios({method:'Post',url:'/tiptapfile/add',headers: { "Content-Type": "multipart/form-data" },data: { file:imgdom}})
            .then((rest)=>{    
                this.postpush("/draft/insert",rest)
            })
        },
        //添加图片
        addImage(l) {
            // File
            let url;
            let imgs = document.getElementById('addfile').files[0];
            if (imgs == null) {
                alert('内容不能为空');
            } else {
                myaxios({
                    url: "/tiptapfile/add",
                    method: 'Post',
                    headers: { "Content-Type": "multipart/form-data" },
                    data: { file: imgs },
                }).then((res) => {
                    this.editor.commands.setImage({ src: res.data.fileUrl, alt: res.data.fileName})
                    // this.editor.chain().focus().setImage({ src: res.data.fileUrl, alt: res.data.fileName }).run();
                     
                    // this.editor.commands.newlineInCode()
                    this.imgsum.push(res.data.fileName)
                });
            }
        },
    },
    created(){
        myaxios({method:'POST',url:'/tag/list'}).then((res) =>{
            this.options=res.data
            console.log(this.options)
        })
    },
    mounted() {
        this.editor = new Editor({
            onFocus({ editor, event }) {
                // alert("ee")
                if (stat.value) {
                    stat.value = false
                }
            },
            onCreate({ editor }) {
                console.log('in')
                var sc=window.location.hash.split("?")[1];
                if(sc!=''&&sc!=null){
                    var did=sc.substring((sc.indexOf("=") + 1), sc.length);
                    alert('eeeee')
                    // myaxios({
                    //     method: 'POST',
                    //     url: "",
                    //     data: {
                    //         //userid
                    //         userAccount: '',
                    //         //draftid
                    //         did:''
                    //     },
                    // }).then((res) => {
                    //     if(res.message='ok') 
                    //         editor.commands.setContent('res.data')
                    // });
                }
            },
            //移除图片 有问题待完成
            // onBlur({editor,event}){
            //     // let e= document.getElementsByTagName("my-custom-class")
            //     var matches = document.querySelectorAll(".ProseMirror > img");

            //     for (let i = 0; i <imgsum.length; i++) {
            //         // console.log(imgsum[i])
            //         // if(imgsum[i]==''){
            //         //     continue;
            //         // }

            //         var tte=false;
            //         for (let j = 0; j < matches.length; j++) {
            //             if(imgsum[i]==matches[j].getAttribute("alt")||imgsum[i]==''){
            //                 tte=true;
            //                 break;
            //             }
            //         }
            //         if(!tte){
            //             removeimgname.push(imgsum[i])
            //         }
            //         console.log(removeimgname)
            //         for (let b = 0; b < removeimgname.length; b++) {
            //             if(removeimgname[b]!=""&&removeimgname.length>0){
            //                 myaxios({
            //                     url:"/tiptapfile/remove",
            //                     method:'Post',
            //                     // headers:{"Content-Type":"multipart/form-data"},
            //                     data:{fileName:removeimgname},
            //                 }).then((res)=>{
            //                     removeimgname[b]='';
            //                     imgsum[i]='';
            //                     // this.editor.chain().focus().setImage({ src:res.data.fileUrl,alt:res.data.fileName}).run();
            //                     // this.imgsum.push(res.data.fileName)
            //                 });
            //             }
            //         }


            //     }
            //     // remove
            //     // imgsum[i]
            //     // console.log(removeimgname)
            // },
            // onUpdate({editor,event}){
            //     console.log(imgsum)
            // },
            extensions: [
                Editor,
                StarterKit,
                Image.configure({
                    HTMLAttributes: {
                        class: 'my-custom-class',
                    },
                }),
            ],
            content: ``,
        })
    },
    beforeUnmount() {
        this.editor.destroy()
    },
}

</script>
 
<style>
/* 编辑器 */
.tiptapbody {
    min-width: 50%;
    width: 1100px;
    height: 50%;
    margin: 0 30px 20px 90px;
}
.changeColor{
    border-bottom: solid 4px rgb(143, 180, 228);
}


.ProseMirror-focus{
    /* border-color: greenyellow; */
    color: aqua;
}
.ProseMirror {
    min-height: 400px;
    border: solid 1px rgb(201, 204, 208);
    background-color: #FFF;
    color: black;
    font-size: 17px;
    font-weight: 200;
    /* margin-top: 10px!important; */
    /* border-bottom: solid 2px rgb(143, 180, 228); */
    /* background-color: rgb(255, 255, 255); */
}

.ProseMirror img {
    max-width: 70%;
    /* width: auto; */
    height: 250px;
    /* border-bottom:  */
}

.ProseMirror pre {
    background-color: #f8f8f8bd;
    color: black;
}

.ProseMirror strong {
    font-weight: 500;
}
.ProseMirror p{
    margin-bottom: 15px;
}
/* 输出框 */
.a-input-clas{
    width: 1100px !important;
    margin: 0 0px 0 50px !important;
}
.div-a-input-clas{

    /* width: 1000px; */
    margin: 20px 0px 20px 50px !important;
}

/* 操作按钮样式 */
button {
    min-height: 40px;
    min-width: 40px;
    background-color: #FFF;
    border: none;
    margin: 0,5px,0,5px;
    padding: 0;
}

button img {
    /* margin: 0, 30px, 0, 30px; */
    height: 25px;
    width: 25px;
    padding:0;
}
.buttonsout{
    margin: 5px 5px;
    padding: 5px;
    border-radius: 10px;
}
.buttonsout:hover{
    border: 1px solid rgba(0, 184, 225, 0.595);
    color: rgba(0, 184, 225, 0.595);
}
/* button:hover {
    background-color: rgba(242, 242, 242, 0.8) !important;
} */

.tiptapButton {
    display: flex;
    background-color: #FFF;
}


/* emoji */
.emojclick {
    border: none;
    background-color: rgb(255, 255, 255);
    padding: 0;
}

.emojclick img {
    width: 30px;
    height: 30px;
}

.addServer-class {
    width: 70px;
    height: 50px;
    border: 1px solid rgb(201, 204, 208);
    border-radius: 2px;
    /* background-color: rgb(201, 204, 208); */
}

.emojibody {
    border: 1px solid rgb(227, 239, 241);
    width: 250px;
    height: 300px;
    margin: 0, 5px, 0, 5px;
    position: absolute;
    top: 35px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    z-index: 20;
}

.emojibodyte {
    position: relative;
}

.emojibody a {
    padding: 5px;
    width: 30px;
    margin: 5px;
}</style>