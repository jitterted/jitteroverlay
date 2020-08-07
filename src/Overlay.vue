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
            </p>
          </div>
          <countdownTimer
              :countdown-prefix="countdownPrefix"
              :streamEndTimerMode="streamEndTimerMode"
              :streamEndDateTime="streamEndDateTime"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import startOfToday from 'date-fns/startOfToday'
import addHours from 'date-fns/addHours'
import addMinutes from 'date-fns/addMinutes'
import addSeconds from 'date-fns/addSeconds'
import {Client} from '@stomp/stompjs';
import CountdownTimer from "@/CountdownTimer";

export default {
  name: 'Overlay',
  components: {CountdownTimer},
  data() {
    return {
      streamEndTimerMode: true,
      streamEndDateTime: addMinutes(addHours(startOfToday(), 16), 5),
      countdownPrefix: 'Stream ends in ',
      trelloTask: 'placeholder',
      subscription: undefined,
      client: undefined
    }
  },
  computed: {
    currentlyDoing() {
      return this.trelloTask
    }
  },
  methods: {
    websocketMessageDispatcher(event) {
        const message = JSON.parse(event.body);
        console.log("Event received:", message);
        console.log("Callback Name:", message.callbackName);
        if (message.callbackName === "stream_schedule") {
          this.updateStreamEndTimeFromTrello();
        } else if (message.callbackName === "doing") {
          this.updateCurrentTask();
        }
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
      updateCountdownBasedOnNewCardTitle(cardTitle) {
        if (cardTitle.toLowerCase().startsWith("countdown ")) {
          this.streamEndTimerMode = false
          const {left: minutes, right: seconds} = this.parseCountdownAsMinutesSeconds(cardTitle)
          this.countdownPrefix = this.parseCountdownTitleFrom(cardTitle)
          this.streamEndDateTime = addMinutes(addSeconds(Date.now(), seconds), minutes)
        } else {
          this.streamEndTimerMode = true
          const {left: hours, right: minutes} = this.parseTimeComponents(cardTitle)
          this.countdownPrefix = "Stream ends in "
          this.streamEndDateTime = addMinutes(addHours(startOfToday(), hours), minutes);
        }
        this.refreshTimeLeft();
      },
      updateStreamEndTimeFromTrello() {
        console.log("Updating Stream Schedule, fetching from Trello...");
        const streamScheduleCardListUrl = "https://api.trello.com/1/lists/5ef67927c7c4100d3998a842/cards?fields=name";
        fetch(streamScheduleCardListUrl)
          .then(response => response.json())
          .then(cards => {
            console.log("Cards from Stream Schedule list: ", cards)
            const cardTitle = cards[0].name;
            this.updateCountdownBasedOnNewCardTitle(cardTitle);
          })
      },
      createWebSocketAndSubscribeWith(callback) {
        const client = new Client({
          brokerURL: "wss://jitterted-webhook-proxy.herokuapp.com/api/ws"
          // brokerURL: "wss://4cae77f50ec5.ngrok.io/api/ws"
          , debug: function (str) {
            console.log(str);
          }
        });
        client.onConnect = function () {
          this.subscription = client.subscribe("/topic/trello", callback);
        }
        client.activate();
        return client;
      },
    },
    created() {
      this.updateCurrentTask();
      this.updateStreamEndTimeFromTrello();
      this.client = this.createWebSocketAndSubscribeWith(this.websocketMessageDispatcher);
    },
    beforeDestroy() {
      if (this.subscription) this.subscription.unsubscribe();
      if (this.client) this.client.deactivate();
    }
  }
</script>

