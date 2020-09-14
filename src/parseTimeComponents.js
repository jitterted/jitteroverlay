export default function parseTimeComponents(timeString) {
  const timeComponents = timeString.split(':')
  const left = parseInt(timeComponents[0])
  const right = parseInt(timeComponents[1])
  return {left, right}
}
