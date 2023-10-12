import * as types from "@/types/types";
import supabase from "@/lib/supabase";
import { getCurrentDay, isWorkingDay } from "@/lib/persian-date";
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

  const saturdayOfTheWeek = isWorkingDay(getCurrentDay())
    ? previousSaturday(Date.now())
    : nextSaturday(Date.now());

  const difference = intervalToDuration({
    start: firstSaturdayInTheTerm,
    end: saturdayOfTheWeek,
  });

  const weekNumber = difference.days! / 7 + 1;

  return weekNumber % 2 === 0 ? "even" : "odd";
}

function useWeekSchedule() {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [weekSchedule, setWeekSchedule] = useState<types.WeekSchedule | null>(
    null
  );

  const user = useAuth(searchParams.get("credentials"));

  useEffect(() => {
    (async () => {
      if (!user) {
        return;
      }

      try {
        const { data } = await supabase
          .from("week_schedule")
          .select("even_week_schedule,odd_week_schedule")
          .eq("user_id", user?.id)
          .single();

        isEvenWeekOrOdd() === "even"
          ? setWeekSchedule(JSON.parse(data?.even_week_schedule))
          : setWeekSchedule(JSON.parse(data?.odd_week_schedule));
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return { weekSchedule, loading };
}

export default useWeekSchedule;
