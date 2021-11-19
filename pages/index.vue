<template>
  <div>
    <v-select
      :items="onlyNamesLoggedUsers"
      label="Choose your account"
      dense
      color="#428bca"
      @change="proceedInput"
    ></v-select>
    <v-btn @click="generateNewUser">Generate new user</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Index',
  head: {
    title: 'Chat bots 2.0',
  },
  computed: {
    loggedUsers() {
      return this.$store.state.login.loggedUsers
    },
    onlyNamesLoggedUsers() {
      return this.loggedUsers?.map((user) => user.username)
    },
  },
  beforeCreate() {
    this.$store.commit('login/GET_LOGGED_USERS_FROM_LOCALE_STORAGE')
  },
  created() {
    // Юзаю process.browser, чтобы работать с локалсторедж
    if (process.browser && this.$store.state.login.loggedUsers.length === 0) {
      this.generateNewUser()
    }
  },
  methods: {
    // Рандомайзер
    async generateNewUser() {
      this.$socket.connect()
      await this.$socket.on('connect', () => {
        this.$socket.emit('generateNewUser', this.$socket.id)
      })
      this.$router.push({ path: '/chat' })
    },
    proceedInput(e) {
      const user = this.loggedUsers.filter((user) => user.username === e)[0]
      this.$store.dispatch('login/setCurrentUser', user)
      this.$socket.connect()
      this.$socket.on('connect', () => {
        this.$socket.emit('newLogin', {
          ...user,
          isOnline: true,
          socketId: this.$socket.id,
        })
        this.$router.push({ path: '/chat' })
      })
    },
  },
}
</script>

<style lang="scss">
.v-application .primary--text {
  color: black !important;
  caret-color: white !important;
}
</style>
