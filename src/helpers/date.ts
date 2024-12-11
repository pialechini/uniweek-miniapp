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
