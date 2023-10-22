import { defaultTheme } from "@/theme/defaultTheme";

export interface CourseSchedule {
  name: string;
  teacher: string;
  days: {
    location: string;
    time: string;
    evenOdd: "even" | "odd" | null;
  }[];
}

export enum DayComparison {
  BEFORE = -1,
  SAME,
  AFTER,
}

export type Theme = typeof defaultTheme;
export type ThemeColor = keyof typeof defaultTheme.colors;

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface UniClass {
  name?: string;
  location?: string;
}

export type DaySchedule = Array<UniClass | null>;

export type WeekSchedule = DaySchedule[];
