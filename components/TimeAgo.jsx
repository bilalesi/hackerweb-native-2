import { differenceInSeconds, isSameYear, format, isValid } from 'date-fns';

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_DAY = 1440;
const DAYS_IN_WEEK = 7;
const MINUTES_IN_WEEK = MINUTES_IN_DAY * DAYS_IN_WEEK;

export default function ({ time }) {
  if (!time || !isValid(time)) return;
  const now = new Date();
  const seconds = differenceInSeconds(now, time);
  const minutes = Math.round(seconds / 60);
  let text = '';
  if (minutes < 1) {
    text = seconds + 's';
  } else if (minutes < SECONDS_IN_MINUTE) {
    text = minutes + 'm';
  } else if (minutes < MINUTES_IN_DAY) {
    text = Math.round(minutes / SECONDS_IN_MINUTE) + 'h';
  } else if (minutes < MINUTES_IN_WEEK) {
    text = Math.round(minutes / SECONDS_IN_MINUTE / DAYS_IN_WEEK) + 'd';
  } else if (isSameYear(time, now)) {
    text = format(time, 'd LLL');
  } else {
    text = format(time, 'd LLL yyyy');
  }
  return text;
}
