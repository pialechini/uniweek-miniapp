function toPersianNumber(number: number) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(number).replace(/\d/g, (digit) => persianDigits[digit]);
}

export { toPersianNumber };
