import { Weekday } from '@/types';
import { differenceInDays, isSaturday, previousSaturday } from 'date-fns';

export function formatPersianDate(date: Date) {
  return date.toLocaleDateString('fa-IR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

export function toWeekday(date: Date) {
  return date.toLocaleDateString('fa-IR', {
    weekday: 'long',
  }) as Weekday;
}

export function getWeekParity(today: Date, startOfTerm: Date): 'even' | 'odd' {
  const saturdayOf = (date: Date) =>
    isSaturday(date) ? date : previousSaturday(date);

  const firstSaturdayInTheTerm = saturdayOf(startOfTerm);
  const saturdayOfTheWeek = saturdayOf(today);

  const weekNumber = Math.floor(
    differenceInDays(saturdayOfTheWeek, firstSaturdayInTheTerm) / 7 + 1,
  );

  return weekNumber % 2 === 0 ? 'even' : 'odd';
}

export function getStartOfTerm() {
  return new Date('2024-09-22T00:00:00+03:30');
}

export function weekdayIndex(weekday: Weekday) {
  return weekdays.indexOf(weekday);
}

export function parseTime(time: string) {
  const [startTime, endTime] = time.split('-');

  if (!startTime || !endTime) {
    throw new Error('invalid time format: ' + time);
  }

  return [startTime, endTime];
}

export const weekdays: Weekday[] = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
] as const;
