export * from "@/theme/types";
export * from "@/features/week-schedule/types";
export * from "@/lib/types";

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
