import * as types from "@/types/types";
import DaySchedule from "@/features/week-schedule/components/DaySchedule";
import DaySwitcher from "@/features/week-schedule/components/DaySwitcher";
import styled from "styled-components";
import useWeekSchedule from "@/features/week-schedule/hooks/useWeekSchedule";
import { getCurrentDay, getWeekdayName } from "@/lib/persian-date";
import { themeColor } from "@/theme/Theme";
import { useMemo, useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100dvh;
  padding: 32px 20px;
  background-color: ${themeColor("pageBackground")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Error = styled.div`
  line-height: 42px;
  color: ${themeColor("accent")};
`;

function WeekSchedule() {
  const [dayIndex, setDayIndex] = useState<number>(getCurrentDay());
  const weekSchedule = useWeekSchedule();
  const today = useMemo(getCurrentDay, []);

  return (
    <Container>
      {weekSchedule ? (
        <>
          <DaySchedule
            dayIndex={dayIndex as types.DayIndex}
            classes={weekSchedule.at(dayIndex)!}
          />
        </>
      ) : (
        <Error>
          امممم. برنامه تون موجود نیست ... 😅
          <br />
          لطفا راهنمای ربات رو مطالعه کنین.
        </Error>
      )}

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
