import {StreamEndTimerRenderer} from "@/StreamEndTimerRenderer";

describe('Stream end timer such and such', () => {
  it('should return "less than 1 minute left" when time left is 0 seconds', async () => {
    const streamEndTimerRenderer = new StreamEndTimerRenderer()

    expect(streamEndTimerRenderer.render(0)).toStrictEqual("less than 1 minute")
  });

  it('should return "10m 10s" when time left is 10:10', async () => {
    const streamEndTimerRenderer = new StreamEndTimerRenderer()

    expect(streamEndTimerRenderer.render((10 * 60 + 10) * 1000)).toStrictEqual("10m 10s")
  });
});