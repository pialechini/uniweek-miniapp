import * as types from '@/types/types';

const WEEKDAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export function getCurrentDay() {
  const nativeDay = new Date().getDay();
  const correctlyIndexedDay = nativeDay === 6 ? 0 : nativeDay + 1;
  return correctlyIndexedDay as types.DayIndex;
}

export function getCurrentWeekday() {
  return WEEKDAYS[getCurrentDay()];
}

export function getWeekdayName(index: number) {
  return WEEKDAYS[index];
}
