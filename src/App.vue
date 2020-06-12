<template>
  <div id="app">
    <div class="bg-indigo-800 bg-opacity-75">
      <div class="max-w-screen mx-3 py-3">
        <div class="flex items-start justify-between">
          <div class="w-0 flex-1 flex items-start">
            <span class="flex p-2 rounded-lg bg-indigo-800">
            <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
            </svg>
            </span>
            <p class="ml-3 font-medium text-4xl text-white truncate">
              Currently:
              Overlay - Countdown for time left until end of stream
            </p>
          </div>
          <div class="flex-shrink-0">
            <p class="ml-3 font-medium text-3xl text-orange-200 truncate">
              Stream ends in {{ timeLeft }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      streamEndDateTime: new Date('June 12, 2020 12:55:00'),
      timeLeftMs: 0,
      interval: undefined
    }
  },
  computed: {
    timeLeft() {
      if (this.timeLeftMs > 60000) {
        const timeLeftHours = Math.floor(this.timeLeftMs / 1000 / 60 / 60);
        const timeLeftMinutes = Math.ceil(this.timeLeftMs / 1000 / 60);
        return timeLeftHours + "h " + timeLeftMinutes + "m";
      } else {
        return "less than 1 minute";
      }
    }
  },
  methods: {
    refresh() {
      this.timeLeftMs = this.streamEndDateTime - Date.now();
    }
  },
  created() {
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 30000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }

}
</script>

<style>
</style>
