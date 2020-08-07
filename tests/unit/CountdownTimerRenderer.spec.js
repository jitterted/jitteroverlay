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

});