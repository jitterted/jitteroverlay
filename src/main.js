import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import Overlay from '@/Overlay.vue'
import Settings from '@/Settings.vue'
import '@/assets/tailwind.css'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "overlay",
    component: Overlay
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
