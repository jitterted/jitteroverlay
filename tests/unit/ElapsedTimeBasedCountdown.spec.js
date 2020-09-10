import {shallowMount} from '@vue/test-utils'
import CountdownTimer from "@/CountdownTimer";

const wrapper = shallowMount(CountdownTimer)

describe('Countdown/Elapsed Timer-Based Time Left Display', () => {

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

  it('should show "ENDED" message when the time left is less than 0 and no specific end message was specified', async () => {
    wrapper.vm.$data.streamEndTimerMode = false
    wrapper.vm.$data.timeLeftMs = -1

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toStrictEqual("ENDED")
  });

  it('should show defined end message when time left is less than 0', async () => {
    await wrapper.setProps({cardTitle: "Countdown Test for 3:00 | Test Has Ended"})
    expect(wrapper.vm.$data.streamEndTimerMode).toBeFalsy()

    wrapper.vm.$data.timeLeftMs = -1
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toStrictEqual("Test Has Ended")
  })

  it('should have expired timer when time left is less than 0', async () => {
    wrapper.vm.$data.streamEndTimerMode = false
    wrapper.vm.$data.timeLeftMs = -1

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isTimerExpired).toBeTruthy()
  })
})