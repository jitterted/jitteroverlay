import {shallowMount} from '@vue/test-utils'
import Overlay from '@/Overlay.vue'
// import startOfToday from 'date-fns/startOfToday'
import addMinutes from 'date-fns/addMinutes'

const wrapper = shallowMount(Overlay)

describe('Countdown Timer-Based Time Left Display', () => {
  it('should show 10m 00s when first updated', async () => {
    // This is not the best way to test clock-related functionality
    // would need a way to inject the baseline "Date.now" for reals
    const tenMinutesFromNow = addMinutes(Date.now(), 10)

    wrapper.vm.updateCountdownBasedOnNewCardTitle("Countdown 10:00")
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.streamEndDateTime).toStrictEqual(tenMinutesFromNow)
  })

  it('should parse countdown time components into two parts', async () => {
    const {left, right} = wrapper.vm.parseCountdownAsMinutesSeconds("Countdown Dark Mode for 15:30")
    expect(left).toStrictEqual("15")
    expect(right).toStrictEqual("30")
  })

  it('should parse countdown title from the full card title', async () => {
    const title = wrapper.vm.parseCountdownTitleFrom("Countdown Dark Mode for 10:00")
    expect(title).toStrictEqual("Dark Mode for")
  })
})