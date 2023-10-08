import * as types from "@/types/types";
import styled from "styled-components";
import { themeColor } from "@/theme/Theme";

const StyledClass = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
`;

const ClassLocationColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ClassName = styled.h1`
  font-size: 14px;
  font-weight: 700;
  color: ${themeColor("primary")};
`;

const ClassLocation = styled.p`
  font-size: 12px;
  font-weight: 300;
  text-overflow: ellipsis;
`;

const TimeBadge = styled.span<{ $border: boolean; $fill: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 28px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 64px;

  ${(props) =>
    props.$border && {
      border: `1px solid ${props.theme.colors.primary}`,
    }}

  ${(props) =>
    props.$fill
      ? {
          backgroundColor: `${props.theme.colors.primary}`,
          color: `${props.theme.colors.pageBackground}`,
        }
      : {
          backgroundColor: `${props.theme.colors.pageBackground}`,
          color: `${props.theme.colors.primary}`,
        }}
`;

TimeBadge.defaultProps = {
  $border: true,
  $fill: false,
};

const TIME_PERIODS = ["۰۸:۰۰", "۱۰:۰۰", "۱۴:۰۰", "۱۶:۰۰"];

function Class({ index, name, location, isPassed }: ClassProps) {
  return (
    <StyledClass>
      <ClassLocationColumn>
        <ClassName>{name}</ClassName>
        <ClassLocation>{location}</ClassLocation>
      </ClassLocationColumn>
      <TimeBadge $border={Boolean(name)} $fill={Boolean(name) && !isPassed}>
        {TIME_PERIODS[index]}
      </TimeBadge>
    </StyledClass>
  );
}

export default Class;

interface ClassProps extends types.Class {
  index: 0 | 1 | 2 | 3;
  isPassed: boolean;
}
