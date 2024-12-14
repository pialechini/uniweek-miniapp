import { getWeekParity } from '@/helpers';
import { describe, expect, it } from 'vitest';

const START_OF_TERM = '2024-12-09T00:00:00';

function weekParity(today: string, timezone = '+03:30') {
  return getWeekParity(
    new Date(today + timezone),
    new Date(START_OF_TERM + timezone),
  );
}

describe('getWeekParity', () => {
  it("returns 'odd' when today is the same day as startOfTerm", () => {
    expect(weekParity('2024-12-09T13:15:00')).toBe('odd');
  });

  it("returns 'odd' when today is in the same week as startOfTerm", () => {
    const dates = [
      '2024-12-10T13:15:00',
      '2024-12-11T13:15:00',
      '2024-12-12T13:15:00',
      '2024-12-13T23:59:59',
    ];

    for (const date of dates) {
      expect(weekParity(date)).toBe('odd');
    }
  });

  it("returns 'even' when today is in the next week", () => {
    const dates = [
      '2024-12-14T13:15:00',
      '2024-12-15T13:15:00',
      '2024-12-16T13:15:00',
      '2024-12-20T23:59:59',
    ];

    for (const date of dates) {
      expect(weekParity(date)).toBe('even');
    }
  });

  it("returns 'odd' when today is two weeks after startOfTerm", () => {
    const dates = [
      '2024-12-21T00:00:00',
      '2024-12-26T13:15:00',
      '2024-12-27T23:59:59',
    ];

    for (const date of dates) {
      expect(weekParity(date)).toBe('odd');
    }
  });
});
