import * as types from '@/types/types';
import ClassList from '@/features/week-schedule/components/ClassList';
import styled from 'styled-components';
import { getCurrentDay, getWeekdayName } from '@/lib/persian-date';
import { themeColor } from '@/theme/Theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;
  margin-right: 8px;
`;

const Weekday = styled.div<{ $active?: boolean }>`
  padding: 4px 8px;
  min-width: 75px;
  text-align: center;
  position: relative;
  font-weight: 500;
  ${(props) =>
    props.$active
      ? {
          color: props.theme.colors.pageBackground,
          backgroundColor: props.theme.colors.primary,
          borderRadius: "4px",
        }
      : {
          color: props.theme.colors.primary,
        }}

  &::before {
    display: ${(props) => (props.$active ? "none" : "block")};

    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${themeColor("primary")};
    border-radius: 4px;
  }
`;

Weekday.defaultProps = {
  $active: false,
};

/**
 * Calculates passed classes index
 *
 * -1 means nothing passed
 * 0 means the first class in the day is passed
 * ...
 * 3 means all classes are passed.
 */
function calculatePassedClasses(today: number, dayIndex: number) {
  const ALL_PASSED = 3;
  const NOTHING_PASSED = -1;

  if (dayIndex < today) {
    return ALL_PASSED;
  }

  if (dayIndex > today) {
    return NOTHING_PASSED;
  }

  const date = new Date();
  const currentTime = date.getHours() * 60 + date.getMinutes();

  const classEndings = [
    { endHour: 9, endMinute: 30 },
    { endHour: 11, endMinute: 30 },
    { endHour: 15, endMinute: 30 },
    { endHour: 17, endMinute: 30 },
  ];

  for (let i = 0; i < classEndings.length; i++) {
    const { endHour, endMinute } = classEndings[i];

    if (currentTime < endHour * 60 + endMinute) {
      return i - 1;
    }
  }

  return ALL_PASSED;
}

function DaySchedule({ classes, dayIndex }: DayScheduleProps) {
  const today = getCurrentDay();
  const passedClasses = calculatePassedClasses(today, dayIndex);

  return (
    <Container>
      <Weekday $active={dayIndex === today}>{getWeekdayName(dayIndex)}</Weekday>
      <ClassList {...{ classes, passedClasses }} />
    </Container>
  );
}

export default DaySchedule;

interface DayScheduleProps {
  dayIndex: types.DayIndex;
  classes: types.Class[];
}
