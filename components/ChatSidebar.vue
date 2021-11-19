<template>
  <div id="sidebar" class="sidebar">
    <div class="filter-btns">
      <button
        class="online"
        :class="activeBtnOnline ? 'active' : ''"
        @click="
          () => (!activeBtnOnline ? (activeBtnOnline = !activeBtnOnline) : null)
        "
      >
        Online
      </button>
      <button
        class="all"
        :class="!activeBtnOnline ? 'active' : ''"
        @click="
          () => (activeBtnOnline ? (activeBtnOnline = !activeBtnOnline) : null)
        "
      >
        All
      </button>
    </div>
    <div class="users-list">
      <div
        v-for="user in filteredUsers.filter((user) =>
          activeBtnOnline ? user.isOnline : 1
        )"
        :key="user._id"
      >
        <button class="user-btn" :_id="user._id" @click="proceedChatSelection">
          <div class="profile-pic">
            <img :src="user.imgUrl" alt="profile-pic" />
            <span v-if="user.isOnline" class="online"></span>
          </div>
          <div class="user-info">
            <span class="name">{{ user.username }}</span>
            <!-- Ласт сообщение или дескрипшн юзера если сообщений нету -->
            <span class="descr">{{
              messages[user._id]
                ? (messages[user._id][messages[user._id].length - 1].fromMe
                    ? 'You: '
                    : `${user.username}: `) +
                  messages[user._id][messages[user._id].length - 1].msg
                : user.description
            }}</span>
          </div>
        </button>
      </div>
    </div>
    <div class="search-user-bar">
      <input v-model="searchTag" type="text" placeholder="Search..." />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatSidebar',
  data() {
    return {
      activeBtnOnline: true,
      searchTag: '',
    }
  },
  computed: {
    users() {
      return this.$store.state.chat.users.filter(
        (user) => user._id !== this.$store.state.login.currentUser._id
      )
    },
    filteredUsers() {
      return this.filter(this.users, this.searchTag)
    },
    messages() {
      return this.$store.state.chat.messages
    },
  },
  mounted() {
    if (document.getElementsByClassName('user-btn')[0])
      document.getElementsByClassName('user-btn')[0].className += ' active'
  },
  methods: {
    proceedChatSelection(e) {
      if (window.innerWidth < 1024) {
        document.getElementById('sidebar').style.width = ''
        document.getElementById('chat').style.width = '100%'
      }
      document
        .getElementsByClassName('user-btn')
        .forEach((el) => (el.className = 'user-btn'))
      e.currentTarget.className += ' active'
      this.$store.dispatch(
        'chat/setActiveChat',
        e.currentTarget.getAttribute('_id')
      )
    },
    filter(users, searchTag) {
      if (searchTag.trim() === '') return users
      return users.filter(
        (user) =>
          // мож так
          // user.username.toLowerCase().startsWith(searchTag.toLowerCase())

          // или так
          // user.username.toLowerCase().includes(searchTag.toLowerCase())

          // или более сложный
          user.username
            .toLowerCase()
            .split(' ')
            .filter((partname) => partname.startsWith(searchTag.toLowerCase()))
            .length > 0
      )
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  width: 0;
  transition: width 0.2s ease-out;
  overflow: hidden;
  @media screen and (min-width: 1024px) {
    width: 22%;
    border-radius: 0 5px 5px 0;
  }
  @media screen and (min-width: 1280px) {
    width: 250px;
  }
  @media screen and (min-width: 1500px) {
    width: 300px;
  }
  @media screen and (min-width: 1800px) {
    width: 350px;
  }
  background-color: white;
  display: flex;
  flex-direction: column;
  .filter-btns {
    display: flex;
    justify-content: space-around;
    button {
      color: #777777;
      padding: 0.8rem;
      background-color: #f8f8f8;
      width: 100%;
      border-bottom: 2px solid rgba(128, 128, 128, 0.356);
      font-size: 0.9rem;
      font-weight: 500;
    }
    .all {
      border-left: 2px solid rgba(128, 128, 128, 0.356);
      border-radius: 0 5px 0 0;
    }
    .online {
      border-right: 2px solid rgba(128, 128, 128, 0.356);
    }
    .active {
      color: #555555;
      background-color: white;
      border: 0;
    }
  }
  .users-list {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    .user-btn {
      width: 100%;
      height: 4rem;
      display: flex;
      padding: 0.1rem 0.8rem;
      .profile-pic {
        height: 100%;
        position: relative;
        img {
          height: 100%;
          aspect-ratio: 1/1;
          border-radius: 3px;
        }
        .online {
          position: absolute;
          background-color: #20d63e;
          height: 14px;
          width: 14px;
          border-radius: 9999px;
          left: 85%;
          top: 82%;
        }
      }
      .user-info {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        overflow: hidden;
        text-align: left;
        span {
          padding: 1% 8%;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .name {
          font-weight: 600;
        }
        .descr {
          color: #999999;
          font-size: 0.8rem;
        }
      }
    }
    .active {
      background-color: #f8f8f8;
    }
  }
  .search-user-bar {
    input {
      background-color: white;
      border-radius: 5px;
      width: 90%;
      font-size: 0.9rem;
      color: #999999;
      border: 2px solid #dadada;
      padding: 0.5rem 1rem;
      margin: 1.3rem 5%;
      &:focus {
        outline: none;
        border-color: #9ecaed;
        box-shadow: 0 0 10px #9ecaed;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0rem;
  }
}
</style>
