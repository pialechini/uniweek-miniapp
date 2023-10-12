import * as types from "@/types/types";
import DaySchedule from "@/features/week-schedule/components/DaySchedule";
import DaySwitcher from "@/features/week-schedule/components/DaySwitcher";
import styled from "styled-components";
import {
  getCurrentDay,
  getWeekdayName,
  isWorkingDay,
  nextDayOf,
  previousDayOf,
} from "@/lib/persian-date";
import { useMemo, useState } from "react";

const Container = styled.div`
  height: 100%;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 430px) {
    width: 430px;
    margin: 0 auto;
  }
`;

function compareDays(day1: types.DayIndex, day2: types.DayIndex) {
  return (day1 - day2) as types.DayComparison;
}

function WeekSchedule({ weekSchedule }: WeekScheduleProps) {
  const today = useMemo(getCurrentDay, []);
  const [selectedDay, setSelectedDay] = useState<types.DayIndex>(() => {
    return isWorkingDay(today) ? today : 0; // return today or next saturday
  });

  return (
    <Container>
      <DaySchedule
        selectedDay={selectedDay}
        selectedDayComparedToToday={compareDays(selectedDay, today)}
        classes={weekSchedule.at(selectedDay)!}
      />

      <DaySwitcher
        previous={
          isWorkingDay(previousDayOf(selectedDay))
            ? getWeekdayName(selectedDay - 1)
            : undefined
        }
        next={
          isWorkingDay(nextDayOf(selectedDay))
            ? getWeekdayName(selectedDay + 1)
            : undefined
        }
        onPreviousButtonClick={() => setSelectedDay((i) => previousDayOf(i))}
        onNextButtonClick={() => setSelectedDay((i) => nextDayOf(i))}
        showGoTodayButton={isWorkingDay(today) && selectedDay !== today}
        onGoTodayClick={() => setSelectedDay(today)}
      />
    </Container>
  );
}

export default WeekSchedule;

interface WeekScheduleProps {
  weekSchedule: types.WeekSchedule;
}
