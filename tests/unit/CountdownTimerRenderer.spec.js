import {CountdownTimerRenderer} from "@/CountdownTimerRenderer";

describe('countdown timer time left string', () => {
  it('should return "ENDED" when time left is less than 0', async () => {
    const renderer = new CountdownTimerRenderer()

    const timeLeft = renderer.render(-1)

    expect(timeLeft).toStrictEqual("ENDED")
  });

  it('should return "0m 0s" when time left is equal to 0', async () => {
    const renderer = new CountdownTimerRenderer()

    expect(renderer.render(0)).toStrictEqual("0m 0s")
  })

  it('should return "1m 33s" when time left is equal to 93000ms', async () => {
    const renderer = new CountdownTimerRenderer()

    expect(renderer.render(93000)).toStrictEqual("1m 33s")
  });

  it('switches to minutes and seconds when 30 or fewer minutes remain', async () => {
    const renderer = new CountdownTimerRenderer()
    const twentyNineMinutes59Seconds = (29 * 60 + 59) * 1000
    expect(renderer.formatTimeInMs(twentyNineMinutes59Seconds)).toStrictEqual("29m 59s")
  })

  it('uses hours and minutes when exactly 30 minutes remain', async () => {
    const renderer = new CountdownTimerRenderer()

    const thirtyMinutes = (30 * 60) * 1000;
    expect(renderer.formatTimeInMs(thirtyMinutes)).toStrictEqual("0h 30m")
  })

  it('uses hours and minutes when more than 30 minutes remain', async () => {
    const renderer = new CountdownTimerRenderer()

    const thirtyMinutes1Second = (30 * 60 + 1) * 1000;
    expect(renderer.formatTimeInMs(thirtyMinutes1Second)).toStrictEqual("0h 30m")
  })

});