import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO  from 'vue-3-socket.io'

const app = createApp(App)
app.use(router)
app.use(new VueSocketIO({
    //TODO false when deploying
    debug: true,
    connection: 'http://metinseylan.com:1992'
}))
app.mount('#app')