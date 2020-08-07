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
              :cardTitle="cardTitle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Client} from '@stomp/stompjs';
import CountdownTimer from "@/CountdownTimer";

export default {
  name: 'Overlay',
  components: {CountdownTimer},
  data() {
    return {
      trelloTask: 'placeholder',
      subscription: undefined,
      client: undefined,
      cardTitle: undefined
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
      updateStreamEndTimeFromTrello() {
        console.log("Updating Stream Schedule, fetching from Trello...");
        const streamScheduleCardListUrl = "https://api.trello.com/1/lists/5ef67927c7c4100d3998a842/cards?fields=name";
        fetch(streamScheduleCardListUrl)
          .then(response => response.json())
          .then(cards => {
            console.log("Cards from Stream Schedule list: ", cards)
            this.cardTitle = cards[0].name;
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

