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
