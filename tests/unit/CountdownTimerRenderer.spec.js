import {CountdownTimerRenderer} from "@/CountdownTimerRenderer";

describe('countdown timer time left string', () => {

  let renderer;
  beforeEach(() => {
    renderer = new CountdownTimerRenderer()
  })

  it('should show end message when time left is less than 0 and message defined', async () => {
    renderer.parseCardTitle("countdown timer ends in 3:00 | countdown end message")
    const endMessage = renderer.renderCountdownEndMessage()

    expect(endMessage).toStrictEqual("countdown end message")
  })

  it('should return "0m 0s" when time left is equal to 0', async () => {
    expect(renderer.renderTimeLeftFor(0)).toStrictEqual("0m 0s")
  })

  it('should return "1m 33s" when time left is equal to 93000ms', async () => {
    expect(renderer.renderTimeLeftFor(93000)).toStrictEqual("1m 33s")
  });

  it('switches to minutes and seconds when 30 or fewer minutes remain', async () => {
    const twentyNineMinutes59Seconds = (29 * 60 + 59) * 1000

    expect(renderer.formatTimeInMs(twentyNineMinutes59Seconds)).toStrictEqual("29m 59s")
  })

  it('uses hours and minutes when exactly 30 minutes remain', async () => {
    const thirtyMinutes = (30 * 60) * 1000;
    expect(renderer.formatTimeInMs(thirtyMinutes)).toStrictEqual("0h 30m")
  })

  it('uses hours and minutes when more than 30 minutes remain', async () => {
    const thirtyMinutes1Second = (30 * 60 + 1) * 1000;
    expect(renderer.formatTimeInMs(thirtyMinutes1Second)).toStrictEqual("0h 30m")
  })

  it('should parse countdown time components into two parts', async () => {
    const {left, right} = renderer.parseCountdownAsMinutesSeconds("Countdown Dark Mode for 15:30")
    expect(left).toStrictEqual("15")
    expect(right).toStrictEqual("30")
  })

  it('should parse countdown title from the full card title', async () => {
    const title = renderer.parseCountdownTitleFrom("Countdown Dark Mode for 10:00")
    expect(title).toStrictEqual("Dark Mode for")
  })

  it('countdown prefix should not include end message', async () => {
    const title = renderer.parseCountdownTitleFrom("Countdown Stream Starts in 2:30 | Stream Starts in a few moments")
    expect(title).toStrictEqual("Stream Starts in")
  })

});