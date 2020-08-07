import {shallowMount} from '@vue/test-utils'
import CountdownTimer from "@/CountdownTimer";
import addMinutes from 'date-fns/addMinutes'

const wrapper = shallowMount(CountdownTimer)

describe('Countdown/Elapsed Timer-Based Time Left Display', () => {
  it.skip('should show 10m 00s when first updated', async () => {
    // TODO: This is not the best way to test clock-related functionality
    //       would need a way to inject the baseline "Date.now" for reals
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

  it('should show "0m 59s" message if only 59 seconds remains', async () => {
    wrapper.vm.$data.streamEndTimerMode = false
    wrapper.vm.$data.timeLeftMs = 59 * 1000; // 59,000ms = 59sec
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toStrictEqual("0m 59s")
  })

  it('should show "0m 0s" when the time left is 0', async () => {
    wrapper.vm.$data.streamEndTimerMode = false
    wrapper.vm.$data.timeLeftMs = 0
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toStrictEqual("0m 0s")
  });

  it('should show "ENDED" when the time left is less than 0', async () => {
    wrapper.vm.$data.streamEndTimerMode = false
    wrapper.vm.$data.timeLeftMs = -1
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toStrictEqual("ENDED")
  });
})