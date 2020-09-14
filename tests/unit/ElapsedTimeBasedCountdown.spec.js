import {shallowMount} from '@vue/test-utils'
import CountdownTimer from "@/CountdownTimer";

const wrapper = shallowMount(CountdownTimer)

describe('Elapsed Timer-Based Time Left Display', () => {

  it('should show "0m 59s" message if only 59 seconds remains', async () => {
    wrapper.vm.$data.timeLeftMs = 59 * 1000; // 59,000ms = 59sec
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toStrictEqual("0m 59s")
  })

  it('should show "0m 0s" when the time left is 0', async () => {
    wrapper.vm.$data.timeLeftMs = 0

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.timeLeft).toStrictEqual("0m 0s")
  });

  it('should show "Stream will end shortly" message when the time left is less than 0 and no specific end message was specified', async () => {
    wrapper.vm.$data.timeLeftMs = -1

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toStrictEqual("Stream will end shortly")
  });

  it('should display countdown text when time is still available', async () => {
    await wrapper.setProps({cardTitle: "Countdown Stream Starts in 2:30 | Stream Starts in a few moments"})

    // TODO figure out how to put in a test double to make this deterministic
    expect(wrapper.text()).toEqual(expect.stringContaining("Stream Starts in 2m ")) // might be 30s or 29s so ignoring that part
  })

  it('should show defined end message when time left is less than 0', async () => {
    await wrapper.setProps({cardTitle: "Countdown Test for 3:00 | Test Has Ended"})
    wrapper.vm.$data.timeLeftMs = -1
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toStrictEqual("Test Has Ended")
  })

  it('should show default "ENDED" message when time left is less than 0', async () => {
    await wrapper.setProps({cardTitle: "Countdown Coffee Break 3:00"})
    wrapper.vm.$data.timeLeftMs = -1
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toStrictEqual("Coffee Break ENDED")
  })

  it('should show "Stream ends in" message when switching back to Stream timer mode', async () => {
    await wrapper.setProps({cardTitle: "Countdown Test for 3:00 | Test Has Ended"})
    await wrapper.setProps({cardTitle: "16:30"})
    wrapper.vm.$data.timeLeftMs = 60000
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toStrictEqual("Stream ends in 1m 0s")
  })

  it('should have expired timer when time left is less than 0', async () => {
    wrapper.vm.$data.timeLeftMs = -1

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isTimerExpired).toBeTruthy()
  })
})

describe('Elapsed timer should', () => {
  it('show countdown message when timer not yet expired', async () => {
    await wrapper.setProps({cardTitle: "Countdown Test for 3:00 | Test Has Ended"})
    wrapper.vm.$data.timeLeftMs = 180000
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toStrictEqual("Test for 3m 0s")
  })
})