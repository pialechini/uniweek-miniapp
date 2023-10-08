import * as types from '@/types/types';
import DaySchedule from '@/features/week-schedule/components/DaySchedule';
import Pagination from '@/features/week-schedule/components/Pagination';
import sampleCourseSchedule from '@/sample-course-schedule';
import styled from 'styled-components';
import { constructWeekSchedule } from '@/lib/golestan';
import { getCurrentDay, getWeekdayName } from '@/lib/persian-date';
import { themeColor } from '@/theme/Theme';
import { useEffect, useState } from 'react';
// import useDeserializedCourseSchedule from '@/features/week-schedule/hooks/useDeserializedCourseSchedule';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 32px 20px;
  background-color: ${themeColor("pageBackground")};
`;

const TodayButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  font-weight: 700;
  height: 52px;
  background-color: ${themeColor("primary")};
  color: ${themeColor("pageBackground")};
`;

function WeekSchedule() {
  //TODO replace with the correct one
  // const schedule = sampleCourseSchedule;
  // const schedule = useDeserializedCourseSchedule();
  const [dayIndex, setDayIndex] = useState<number>(getCurrentDay());
  const [weekSchedule, setWeekSchedule] = useState<types.WeekSchedule>();

  useEffect(() => {
    setWeekSchedule(constructWeekSchedule("even", sampleCourseSchedule));
  }, []);

  return (
    <Background>
      {weekSchedule && (
        <>
          <DaySchedule
            dayIndex={dayIndex as types.DayIndex}
            classes={weekSchedule.at(dayIndex)!}
          />
          <div style={{ marginTop: "56px" }}>
            <Pagination
              previous={
                dayIndex - 1 < 0 ? undefined : getWeekdayName(dayIndex - 1)
              }
              next={dayIndex + 1 > 4 ? undefined : getWeekdayName(dayIndex + 1)}
              onPreviousButtonClick={() => setDayIndex((i) => i - 1)}
              onNextButtonClick={() => setDayIndex((i) => i + 1)}
            />
          </div>
        </>
      )}

      <TodayButton onClick={() => setDayIndex(getCurrentDay())}>
        امروز
      </TodayButton>
    </Background>
  );
}

export default WeekSchedule;
