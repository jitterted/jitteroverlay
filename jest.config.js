// mock info from https://github.com/facebook/jest/issues/2071
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  automock: false,
  setupFiles: [
    "./setupJest.js"
  ]
}
