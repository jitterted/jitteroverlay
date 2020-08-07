<template>
  <div class="flex-shrink-0">
    <p class="px-2 py-1 ml-3 font-medium text-3xl truncate transition duration-500"
       v-bind:class="[isWarningTime ? warningTimeColorClasses : normalColorClasses]"
    >
      {{ countdownPrefix }} <span class="tabular-nums">{{ timeLeft }}</span>
    </p>
  </div>
</template>
<script>
import addMinutes from "date-fns/addMinutes";
import addSeconds from "date-fns/addSeconds";
import addHours from "date-fns/addHours";
import startOfToday from "date-fns/startOfToday";

export default {
  name: 'countdownTimer',
  props: {
    cardTitle: {},
  },
  data() {
    return {
      timeLeftMs: 0,
      interval: undefined,
      warningTimeMs: 10 * 60 * 1000, // 10 minutes
      normalColorClasses: 'text-orange-200',
      warningTimeColorClasses: 'text-indigo-800 bg-orange-200',
      streamEndTimerMode: true,
      endDateTime: addMinutes(addHours(startOfToday(), 16), 5),
      countdownPrefix: 'Stream ends in ',
    }
  },
  computed: {
    timeLeft() {
      if (this.streamEndTimerMode && this.isLessThanOneMinuteRemaining()) {
        return "less than 1 minute";
      }
      if (this.isEnded()) {
        return "ENDED"
      }
      return this.formatTimeInMs(this.timeLeftMs);
    },
    isWarningTime() {
      return this.timeLeftMs < this.warningTimeMs;
    },
  },
  methods: {
    refreshTimeLeft() {
      this.timeLeftMs = this.endDateTime - Date.now();
    },
    isEnded() {
      return this.timeLeftMs < 0;
    },
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
    },
    isLessThanOneMinuteRemaining() {
      return this.timeLeftMs < 60000;
    },

    parseTimeComponents: function (countdownTime) {
      const timeComponents = countdownTime.split(':');
      const left = timeComponents[0]
      const right = timeComponents[1]
      return {left, right}
    },
    parseCountdownAsMinutesSeconds(text) {
      const finalSpaceIndex = text.lastIndexOf(' ');
      const countdownTime = text.substring(finalSpaceIndex + 1)
      return this.parseTimeComponents(countdownTime);
    },
    parseCountdownTitleFrom(text) {
      const spaceAfterCountdown = text.indexOf(' ');
      const finalSpaceIndex = text.lastIndexOf(' ');
      return text.substring(spaceAfterCountdown + 1, finalSpaceIndex)
    },
  },
  watch: {
    cardTitle: function (newCardTitle) {
      if (newCardTitle.toLowerCase().startsWith("countdown ")) {
        this.streamEndTimerMode = false
        const {left: minutes, right: seconds} = this.parseCountdownAsMinutesSeconds(newCardTitle)
        this.countdownPrefix = this.parseCountdownTitleFrom(newCardTitle)
        this.endDateTime = addMinutes(addSeconds(Date.now(), seconds), minutes)
      } else {
        this.streamEndTimerMode = true
        const {left: hours, right: minutes} = this.parseTimeComponents(newCardTitle)
        this.countdownPrefix = "Stream ends in "
        this.endDateTime = addMinutes(addHours(startOfToday(), hours), minutes);
      }
      this.refreshTimeLeft();
    },
  },
  created() {
    this.interval = setInterval(() => this.refreshTimeLeft(), 1000);
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}
</script>
<style>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>