import {shallowMount} from '@vue/test-utils'
import Overlay from '@/Overlay.vue'
import startOfToday from 'date-fns/startOfToday'
import addHours from 'date-fns/addHours'

const wrapper = shallowMount(Overlay)

describe('Stream end time', () => {

  it('Parses stream end time from Card Title', async () => {
    wrapper.vm.updateCountdownBasedOnNewCardTitle("16:00")
    const todayAt4pmDate = addHours(startOfToday(), 16)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.streamEndDateTime).toStrictEqual(todayAt4pmDate)
  })

})