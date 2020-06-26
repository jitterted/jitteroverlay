import {shallowMount} from '@vue/test-utils'
import Overlay from '@/Overlay.vue'

// Mount the component
const wrapper = shallowMount(Overlay)

describe('JitterOverlay', () => {
  // Inspect the raw component options
  it('has a "created" hook', () => {
    expect(typeof Overlay.created).toBe('function')
  })

  it('initialize time left to 0', () => {
    expect(typeof Overlay.data).toBe('function')
    const defaultData = Overlay.data()
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

  it('is not yet note time when more than note-time minutes remaining', async () => {
    wrapper.vm.$data.timeLeftMs = 11 * 60 * 1000; // 11 minutes remaining
    wrapper.vm.$data.noteTimeMs = 10 * 60 * 1000; // 10 minute boundary
    expect(wrapper.vm.isNoteTime).toBeFalsy()
  })

  it('is note time when less than note-time minutes remaining', async () => {
    wrapper.vm.$data.timeLeftMs = 10 * 60 * 1000 - 1000; // 9m59s remaining
    wrapper.vm.$data.noteTimeMs = 10 * 60 * 1000; // 10 minute boundary
    expect(wrapper.vm.isNoteTime).toBeTruthy()
  })

})