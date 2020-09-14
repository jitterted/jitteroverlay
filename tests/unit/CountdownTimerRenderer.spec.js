import {CountdownTimerRenderer} from "@/CountdownTimerRenderer";

describe('countdown timer time left string', () => {

  let renderer;
  beforeEach(() => {
    renderer = new CountdownTimerRenderer()
  })

  it('should parse minutes and seconds from card title text with no alternate end message', async () => {
    const {minutes, seconds} = renderer.parseCardTitle("Countdown Time Says 3:00")

    expect(minutes).toStrictEqual(3)
    expect(seconds).toStrictEqual(0)
  });

  it('should show end message when time left is less than 0 and message defined', async () => {
    renderer.parseCardTitle("countdown timer ends in 3:00 | countdown end message")
    const endMessage = renderer.renderCountdownEndMessage()

    expect(endMessage).toStrictEqual("countdown end message")
  })

  it('should parse countdown title from the full card title', async () => {
    renderer.parseCardTitle("Countdown Dark Mode for 10:00")
    const endMessage = renderer.renderCountdownPrefix()

    expect(endMessage).toStrictEqual("Dark Mode for")
  })

  it('countdown prefix should not include end message', async () => {
    renderer.parseCardTitleForCountdown("Countdown Stream Starts in 2:30 | Stream Starts in a few moments")
    const endMessage = renderer.renderCountdownPrefix()

    expect(endMessage).toStrictEqual("Stream Starts in")
  })

  it('should return "0m 0s" when time left is equal to 0', async () => {
    expect(renderer.renderTimeLeftFor(0)).toStrictEqual("0m 0s")
  })

  it('should return "1m 33s" when time left is equal to 93000ms', async () => {
    expect(renderer.renderTimeLeftFor(93000)).toStrictEqual("1m 33s")
  });

  it('should return "10m 10s" when time left is 10:10', async () => {
    expect(renderer.renderTimeLeftFor((10 * 60 + 10) * 1000)).toStrictEqual("10m 10s")
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
    const {minutes, seconds} = renderer.parseCountdownAsMinutesSeconds("Countdown Dark Mode for 15:30")

    expect(minutes).toStrictEqual(15)
    expect(seconds).toStrictEqual(30)
  })

  it('should return original string if no alternate end message', async () => {
    const text = renderer.Cowabunga("Countdown Something 5:25")

    expect(text).toStrictEqual("Countdown Something 5:25")
  });

  it('should return countdown string if alternate end message defined and set the end message', async () => {
    const text = renderer.Cowabunga("Countdown Something 5:25 | Alternate message")

    expect(text).toStrictEqual("Countdown Something 5:25")
    expect(renderer.renderCountdownEndMessage()).toStrictEqual("Alternate message")
  });

  it('should return just the countdown message', async () => {
    const text = renderer.extractCountdownMessage("Countdown Just the message 5:25")

    expect(text).toStrictEqual("Just the message")
  });

});