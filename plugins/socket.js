import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

export default function ({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: SocketIO('https://nuxt-nest-chat-backend.herokuapp.com/', {
        autoConnect: false,
      }),
      autoconnection: false,
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_',
      },
    })
  )
}
