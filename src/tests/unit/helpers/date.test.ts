import { getWeekParity } from '@/helpers';
import { describe, expect, it } from 'vitest';

const START_OF_TERM = new Date('2024-12-09T00:00:00+03:30');

describe('getWeekParity', () => {
  it("returns 'odd' when today is the same day as startOfTerm", () => {
    expect(
      getWeekParity(new Date('2024-12-09T13:15:00+03:30'), START_OF_TERM),
    ).toBe('odd');
  });

  it("returns 'odd' when today is in the same week as startOfTerm", () => {
    expect(
      getWeekParity(new Date('2024-12-10T13:15:00+03:30'), START_OF_TERM),
    ).toBe('odd');
    expect(
      getWeekParity(new Date('2024-12-11T13:15:00+03:30'), START_OF_TERM),
    ).toBe('odd');
    expect(
      getWeekParity(new Date('2024-12-12T13:15:00+03:30'), START_OF_TERM),
    ).toBe('odd');
    expect(
      getWeekParity(new Date('2024-12-13T23:59:59+03:30'), START_OF_TERM),
    ).toBe('odd');
  });

  it("returns 'even' when today is in the next week", () => {
    expect(
      getWeekParity(new Date('2024-12-14T00:00:00+03:30'), START_OF_TERM),
    ).toBe('even');
    expect(
      getWeekParity(new Date('2024-12-15T13:15:00+03:30'), START_OF_TERM),
    ).toBe('even');
    expect(
      getWeekParity(new Date('2024-12-20T23:59:59+03:30'), START_OF_TERM),
    ).toBe('even');
  });

  it("returns 'odd' when today is two weeks after startOfTerm", () => {
    expect(
      getWeekParity(new Date('2024-12-21T00:00:00+03:30'), START_OF_TERM),
    ).toBe('odd');
    expect(
      getWeekParity(new Date('2024-12-26T13:15:00+03:30'), START_OF_TERM),
    ).toBe('odd');
    expect(
      getWeekParity(new Date('2024-12-27T23:59:59+03:30'), START_OF_TERM),
    ).toBe('odd');
  });
});
