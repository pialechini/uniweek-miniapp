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
    (universityClass) =>
      universityClass.name == null && universityClass.location == null
  );

  return (
    <StyledClassList>
      {thereIsNoClass
        ? undefined
        : classes.map(({ name, location }, index) => (
            <Class
              key={index}
              index={index as 0 | 1 | 2 | 3}
              isPassed={index <= passedClasses}
              {...{ name, location }}
            />
          ))}
    </StyledClassList>
  );
}

export default ClassList;

interface ClassListProps {
  passedClasses: number;
  classes: types.Class[];
}
