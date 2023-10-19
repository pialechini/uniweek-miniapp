import * as types from "@/types/types";
import DaySchedule from "@/features/week-schedule/components/DaySchedule";
import DaySwitcher from "@/features/week-schedule/components/DaySwitcher";
import styled from "styled-components";
import {
  compareDays,
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

function WeekSchedule({ weekSchedule }: WeekScheduleProps) {
  const today = useMemo(getCurrentDay, []);
  const isWorkingDayToday = isWorkingDay(today);
  const [selectedDay, setSelectedDay] = useState<types.DayIndex>(() => {
    return isWorkingDayToday ? today : 0; // return today or next saturday
  });

  return (
    <Container>
      <DaySchedule
        selectedDay={selectedDay}
        selectedDayComparedToToday={
          isWorkingDayToday
            ? compareDays(selectedDay, today)
            : types.DayComparison.AFTER
        }
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
        showGoTodayButton={isWorkingDayToday && selectedDay !== today}
        onGoTodayClick={() => isWorkingDayToday && setSelectedDay(today)}
      />
    </Container>
  );
}

export default WeekSchedule;

interface WeekScheduleProps {
  weekSchedule: types.WeekSchedule;
}
