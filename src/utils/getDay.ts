import { months } from "./consts";

export function getDay(timeStamp: number) {
  const date = new Date(timeStamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day} ${month}`;
}
