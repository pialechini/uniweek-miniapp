import * as types from "@/types/types";
import supabase from "@/lib/supabase";
import { getCurrentDay } from "@/lib/persian-date";
import {
  intervalToDuration,
  isSaturday,
  nextSaturday,
  previousSaturday,
} from "date-fns";
import { useAuth } from "@/features/auth/useAuth";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const START_DATE_OF_THE_TERM = "2023/09/23";

function isEvenWeekOrOdd(): "even" | "odd" {
  const startDateOfTheTerm = new Date(START_DATE_OF_THE_TERM);
  const firstSaturdayInTheTerm = isSaturday(startDateOfTheTerm)
    ? startDateOfTheTerm
    : previousSaturday(startDateOfTheTerm);

  const saturdayOfTheWeek =
    getCurrentDay() >= 5
      ? nextSaturday(Date.now())
      : previousSaturday(Date.now());

  const a = intervalToDuration({
    start: firstSaturdayInTheTerm,
    end: saturdayOfTheWeek,
  });

  const weekNumber = a.days! / 7 + 1;

  return weekNumber % 2 === 0 ? "even" : "odd";
}

function useWeekSchedule() {
  const [searchParams] = useSearchParams();
  const [weekSchedule, setWeekSchedule] = useState<types.WeekSchedule | null>(
    null
  );

  const loggedIn = useAuth(searchParams.get("credentials"));

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("week_schedule")
        .select("even_week_schedule,odd_week_schedule")
        .single();

      isEvenWeekOrOdd() === "even"
        ? setWeekSchedule(JSON.parse(data?.even_week_schedule))
        : setWeekSchedule(JSON.parse(data?.odd_week_schedule));
    })();
  }, [loggedIn]);

  return weekSchedule;
}

export default useWeekSchedule;