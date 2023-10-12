import * as types from "@/types/types";

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

export function isWorkingDay(dayIndex: types.DayIndex) {
  return dayIndex < 5;
}

export function nextDayOf(dayIndex: types.DayIndex) {
  return dayIndex === 6 ? 0 : ((dayIndex + 1) as types.DayIndex);
}

export function previousDayOf(dayIndex: types.DayIndex) {
  return dayIndex === 0 ? 6 : ((dayIndex - 1) as types.DayIndex);
}
