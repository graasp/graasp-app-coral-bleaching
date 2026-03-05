export function humanizeDays(value: number): string {
  let days = Math.floor(value);
  let hours = Math.round((value - days) * 24);

  if (hours === 24) {
    days += 1;
    hours = 0;
  }

  const result = [];

  if (days > 0) {
    result.push(days === 1 ? '1 day' : `${days} days`);
  }

  if (hours > 0) {
    result.push(hours === 1 ? '1 hour' : `${hours} hours`);
  }

  return result.join(' and ');
}
