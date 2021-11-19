<template>
  <div id="chat" class="chat">
    <div class="interlocutor-info">
      <img
        :src="activeChat.imgUrl"
        alt="profile-picture"
        class="chat-profile-pic"
      />
      <div class="basic-info">
        <span class="interlocutor-username">{{ activeChat.username }}</span>
        <!-- Тут я не знал что должно быть, предположил, что дескрипшн, тип статус юзера -->
        <span class="interlocutor-description"
          >{{ activeChat.description }}
        </span>
      </div>
    </div>
    <div ref="chatbox" class="chat-box">
      <div
        v-for="message in messages"
        :key="message.msg + Math.random().toString(36).substring(7)"
        class="message-wrapper"
        :class="message.fromMe ? 'right' : 'left'"
      >
        <div class="message-box">
          <div class="top" :class="message.fromMe ? 'sent' : 'received'">
            <span class="username">{{
              message.fromMe ? currentUser.username : activeChat.username
            }}</span>
            <span class="date">{{ computeDate(message.date) }}</span>
          </div>
          <div class="bottom">
            <div class="arrow">
              <div class="inner"></div>
            </div>
            <span>{{ message.msg }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="input">
      <input
        ref="sendMsgInput"
        v-model="newMessage"
        type="text"
        placeholder="Start chatting!"
        class="input-bar"
        @keyup="sendNewMessageEnterPressed"
      />
      <button class="send-msg-btn" @click="sendNewMessage">Send message</button>
      <div class="send-icon" @click="sendNewMessage">
        <fa icon="paper-plane" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Chatview',
  data() {
    return {
      newMessage: '',
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.login.currentUser
    },
    activeChat() {
      return this.$store.state.chat.activeChat
    },
    messages() {
      return this.$store.state.chat.messages[this.activeChat._id]
    },
  },
  mounted() {
    this.focusInput()
    this.scrollToBottom()
    this.$socket.on('newMessage', () => this.scrollToBottom())
  },
  methods: {
    sendNewMessage() {
      if (this.newMessage.trim() === '') return
      if (this.$socket.connected) {
        this.$socket.emit('newMessage', {
          msg: this.newMessage,
          to: this.activeChat._id,
          interlocutor: this.currentUser._id,
          date: new Date().toString(),
        })
        this.$store.commit('chat/NEW_MESSAGE', {
          msg: this.newMessage,
          interlocutor: this.activeChat._id,
          date: new Date().toString(),
          fromMe: true,
        })
      }
      this.newMessage = ''
    },
    sendNewMessageEnterPressed(e) {
      if (e.keyCode === 13) {
        this.sendNewMessage()
      }
    },
    computeDate(_date) {
      const date = moment(_date, 'ddd MMM DD YYYY hh:mm:ss zzZZ')
      return moment(moment()).isSame(date, 'day')
        ? moment(date).format('H:mm A')
        : moment().diff(date, 'days') < 2
        ? 'Yesterday ' + moment(date).format('H:mm A')
        : moment(date).format('MMM D, YYYY')
    },
    focusInput() {
      this.$refs.sendMsgInput.focus()
    },
    scrollToBottom() {
      this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
.chat {
  width: 100%;
  @media screen and (min-width: 1024px) {
    width: 78%;
  }
  @media screen and (min-width: 1280px) {
    width: calc(100% - 250px);
  }
  @media screen and (min-width: 1500px) {
    width: calc(100% - 300px);
  }
  @media screen and (min-width: 1800px) {
    width: calc(100% - 350px);
  }
  transition: width 0.2s ease-out;
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', sans-serif;
  .interlocutor-info {
    height: 15%;
    @media screen and (min-width: 768px) {
      border-radius: 5px 5px 0 0;
    }
    @media screen and (min-width: 1024px) {
      height: 26%;
      border-radius: 5px 0 0 0;
    }
    background-color: #becbd9 !important;
    display: flex;
    border-radius: 0;
    .chat-profile-pic {
      height: 100%;
      aspect-ratio: 1/1;
      border-radius: 5px 0 0 0;
    }
    .basic-info {
      display: flex;
      flex-direction: column;
      margin: 1rem 1.2rem;
      overflow: hidden;
      .interlocutor-username {
        font-size: 1.5rem;
        font-weight: 600;
      }
      .interlocutor-description {
        font-size: 0.9rem;
      }
    }
  }
  .chat-box {
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 0.8rem;
    height: 100%;
    .message-wrapper {
      display: flex;
      padding: 0.5rem 0;
      .message-box {
        width: 72%;
        // @media screen and (min-width: 1500px) {
        //   width: 52%;
        // }
        border-radius: 7px;
        -webkit-box-shadow: 5px 5px 15px -6px rgba(0, 0, 0, 0.4);
        box-shadow: 5px 5px 15px -6px rgba(0, 0, 0, 0.4);
        .top {
          width: 100%;
          border-radius: 7px 7px 0 0;
          padding: 0.4rem 0.7rem;
          display: flex;
          justify-content: space-between;
          user-select: none;
          span {
            font-weight: 600;
            font-size: 0.9rem;
            @media screen and (min-width: 768px) {
              font-size: 0.8rem;
            }
          }
          .date {
            color: rgba($color: #666666, $alpha: 0.5);
          }
        }
        .bottom {
          width: 100%;
          background-color: white;
          border-radius: 0 0 7px 7px;
          word-wrap: break-word;
          .arrow {
            width: 12px;
            height: 20px;
            overflow: hidden;
            position: relative;
            .inner {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
              position: absolute;
            }
          }
          span {
            font-weight: 600;
            font-size: 0.9rem;
            @media screen and (min-width: 768px) {
              font-size: 0.8rem;
            }
          }
        }
        .sent {
          background-color: #f0cbb3;
        }
        .received {
          background-color: #becbd9;
        }
      }
    }
    .right {
      justify-content: flex-end;
      padding-right: 1.3rem;
      .top {
        .username {
          color: #703a18;
        }
      }
      .bottom {
        padding: 0.6rem 0.7rem;
        .arrow {
          float: right;
          right: -22px;
          .inner {
            right: 2px;
            border-left: 12px solid #ffffff;
          }
        }
        span {
          display: block;
          padding-right: 0.9rem;
        }
      }
    }
    .left {
      justify-content: flex-start;
      padding-left: 10px;
      .top {
        .username {
          color: #203245;
        }
      }
      .bottom {
        padding: 0.6rem 0.7rem 0.6rem 0;
        .arrow {
          float: left;
          right: 11px;
          .inner {
            border-right: 12px solid #ffffff;
            left: 2px;
          }
        }
        span {
          display: block;
          padding-left: 0.9rem;
        }
      }
    }
  }
  .input {
    margin-right: 0.8rem;
    display: flex;
    align-items: center;
    margin: 0 0.8rem 1.3rem 0.8rem;
    .input-bar {
      background-color: white;
      border-radius: 5px;
      width: 85%;
      @media screen and (min-width: 768px) {
        width: 72%;
      }
      font-size: 0.9rem;
      border: 2px solid #dadada;
      padding: 0.5rem 1rem;

      &:focus {
        outline: none;
        border-color: #9ecaed;
        box-shadow: 0 0 10px #9ecaed;
      }
    }
    .send-icon {
      color: #428bca;
      width: 15%;
      font-size: 1.7rem;
      display: grid;
      place-items: center;
      @media screen and (min-width: 768px) {
        display: none;
      }
    }
    .send-msg-btn {
      display: none;
      @media screen and (min-width: 768px) {
        display: block;
      }
      margin-left: 1.3rem;
      width: 22.5%;
      background-color: #428bca;
      color: white;
      padding: 0.7rem 0;
      border-radius: 5px;
      font-size: 0.8rem;
      &:active {
        background-color: #326796;
      }
    }
  }
}
::-webkit-scrollbar {
  width: 0.6rem;
}

::-webkit-scrollbar-track {
  //   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #becbd9;
  border-radius: 99px;
}

::-webkit-scrollbar-thumb {
  background-color: #9daab9;
  border-radius: 99px;
}
</style>
