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
              Currently: {{ currentlyDoing }}
<!--               ☕️ Blackjack - Continue to Build Up the State Pattern-->
<!--               ☕️ Blackjack - Refactoring to Transition-based State Machine-->
<!--              Fixing the JitterShout Twitch Team Shout-out Bot-->
<!--              Add Spring-based User Interface to Yacht (Yahtzee-like game)-->
            </p>
          </div>
          <div class="flex-shrink-0">
            <p class="px-2 py-1 ml-3 font-medium text-3xl truncate transition duration-500"
               v-bind:class="[isNoteTime ? noteTimeColorClasses : normalColorClasses]"
            >
              Stream ends in {{ timeLeft }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import startOfToday from 'date-fns/startOfToday'
import addHours from 'date-fns/addHours'
import addMinutes from 'date-fns/addMinutes'
import { Client } from '@stomp/stompjs';

export default {
  name: 'Overlay',
  data() {
    return {
      streamEndDateTime: addMinutes(addHours(startOfToday(), 16), 5),
      timeLeftMs: 0,
      interval: undefined,
      noteTimeMs: 10 * 60 * 1000, // 10 minutes
      normalColorClasses: 'text-orange-200',
      noteTimeColorClasses: 'text-indigo-800 bg-orange-200',
      trelloTask: 'placeholder',
      subscription: undefined
    }
  },
  computed: {
    timeLeft() {
      if (this.isLessThanOneMinuteRemaining()) {
        return this.formatTimeInMs(this.timeLeftMs);
      } else {
        return "less than 1 minute";
      }
    },
    isNoteTime() {
      return this.timeLeftMs < this.noteTimeMs;
    },
    currentlyDoing() {
      return this.trelloTask
    }
  },
  methods: {
    formatTimeInMs(timeLeftMs) {
      const timeLeftHours = Math.floor(timeLeftMs / 1000 / 60 / 60);
      const timeLeftMinutes = Math.floor(timeLeftMs / 1000 / 60) - (timeLeftHours * 60);
      return timeLeftHours + "h " + timeLeftMinutes + "m";
    },
    isLessThanOneMinuteRemaining() {
      return this.timeLeftMs > 60000;
    },
    refresh() {
      this.timeLeftMs = this.streamEndDateTime - Date.now();
    },
    updateCurrentTask() {
      const toDoListOfCardsUrl = 'https://api.trello.com/1/lists/5ee298bac53199290301955a/cards?fields=name';
      fetch(toDoListOfCardsUrl)
        .then(response => response.json())
        .then(cards => {
          if (cards.length > 1) {
            this.trelloTask = cards[1].name
          } else {
            this.trelloTask = "Nothing...yet?"
          }
        });
    }
  }, created() {
    this.updateCurrentTask();
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 30000);
    const client = new Client({
      brokerURL: "ws://jitterted-webhook-proxy.herokuapp.com/api/ws"
      // , debug: function (str) {
      //   console.log(str);
      // }
    });
    const callback = this.updateCurrentTask
    client.onConnect = function() {
      this.subscription = client.subscribe("/topic/trello", callback);
    }
    client.activate()
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style>
</style>
