import {shallowMount} from '@vue/test-utils'
import CountdownTimer from "@/CountdownTimer";

// Mount the component
const wrapper = shallowMount(CountdownTimer)

function setTimeLeftMsTo(hours, minutes, seconds) {
  wrapper.vm.$data.timeLeftMs = 1000 * ((hours * 60 * 60) + (minutes * 60) + (seconds));
}

describe('Countdown Timer', () => {

  it('shows "less than 1 minute" message if less than 1 minute remains', async () => {
    setTimeLeftMsTo(0, 0, 59)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toStrictEqual("less than 1 minute")
  })

  it('creates correct hour and minute text for 1 hour and 1 minute left', async () => {
    wrapper.vm.$data.streamEndTimerMode = true
    setTimeLeftMsTo(1, 1, 0)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toStrictEqual('1h 1m')
  })

  it('creates correct hour and minute text for 1 hour, 0 minutes, and 0 seconds left', async () => {
    setTimeLeftMsTo(1, 0, 0)
    expect(wrapper.vm.timeLeft).toBe('1h 0m')
    await wrapper.vm.$nextTick() // updates DOM from data changes
    expect(wrapper.vm.timeLeft).toStrictEqual('1h 0m')
  })

  it('creates correct hour and minute text for 1h0m0s minus 1ms left', async () => {
    const hours = 1
    const minutes = 0
    const seconds = 0
    wrapper.vm.$data.timeLeftMs = 1000 * ((hours * 60 * 60) + (minutes * 60) + (seconds)) - 1;
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toStrictEqual('0h 59m')
  })

  // ZOM/BIES
  // James Grenning
  // Z O M -> Zero, One, Many/More
  // B I E -> Boundaries, Interfaces, Exceptions
  // S -> Simple and Separation [of concerns]

  it('creates correct hour and minute text for 1 hour, 59 minutes, and 59 seconds left', async () => {
    setTimeLeftMsTo(1, 59, 59);
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toBe('1h 59m')
  })

  it('is not yet warning time when more than warning-time minutes remaining', async () => {
    wrapper.vm.$data.timeLeftMs = 11 * 60 * 1000; // 11 minutes remaining
    wrapper.vm.$data.warningTimeMs = 10 * 60 * 1000; // 10 minute boundary
    expect(wrapper.vm.isWarningTime).toBeFalsy()
  })

  it('is warning time when less than warning-time minutes remaining', async () => {
    wrapper.vm.$data.timeLeftMs = 10 * 60 * 1000 - 1000; // 9m59s remaining
    wrapper.vm.$data.warningTimeMs = 10 * 60 * 1000; // 10 minute boundary
    expect(wrapper.vm.isWarningTime).toBeTruthy()
  })

})