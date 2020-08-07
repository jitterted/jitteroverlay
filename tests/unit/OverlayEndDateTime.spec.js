import {shallowMount} from '@vue/test-utils'
import startOfToday from 'date-fns/startOfToday'
import addHours from 'date-fns/addHours'
import CountdownTimer from "@/CountdownTimer";

const wrapper = shallowMount(CountdownTimer)

describe('Stream end time', () => {

  it('Parses stream end time from Card Title', async () => {
    await wrapper.setProps({cardTitle: "16:00"})

    const todayAt4pmDate = addHours(startOfToday(), 16)
    expect(wrapper.vm.$data.streamEndDateTime).toStrictEqual(todayAt4pmDate)
  })

})