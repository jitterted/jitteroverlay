import addMinutes from "date-fns/addMinutes"
import addSeconds from "date-fns/addSeconds"
import parseTimeComponents from "./parseTimeComponents"

export class CountdownTimerRenderer {
  countdownPrefix = "Stream ends in "
  countdownEndMessage = "Stream will end shortly"

  parseCountdownAsMinutesSeconds(text) {
    const spaceBeforeTimeComponents = text.lastIndexOf(' ')
    const countdownTime = text.substring(spaceBeforeTimeComponents + 1)

    const {left: minutes, right: seconds} = parseTimeComponents(countdownTime)

    return {minutes, seconds}
  }

  parseCardTitleForCountdown(newCardTitle) {
    const {minutes, seconds} = this.parseCardTitle(newCardTitle);
    // return new end date/time
    return addMinutes(addSeconds(Date.now(), seconds), minutes)
  }

  parseCardTitle(newCardTitle) {
    const textWithoutAlternateEndMessage = this.Cowabunga(newCardTitle);

    this.countdownPrefix = this.extractCountdownMessage(textWithoutAlternateEndMessage)

    return this.parseCountdownAsMinutesSeconds(textWithoutAlternateEndMessage)
  }

  extractCountdownMessage(text) {
    // comes in as "Countdown countdown message here 15:45"
    const spaceAfterTheWordCountdown = text.indexOf(' ') // drop the "Countdown" word
    const finalSpaceIndex = text.lastIndexOf(' ') // space before the time components
    return text.substring(spaceAfterTheWordCountdown + 1, finalSpaceIndex);
  }

  Cowabunga(text) {
    if (text.includes(" | ")) {
      const split = text.split(' | ')
      text = split[0]
      this.countdownEndMessage = split[1]
    } else {
      this.countdownEndMessage = undefined
    }
    return text;
  }

  renderCountdownPrefix() {
    return this.countdownPrefix
  }

  renderTimeLeftFor(timeLeftMs) {
    return this.formatTimeInMs(timeLeftMs)
  }

  renderCountdownEndMessage() {
    if (this.countdownEndMessage === undefined) {
      return this.countdownPrefix + " ENDED"
    }
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

  switchToStreamSchedule() {
    this.countdownPrefix = "Stream ends in"
    this.countdownEndMessage = "Stream will end shortly"
  }
}
