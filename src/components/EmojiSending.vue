<template>
  <div style="margin-bottom: 16px;"></div>

  <a-card title="0条评论" style="padding-top: 8px;">
    <template #extra>
      <a-radio-group v-model:value="radios" button-style="solid" style="font-weight: normal;">
        <a-radio-button value="new">最新</a-radio-button>
        <a-radio-button value="hot">最热</a-radio-button>
      </a-radio-group>
    </template>

    <div style="padding-top: 8px;">
      <div>
        <textarea name="" @focus="statEmojiCloen" id="textarea" rows="2" style="resize:none" class="emojitext"
          placeholder="请文明发炎"></textarea>
      </div>
      <div class="emojimodebody">
        <div class="emojibodyte">
          <div class="emojibody" :key="1" v-if="stat">
            <Emoji ref="getEmoji" @changeText="changeText"></Emoji>
          </div>
          <button @click="statEmoji" class="emojclick"><img src="../assets/emoji-img/face--activated.svg"
              alt="小表情"></button>
        </div>
        <button @click="addServerText" class="addServer-class">发送</button>
      </div>
    </div>

    <a-comment>
      <!-- :data-source="props.postList" -->
      <!-- <template #renderItem="{ item }">
        <a-image :width="80" :src="item.userAvatar"> </a-image>
      </template> -->
      <template #actions>
        <span key="comment-nested-reply-to">Reply to</span>
      </template>
      <template #author>
        <a>Han Solo</a>
      </template>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure).
        </p>
      </template>
      <a-comment>
        <template #actions>
          <span key="comment-nested-reply-to">Reply to</span>
        </template>
        <template #author>
          <a>Han Solo</a>
        </template>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
        </template>
        <a-comment>
          <template #actions>
            <span key="comment-nested-reply-to">Reply to</span>
          </template>
          <template #author>
            <a>Han Solo</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          </template>
          <template #content>
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
            </p>
          </template>
        </a-comment>
      </a-comment>

    </a-comment>



  </a-card>
</template>

<script>
import Emoji from '@/components/Emoji-mode.vue'
import myaxios from '../plugins/myAxios.ts'
import { ref, reactive } from 'vue'
const stat = ref(false);
export default {
  components: {
    Emoji
  },
  data() {
    return {
      stat,
      radios: "new"
    }
  },
  methods: {
    statEmoji() {
      if (stat.value) {
        stat.value = false
      } else {
        stat.value = true
      }
    },
    statEmojiCloen() {
      if (stat.value)
        stat.value = false
    },
    changeText() {
      var textArea = document.getElementById('textarea');
      function changeSelectedText(obj, str) {
        textArea.setRangeText(str);
        // 在未选中文本的情况下，重新设置光标位置
        textArea.selectionStart += str.length;
        textArea.focus()
        console.log(str)
      }
      changeSelectedText(textArea, this.$refs.getEmoji.faceList[this.$refs.getEmoji.emojiItem]);
      // this.message = textArea.value;// 要同步data中的数据
    },
    addServerText() {
      var textArea = document.getElementById('textarea');
      if (textArea.value == null || textArea.value == "") {
        alert('内容不能为空')
      } else {
        console.log(textArea.value)
        myaxios({
          url: '/comment/commentadd',
          method: 'Post',
          params: {
            postid: 1,
            userAccount: '2',
            comment: textArea.value,
          },
        }).then((res) => {
          // console.log(res)
        });
      }
    }
  }
}
</script>

<style>
.emojibody {
  border: 1px solid rgb(227, 239, 241);
  width: 250px;
  height: 300px;
  margin: 0, 5px, 0, 5px;
  position: absolute;
  top: 35px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}

.emojibodyte {
  position: relative;
}

.emojibody a {
  padding: 5px;
  width: 30px;
  margin: 5px;
}

#textarea {
  /* font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; */
  min-width: 600px;
  /* width: 800px; */
  font-weight: 100;
  font-size: 18px;
  border-radius: 10px;
  border: rgb(201, 204, 208) solid 1px;
}

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
  border-radius: 12px !important;
  position: absolute;
  right: 0px;
  /* background-color: rgb(201, 204, 208); */
}

.addServer-class :hover {
  /* background-color: rgb(125, 129, 133); */
}

.emojimodebody {
  display: flex;
  position: relative;
}

.emojitext {
  color: black;
}
</style>  