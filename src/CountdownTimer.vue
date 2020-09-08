<template>
  <div class="flex-shrink-0">
    <p
        class="px-2 py-1 ml-3 font-medium text-3xl truncate transition duration-500"
        v-bind:class="[isWarningTime ? warningTimeColorClasses : normalColorClasses]"
    >
      <span v-if="showCountdownTimer">
        {{ countdownPrefix }} <span class="tabular-nums">{{ timeLeft }}</span>
      </span>
      <span>
        {{ countdownEndMessage }}
      </span>
    </p>
  </div>
</template>
<script>
import addMinutes from "date-fns/addMinutes";
import addSeconds from "date-fns/addSeconds";
import addHours from "date-fns/addHours";
import startOfToday from "date-fns/startOfToday";
import {CountdownTimerRenderer} from "@/CountdownTimerRenderer";
import {StreamEndTimerRenderer} from "@/StreamEndTimerRenderer";

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
      countdownTimerRenderer: new CountdownTimerRenderer(),
      streamEndTimerRenderer: new StreamEndTimerRenderer(),
      showCountdownTimer: true,
      countdownEndMessage: ''
    }
  },
  computed: {
    timeLeft() {
      if (this.streamEndTimerMode) {
        return this.streamEndTimerRenderer.render(this.timeLeftMs)
      } else {
        return this.countdownTimerRenderer.render(this.timeLeftMs)
      }
    },
    isWarningTime() {
      return this.timeLeftMs < this.warningTimeMs;
    },
  },
  methods: {
    refreshTimeLeft() {
      this.timeLeftMs = this.endDateTime - Date.now();
    },

    parseTimeComponents: function (countdownTime) {
      const timeComponents = countdownTime.split(':')
      const left = timeComponents[0]
      const right = timeComponents[1]
      return {left, right}
    },
    parseCountdownAsMinutesSeconds(text) {
      const finalSpaceIndex = text.lastIndexOf(' ')
      const countdownTime = text.substring(finalSpaceIndex + 1)
      return this.parseTimeComponents(countdownTime)
    },
    parseCountdownTitleFrom(text) {
      if (text.includes(" | ")) {
        text = text.split(' | ')[0]
      }
      const spaceAfterCountdown = text.indexOf(' ')
      const finalSpaceIndex = text.lastIndexOf(' ')
      return text.substring(spaceAfterCountdown + 1, finalSpaceIndex)
    },
    parseCountdownEndMessageFrom(text) {
      return text.split(' | ')[1]
    }
  },
  watch: {
    parseCardTitle: function (newCardTitle) {
      const countdownPrefix = this.parseCountdownTitleFrom(newCardTitle)
      const {left: minutes, right: seconds} = this.parseCountdownAsMinutesSeconds(newCardTitle)
      return {countdownPrefix, minutes, seconds}
    },
    cardTitle: function (newCardTitle) {
      if (newCardTitle.toLowerCase().startsWith("countdown ")) {
        this.streamEndTimerMode = false
        const {countdownPrefix, minutes, seconds} = this.parseCardTitle(newCardTitle);
        this.countdownPrefix = countdownPrefix
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