function formatPersianDate(date: Date) {
  return date.toLocaleDateString('fa-IR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

export { formatPersianDate };
