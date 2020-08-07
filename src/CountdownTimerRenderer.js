export class CountdownTimerRenderer {

  render(timeLeftMs) {
    if (this.isEnded(timeLeftMs)) {
      return "ENDED"
    }
    return this.formatTimeInMs(timeLeftMs)
  }

  isEnded(timeLeftMs) {
    return timeLeftMs < 0;
  }

  formatTimeInMs(timeLeftMs) {
    const totalTimeLeftInSeconds = timeLeftMs / 1000;
    const totalTimeLeftInMinutes = totalTimeLeftInSeconds / 60;
    const timeLeftHours = Math.floor(totalTimeLeftInMinutes / 60);
    const timeLeftMinutes = Math.floor(totalTimeLeftInMinutes - (timeLeftHours * 60));
    if (totalTimeLeftInMinutes >= 30) {
      return timeLeftHours + "h " + timeLeftMinutes + "m";
    }
    const timeLeftSeconds = Math.floor(totalTimeLeftInSeconds - (timeLeftMinutes * 60));
    return timeLeftMinutes + "m " + timeLeftSeconds + "s";
  }

}
