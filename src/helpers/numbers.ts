export function toPersianNumber(number: number) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(number).replace(
    /\d/g,
    (digit: string) => persianDigits[+digit],
  );
}

export function replaceWithEnglishNumbers(str: string) {
  const persianToEnglishMap: Record<string, string> = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };

  return str
    .split('')
    .map((char) => persianToEnglishMap[char] || char)
    .join('');
}

export function replaceWithPersianNumbers(str: string): string {
  const englishToPersianMap = [
    '۰',
    '۱',
    '۲',
    '۳',
    '۴',
    '۵',
    '۶',
    '۷',
    '۸',
    '۹',
  ];

  return str.replace(/\d/g, (digit) => englishToPersianMap[+digit]);
}
