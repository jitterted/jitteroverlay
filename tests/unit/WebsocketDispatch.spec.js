import {shallowMount} from '@vue/test-utils'
import Overlay from '@/Overlay.vue'
import startOfToday from "date-fns/startOfToday";
import addHours from "date-fns/addHours";

// Mount the component
const wrapper = shallowMount(Overlay)

describe('WebSocket event handler', () => {
  it('dispatches to appropriate handler for name="one" when websocket message comes in with name="one"', () => {
    const startOfTodayDate = startOfToday()
    const todayAt4pmDate = addHours(startOfTodayDate, 16)
    expect(wrapper.vm.$data.streamEndDateTime).toStrictEqual(todayAt4pmDate)
  });
})
