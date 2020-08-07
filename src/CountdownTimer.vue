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
export default {
  name: 'countdownTimer',
  props: {
    countdownPrefix: {},
    timeLeftMs: {},
    streamEndTimerMode: {}
  },
  data() {
    return {
      warningTimeMs: 10 * 60 * 1000, // 10 minutes
      normalColorClasses: 'text-orange-200',
      warningTimeColorClasses: 'text-indigo-800 bg-orange-200',
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
  }
}
</script>
<style>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>