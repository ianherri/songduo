import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/config/router'
import EditStanza from './components/EditStanza.vue'

const app = createApp(App)
app.component('EditStanza', EditStanza)
app.use(router).mount('#app')
