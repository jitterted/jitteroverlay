<template>
  <div>
    Placeholder for Settings page
    <br/>
    Title = {{ title }}
  </div>
</template>

<script>
  export default {
    name: "Settings",
    data() {
      return {
        title: "No Title Yet"
      }
    },
    methods: {},
    mounted() {
      const toDoListOfCardsUrl = 'https://api.trello.com/1/lists/5ee298bac53199290301955a/cards?fields=name';
      fetch(toDoListOfCardsUrl)
        .then(response => response.json())
        .then(cards => {
          this.title = cards[1].name
        });
    }
  }
</script>