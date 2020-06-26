import {shallowMount} from '@vue/test-utils'
import Overlay from '@/Overlay.vue'
import startOfToday from 'date-fns/startOfToday'
import addHours from 'date-fns/addHours'

// Mount the component
const wrapper = shallowMount(Overlay)

describe('Stream end time', () => {
  // it('creates correct hour and minute text for 1 hour and 1 minute left', async () => {
  //   wrapper.vm.$data.timeLeftMs = 1000 * (60 + 60 * 60);
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.vm.timeLeft).toBe('1h 1m')
  // })

  it('Defaults to today at 4pm when starts up', async () => {
    const startOfTodayDate = startOfToday()
    const todayAt4pmDate = addHours(startOfTodayDate, 16)
    expect(wrapper.vm.$data.streamEndDateTime).toStrictEqual(todayAt4pmDate)
  })

})