import addMinutes from "date-fns/addMinutes"
import addSeconds from "date-fns/addSeconds"
import parseTimeComponents from "./parseTimeComponents"

export class CountdownTimerRenderer {
  countdownPrefix = "Stream ends in "
  countdownEndMessage = "ENDED"

  parseCountdownAsMinutesSeconds(text) {
    const finalSpaceIndex = text.lastIndexOf(' ')
    const countdownTime = text.substring(finalSpaceIndex + 1)
    return parseTimeComponents(countdownTime)
  }

  parseCountdownTitleFrom(text) {
    if (text.includes(" | ")) {
      const split = text.split(' | ')
      text = split[0]
      this.countdownEndMessage = split[1]
    }
    const spaceAfterCountdown = text.indexOf(' ')
    const finalSpaceIndex = text.lastIndexOf(' ')
    return text.substring(spaceAfterCountdown + 1, finalSpaceIndex)
  }

  parseCardTitleForCountdown(newCardTitle) {
    const {countdownPrefix, minutes, seconds} = this.parseCardTitle(newCardTitle);
    this.countdownPrefix = countdownPrefix
    return addMinutes(addSeconds(Date.now(), seconds), minutes)
  }

  parseCardTitle(newCardTitle) {
    const prefix = this.parseCountdownTitleFrom(newCardTitle)
    this.countdownPrefix = prefix
    const {left: minutes, right: seconds} = this.parseCountdownAsMinutesSeconds(newCardTitle)
    return {prefix, minutes, seconds}
  }

  renderCountdownPrefix() {
    return this.countdownPrefix
  }

  renderTimeLeftFor(timeLeftMs) {
    return this.formatTimeInMs(timeLeftMs)
  }

  renderCountdownEndMessage() {
    return this.countdownEndMessage
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
