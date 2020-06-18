import {shallowMount} from '@vue/test-utils'
import App from '@/App.vue'

// Mount the component
const wrapper = shallowMount(App)

describe('JitterOverlay', () => {
  // Inspect the raw component options
  it('has a "created" hook', () => {
    expect(typeof App.created).toBe('function')
  })

  it('initialize time left to 0', () => {
    expect(typeof App.data).toBe('function')
    const defaultData = App.data()
    expect(defaultData.timeLeftMs).toBe(0)
  })

  it('creates correct hour and minute text for 1 hour and 1 minute left', async () => {
    wrapper.vm.$data.timeLeftMs = 1000 * (60 + 60 * 60);
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toBe('1h 1m')
  })

  it('creates correct hour and minute text for 1 hour, 0 minutes, and 0 seconds left', async () => {
    const hours = 1
    const minutes = 0
    const seconds = 0
    wrapper.vm.$data.timeLeftMs = 1000 * ((hours * 60 * 60) + (minutes * 60) + (seconds));
    expect(wrapper.vm.timeLeft).toBe('1h 0m')
    await wrapper.vm.$nextTick() // updates DOM from data changes
    expect(wrapper.text()).toContain('Stream ends in 1h 0m')
  })

  it('creates correct hour and minute text for 1h0m0s minus 1ms left', async () => {
    const hours = 1
    const minutes = 0
    const seconds = 0
    wrapper.vm.$data.timeLeftMs = 1000 * ((hours * 60 * 60) + (minutes * 60) + (seconds)) - 1;
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toBe('0h 59m')
  })

  // ZOM/BIES
  // James Grenning
  // Z O M -> Zero, One, Many/More
  // B I E -> Boundaries, Interfaces, Exceptions
  // S -> Simple and Separation [of concerns]

  it('creates correct hour and minute text for 1 hour, 59 minutes, and 59 seconds left', async () => {
    const hours = 1
    const minutes = 59
    const seconds = 59
    wrapper.vm.$data.timeLeftMs = 1000 * ((hours * 60 * 60) + (minutes * 60) + (seconds));
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.timeLeft).toBe('1h 59m')
  })

})