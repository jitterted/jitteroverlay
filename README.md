# jitteroverlay

## Setup Notes

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
 

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
