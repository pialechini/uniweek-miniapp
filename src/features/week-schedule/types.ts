export interface Class {
  name: string | null;
  location: string | null;
}

export type DaySchedule = Class[];

export type WeekSchedule = DaySchedule[];
