<template>
  <div>
    <h1>Choose List to Watch from Trello Board</h1>
    <br/>
    <ol>
      <li v-for="list in lists" v-bind:key="list.id">
        {{ list.name }} ({{ list.id }})
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: "Settings",
    data() {
      return {
        lists: []
      }
    },
    methods: {},
    mounted() {
      const jittertedOverlayBoardId = "5ee298bac531992903019556";
      const allListsOnBoardUrl = "https://api.trello.com/1/boards/" + jittertedOverlayBoardId + "/lists?fields=id,name"
      fetch(allListsOnBoardUrl)
        .then(response => response.json())
        .then(lists => {
          this.lists = lists;
        });
    }
  }
</script>