import { mount, createLocalVue } from "@vue/test-utils"
import App from "@/App.vue"
import VueRouter from "vue-router"
import Overlay from "@/Overlay.vue"
import Settings from "@/Settings.vue"
import { routes } from "@/routes.js"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe("App", () => {
  it("renders a child component via routing", async () => {
    const router = new VueRouter({ routes })

    const wrapper = mount(App, {
      localVue,
      router
    })

    expect(wrapper.findComponent(Overlay).exists()).toBeTruthy()

    await router.push("/settings")
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(Settings).exists()).toBeTruthy()
  })
})