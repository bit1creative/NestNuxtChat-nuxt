import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

export default function ({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: SocketIO('http://localhost:5000', { autoConnect: false }),
      autoconnection: false,
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_',
      },
    })
  )
}
