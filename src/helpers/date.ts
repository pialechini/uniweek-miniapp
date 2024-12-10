import { Weekday } from '@/types';

function formatPersianDate(date: Date) {
  return date.toLocaleDateString('fa-IR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

function toWeekday(date: Date) {
  return date.toLocaleDateString('fa-IR', {
    weekday: 'long',
  }) as Weekday;
}

export { formatPersianDate, toWeekday };
