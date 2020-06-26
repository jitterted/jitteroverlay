import Overlay from '@/Overlay.vue'
import Settings from '@/Settings.vue'

export const routes = [
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
