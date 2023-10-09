import * as types from "@/types/types";
import DaySchedule from "@/features/week-schedule/components/DaySchedule";
import DaySwitcher from "@/features/week-schedule/components/DaySwitcher";
import styled from "styled-components";
import { getCurrentDay, getWeekdayName } from "@/lib/persian-date";
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
  const [dayIndex, setDayIndex] = useState<number>(getCurrentDay());
  const today = useMemo(getCurrentDay, []);

  return (
    <Container>
      <DaySchedule
        dayIndex={dayIndex as types.DayIndex}
        classes={weekSchedule.at(dayIndex)!}
      />

      <DaySwitcher
        previous={dayIndex - 1 < 0 ? undefined : getWeekdayName(dayIndex - 1)}
        next={dayIndex + 1 > 4 ? undefined : getWeekdayName(dayIndex + 1)}
        showGoTodayButton={dayIndex !== today}
        onPreviousButtonClick={() => setDayIndex((i) => i - 1)}
        onNextButtonClick={() => setDayIndex((i) => i + 1)}
        onGoTodayClick={() => setDayIndex(today)}
      />
    </Container>
  );
}

export default WeekSchedule;

interface WeekScheduleProps {
  weekSchedule: types.WeekSchedule;
}
