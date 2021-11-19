<template>
  <v-app-bar flat app class="white app-bar">
    <v-app-bar-nav-icon
      v-if="$nuxt.$route.name !== 'index'"
      class="nav-icon"
      @click="openSidebar"
    />
    <!-- Не юзаю накст линк, чтобы триггерить сокет дисконнект -->
    <a href="/" class="link-main-page"><strong>Chat bots 2.0</strong></a>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    openSidebar() {
      if (document.getElementById('sidebar').style.width === '') {
        document.getElementById('sidebar').style.width = '100%'
        document.getElementById('chat').style.width = '0%'
        return
      }
      document.getElementById('sidebar').style.width = ''
      document.getElementById('chat').style.width = '100%'
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
.app-bar {
  @media screen and (max-width: 768px) {
    height: calc(100vh * 0.07) !important;
  }
  .v-toolbar__content {
    justify-content: space-between;
    .nav-icon {
      order: 2;
      margin-right: 5.5%;
      @media screen and (min-width: 1024px) {
        display: none;
      }
    }
    .link-main-page {
      width: max-content;
      text-decoration: none;
      color: black !important;
      margin-left: 5.5%;
      margin-top: 1%;
      strong {
        font-size: 1.8rem;
        font-weight: 600;
        font-family: 'Open Sans', sans-serif;
        user-select: none;
      }
    }
  }
}
</style>
