export function getTime(timeStamp: number) {
  const date = new Date(timeStamp * 1000);
  let hours: string | number = date.getHours();
  hours = String(hours).length === 1 ? `0${hours}` : hours;
  let minutes: string | number = date.getMinutes();
  minutes = String(minutes).length === 1 ? `0${minutes}` : minutes;
  const time = `${hours}:${minutes}`;
  return time;
}
