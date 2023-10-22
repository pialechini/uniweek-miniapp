import * as types from "@/types/types";
import Class from "@/features/week-schedule/components/Class";
import styled from "styled-components";

const StyledClassList = styled.div`
  min-height: 228px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function ClassList({ passedClasses, classes }: ClassListProps) {
  const thereIsNoClass = classes.every(
    (universityClass) => universityClass === null
  );

  return (
    <StyledClassList>
      {thereIsNoClass
        ? undefined
        : classes.map((uniClass, index) => (
            <Class
              key={index}
              index={index as 0 | 1 | 2 | 3 | 4}
              isPassed={index <= passedClasses}
              name={uniClass ? uniClass.name : undefined}
              location={uniClass ? uniClass.location : undefined}
            />
          ))}
    </StyledClassList>
  );
}

export default ClassList;

interface ClassListProps {
  passedClasses: number;
  classes: types.DaySchedule;
}
