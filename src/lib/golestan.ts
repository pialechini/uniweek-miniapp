import * as types from "@/types/types";
import sampleCourseSchedule from "@/sample-course-schedule";

function initializeEmptyWeekSchedule(): types.WeekSchedule {
  return Array.from({ length: 5 }, () =>
    Array(4).fill({ name: null, location: null })
  );
}

function convertTimePeriodToClassIndex(timePeriod: string) {
  switch (timePeriod) {
    case "08:00-10:00":
      return 0;
    case "10:00-12:00":
      return 1;
    case "14:00-16:00":
      return 2;
    case "16:00-18:00":
      return 3;
  }
}

function replaceLatinNumbersWithPersian(text: string) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  // Use regular expression to match Latin numbers
  const regex = /[0-9]/g;

  // Replace each Latin number with the corresponding Persian number
  const result = text.replace(regex, (match) => persianNumbers[Number(match)]);

  return result;
}

function formatClassName(name: string) {
  return replaceLatinNumbersWithPersian(name).replace(/ي/g, "ی");
}

function formatClassLocation(location: string) {
  return replaceLatinNumbersWithPersian(location)
    .replace(/ي/g, "ی")
    .replace("-", " - ")
    .replace("/", "");
}

export function constructWeekSchedule(
  evenOdd: "even" | "odd",
  golestanCourseSchedule: typeof sampleCourseSchedule
): types.WeekSchedule {
  const weekSchedule = initializeEmptyWeekSchedule();

  for (const course of golestanCourseSchedule) {
    for (const dayIndex in course.days) {
      const day = course.days[dayIndex];

      if (day !== null && (day.evenOdd == evenOdd || day.evenOdd == null)) {
        weekSchedule[dayIndex][convertTimePeriodToClassIndex(day.time)!] = {
          name: formatClassName(course.name),
          location: formatClassLocation(day.location),
        };
      }
    }
  }

  return weekSchedule;
}
