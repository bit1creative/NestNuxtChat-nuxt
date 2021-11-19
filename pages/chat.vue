<template>
  <div class="chat-wrapper">
    <Chatview />
    <ChatSidebar />
  </div>
</template>

<script>
export default {
  name: 'Chat',
  middleware: ['checkForLoggedUser'],
  head: {
    title: 'Chat bots 2.0',
  },
  computed: {
    currentUser() {
      return this.$store.state.login.currentUser
    },
  },
  mounted() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },
}
</script>

<style lang="scss">
.chat-wrapper {
  background-color: #d7dfe7;
  display: flex;
  flex-direction: row;
  height: calc(100vh * 0.94);
  width: 100vw;
  @media screen and (min-width: 768px) {
    height: calc(100vh * 0.82);
    width: calc(100vw * 0.87);
  }
  border-radius: 5px;
  margin-bottom: 1.5rem;
}
</style>
