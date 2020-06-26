# JitterOverlay

## Project Info

See the Trello board for this project at https://trello.com/b/wKSOndRf/jitterted-overlays

## Setup Notes

This is information I could have used when initially creating this project...

1. Use Vue CLI Tailwind command to add Tailwind support
    See https://github.com/forsartis/vue-cli-plugin-tailwind

1. Add Tailwind CSS UI support

    * Don't forget to add the @tailwindcss/ui to the tailwind.config.js:
    
      ```
      // tailwind.config.js
      module.exports = {
        plugins: [
          require('@tailwindcss/ui'),
        ]
      }
      ``` 

## Lessons Learned

* Cmd+E in IntelliJ IDEA is contextual, in the Local Changes dialog is the same as ^M for Commit Message History.

(Tuesday June 23 2020)

* When moving to Vue Router, the main page (e.g., App.vue) becomes just a holder of a
  router-view component, where the actual pages are in separate components.

* For writing unit tests of the routing, example from https://medium.com/@sarngru/vue-router-unit-testing-navigation-6cc0b0f86811

