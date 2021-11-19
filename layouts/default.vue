<template>
  <v-app class="btuh">
    <Header />
    <v-main app class="main background">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Default',
}
</script>

<style lang="scss">
html {
  overflow-y: hidden;
}
.main {
  display: grid;
  place-items: center;
  height: 100%;
  @media screen and (max-width: 768px) {
    padding: calc(100vh * 0.07) 0 0 !important;
  }
}
</style>
