import * as types from "@/types/types";
import DaySchedule from "@/features/week-schedule/components/DaySchedule";
import DaySwitcher from "@/features/week-schedule/components/DaySwitcher";
import sampleCourseSchedule from "@/sample-course-schedule";
import styled from "styled-components";
import { constructWeekSchedule } from "@/lib/golestan";
import { getCurrentDay, getWeekdayName } from "@/lib/persian-date";
import { themeColor } from "@/theme/Theme";
import { useEffect, useMemo, useState } from "react";
// import useDeserializedCourseSchedule from '@/features/week-schedule/hooks/useDeserializedCourseSchedule';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 32px 20px;
  background-color: ${themeColor("pageBackground")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function WeekSchedule() {
  //TODO replace with the correct one
  // const schedule = sampleCourseSchedule;
  // const schedule = useDeserializedCourseSchedule();
  const [dayIndex, setDayIndex] = useState<number>(getCurrentDay());
  const [weekSchedule, setWeekSchedule] = useState<types.WeekSchedule>();
  const today = useMemo(getCurrentDay, []);

  useEffect(() => {
    setWeekSchedule(constructWeekSchedule("even", sampleCourseSchedule));
  }, []);

  return (
    <Container>
      {weekSchedule && (
        <>
          <DaySchedule
            dayIndex={dayIndex as types.DayIndex}
            classes={weekSchedule.at(dayIndex)!}
          />
        </>
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
