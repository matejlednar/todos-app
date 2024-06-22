// 3 hours delay, don't plan short tasks
const delay = 3 * (60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds

export function getCurrentISODate(delay: number = 0) {
  const currentTimestamp = Date.now();
  const date = new Date(currentTimestamp + delay);
  return date.toISOString();
}

export function getMinDueToISODateTime() {
  return getCurrentISODate(delay);
}

export function getMinDueToMSDateTime() {
  const now = Date.now();
  return now + delay;
}

export function getMinDatetime() {
  return new Date(getMinDueToMSDateTime()).toISOString();
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
