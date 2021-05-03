<template>
  <div class="customerService">
    <nav-bar></nav-bar>
    <div class="chat">
      <div class="content" ref="content">
      </div>
      <div class="onInput">
        <input type="text" @keyup.enter="OnSendInfo" v-model="inputInfo">
        <button class="send" @click="OnSendInfo">发 送</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index';
import navBar from '../components/navBar.vue';
import robotAvatar from '../assets/logo.png';

export default {
  components: {
    navBar,
  },
  data() {
    return {
      inputInfo: '',
      avatarSrc: {
        user: 'https://img01.yzcdn.cn/vant/cat.jpeg',
        robot: robotAvatar,
      },
    };
  },
  methods: {
    // 发送消息
    OnSendInfo() {
      if (!this.inputInfo) {
        return;
      }
      const sendInfor = this.inputInfo;
      this.inputInfo = '';
      this.createDom('user', sendInfor);
      this.getRobotReply(sendInfor);
    },
    // 获取回复信息
    getRobotReply(sendInfor) {
      api.getRobotReply({ text: sendInfor }).then((res) => {
        this.createDom('robot', res.text);
      }).catch((err) => {
        throw err;
      });
    },
    // 生成聊天记录
    createDom(type, data) {
      const infoDom = this.$refs.content;
      const div = document.createElement('div');
      div.className = type;
      div.innerHTML = `<img src="${this.avatarSrc[type]}" alt="">
          <div class="text">${data}</div>`;
      infoDom.appendChild(div);
      infoDom.scrollBy({
        top: 500,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style scoped lang='less'>
@bgcolor: rgb(59, 165, 10);
.customerService{
  height: 100vh;
  background-color: #fff;
  z-index: 2;
  .chat{
    .onInput{
      padding: 8px 5px;
      display: flex;
      position: fixed;
      width: 100%;
      bottom: 0px;
      box-shadow: 0px -1px 5px #eeeeee;
      justify-content: center;
      input{
        height: 24px;
        padding: 0 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
        width: 250px;
      }
      .send{
        width: 60px;
        height: 24px;
        border: none;
        border-radius: 5px;
        background-color: @bgcolor;
        color: #fff;
        margin-left: 5px;
      }
    }
  }
}
</style>
<style lang='less'>
@bgcolor: rgb(59, 165, 10);
.retouch {
  content: '';
  width: 0;
  height: 0;
  border: 5px solid;
  position: absolute;
  top: 15px;
}
.customerService{
     .content{
      height: 83.5vh;
      background-color: #eeeeee;
      overflow-y: scroll;
      padding: 10px 0;
      img{
        width: 40px;
        height: 40px;
        border-radius: 8px;
      }
      .text{
        position: relative;
        text-align: left;
        line-height: 40px;
        background-color: @bgcolor;
        color: #ffffff;
        border-radius: 5px;
        padding: 0 10px;
        margin: 0 10px;
      }
      .robot, .user{
        margin-top: 10px;
        display: flex;
        width: 85vw;
        font-size: 14px;
      }
      .robot{
        float: left;
        .text::before{
          .retouch();
          border-color: transparent @bgcolor transparent transparent;
          left: -9px;
        }
      }
      .user{
        float: right;
        justify-content: flex-end;
        img{
          order: 2;
        }
        .text::after{
          .retouch();
          border-color: transparent transparent transparent @bgcolor;
          right: -9px;
        }
      }
    }
}
</style>
