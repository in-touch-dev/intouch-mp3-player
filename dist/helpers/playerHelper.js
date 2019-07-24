export function getDuration(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  var hours = Math.floor(time / 3600);
  var wholeSeconds = seconds.toFixed(0);
  if (hours !== 0) return hours + '.' + minutes + '.' + wholeSeconds;else return minutes + '.' + wholeSeconds;
}