export default function parseTimeComponents(timeString) {
  const timeComponents = timeString.split(':')
  const left = timeComponents[0]
  const right = timeComponents[1]
  return {left, right}
}
