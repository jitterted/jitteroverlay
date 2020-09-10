import {shallowMount} from '@vue/test-utils'
import CountdownTimer from "@/CountdownTimer";

const wrapper = shallowMount(CountdownTimer)

describe('When receiving new cardTitle', function () {
  it('that is a countdown card, it should turn off streamEndTimerMode', async () => {
    wrapper.vm.$data.streamEndTimerMode = true

    await wrapper.setProps({
      cardTitle: "Countdown 10:00"
    })

    expect(wrapper.vm.$data.streamEndTimerMode).toBeFalsy()
  })

  it('that is a regular stream schedule card, it should turn on streamEndTimerMode', async () => {
    wrapper.vm.$data.streamEndTimerMode = false

    await wrapper.setProps({
      cardTitle: "17:00"
    })

    expect(wrapper.vm.$data.streamEndTimerMode).toBeTruthy()
  })


});