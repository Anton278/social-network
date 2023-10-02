function getTimeFromNow(timeStamp: number) {
  const dateNow = Math.floor(Date.now() / 1000);
  const diff = dateNow - timeStamp;

  if (diff <= 44) {
    return "a few seconds ago";
  }
  if (diff >= 45 && diff <= 89) {
    return "a minute ago";
  }
  if (diff >= 90 && diff <= 44 * 60) {
    return `${Math.ceil(diff / 60)} minutes ago`;
  }
  if (diff >= 45 * 60 && diff <= 89 * 60) {
    return "an hour ago";
  }
  if (diff >= 90 * 60 && diff <= 21 * 60 * 60) {
    return `${Math.ceil(diff / 3600)} hours ago`;
  }
  if (diff >= 22 * 60 * 60 && diff <= 35 * 60 * 60) {
    return "a day ago";
  }
  if (diff >= 36 * 60 * 60 && diff <= 25 * 24 * 60 * 60) {
    return `${Math.ceil(diff / 86400)} days ago`;
  }
  if (diff >= 26 * 24 * 60 * 60 && diff <= 44 * 24 * 60 * 60) {
    return "a month ago";
  }
  if (diff >= 45 * 24 * 60 * 60 && diff <= 319 * 24 * 60 * 60) {
    return `${Math.ceil(diff / 60 / 60 / 24 / 30)} months ago`;
  }
  if (diff >= 320 * 24 * 60 * 60 && diff <= 547 * 24 * 60 * 60) {
    return `a year ago`;
  }
  if (diff >= 548 * 24 * 60 * 60) {
    return `${Math.ceil(diff / 60 / 60 / 24 / 365)} years ago`;
  }
}

export { getTimeFromNow };
