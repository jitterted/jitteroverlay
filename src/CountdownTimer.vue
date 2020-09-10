<template>
  <div class="flex-shrink-0">
    <p
        class="px-2 py-1 ml-3 font-medium text-3xl truncate transition duration-500"
        v-bind:class="[isWarningTime ? warningTimeColorClasses : normalColorClasses]"
    >
      <span v-if="isTimerExpired">
        {{ countdownEndMessage }}
      </span>
      <span v-else>
        {{ countdownPrefix }} <span class="tabular-nums">{{ timeLeft }}</span>
      </span>
    </p>
  </div>
</template>
<script>
import addMinutes from "date-fns/addMinutes";
import addHours from "date-fns/addHours";
import startOfToday from "date-fns/startOfToday";
import {CountdownTimerRenderer} from "@/CountdownTimerRenderer";
import {StreamEndTimerRenderer} from "@/StreamEndTimerRenderer";
import parseTimeComponents from "@/parseTimeComponents";

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
      countdownTimerRenderer: new CountdownTimerRenderer(),
      streamEndTimerRenderer: new StreamEndTimerRenderer(),
    }
  },
  computed: {
    timeLeft() {
      if (this.streamEndTimerMode) {
        return this.streamEndTimerRenderer.renderTimeLeftFor(this.timeLeftMs)
      } else {
        return this.countdownTimerRenderer.renderTimeLeftFor(this.timeLeftMs)
      }
    },
    isWarningTime() {
      return this.timeLeftMs < this.warningTimeMs;
    },
    countdownPrefix() {
      if (this.streamEndTimerMode) {
        return this.streamEndTimerRenderer.renderCountdownPrefix()
      } else {
        return this.countdownTimerRenderer.renderCountdownPrefix()
      }
    },
    countdownEndMessage() {
      return this.countdownTimerRenderer.renderCountdownEndMessage()
    },
    isTimerExpired() {
      return this.timeLeftMs < 0;
    }
  },
  methods: {
    refreshTimeLeft() {
      this.timeLeftMs = this.endDateTime - Date.now()
    },
  },
  watch: {
    cardTitle: function (newCardTitle) {
      if (newCardTitle.toLowerCase().startsWith("countdown ")) {
        this.streamEndTimerMode = false
        this.endDateTime = this.countdownTimerRenderer.parseCardTitleForCountdown(newCardTitle)
      } else {
        this.streamEndTimerMode = true
        const {left: hours, right: minutes} = parseTimeComponents(newCardTitle)
        this.endDateTime = addMinutes(addHours(startOfToday(), hours), minutes)
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