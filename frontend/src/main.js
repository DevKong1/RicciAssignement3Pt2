import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:3032'),
  vuex: false,
}))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')