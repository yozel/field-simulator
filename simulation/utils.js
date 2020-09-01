function divmod(x, y) {
  var div = Math.trunc(x/y);
  var rem = x % y;
  return [div, rem];
}

export function formatTime(timestamp) {
  let hours, minutes, seconds, milliseconds
  [seconds, milliseconds] = divmod(timestamp, 1000);
  [minutes, seconds] = divmod(seconds, 60);
  [hours, minutes] = divmod(minutes, 60);
  seconds = seconds.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function round(num, decimal_places) {
  return Math.round((num + Number.EPSILON) * 10*decimal_places) / (10*decimal_places)
}
