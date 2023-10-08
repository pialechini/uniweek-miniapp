import styled from "styled-components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { themeColor } from "@/theme/Theme";

const Button = styled.button<{ $hidden?: boolean }>`
  min-width: 80px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  background-color: transparent;
  color: ${themeColor("primary")};
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
`;

const PreviousButton = styled(Button)``;

const NextButton = styled(Button)`
  display: flex;
  justify-content: end;
`;

const TodayButton = styled.button<{ $hidden: boolean }>`
  width: 100px;
  height: 38px;
  margin: 0 auto;
  font-size: 14px;
  font-weight: 500;
  background-color: ${themeColor("primary")};
  color: ${themeColor("pageBackground")};
  border-radius: 8px;
  transition: opacity 0.2s ease;
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
`;

const StyledDaySwitcher = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 42px;
`;

function DaySwitcher({
  previous,
  next,
  showGoTodayButton,
  onPreviousButtonClick,
  onNextButtonClick,
  onGoTodayClick,
}: DaySwitcherProps) {
  function handleNextButtonClick() {
    if (!next) {
      return;
    }

    onNextButtonClick();
  }

  function handlePreviousButtonClick() {
    if (!previous) {
      return;
    }

    onPreviousButtonClick();
  }

  return (
    <StyledDaySwitcher>
      <PreviousButton onClick={handlePreviousButtonClick} $hidden={!previous}>
        <MdNavigateNext size={24} />
        {previous}
      </PreviousButton>

      <TodayButton onClick={onGoTodayClick} $hidden={!showGoTodayButton}>
        برو امروز
      </TodayButton>

      <NextButton onClick={handleNextButtonClick} $hidden={!next}>
        {next}
        <MdNavigateBefore size={24} />
      </NextButton>
    </StyledDaySwitcher>
  );
}

export default DaySwitcher;

interface DaySwitcherProps {
  previous?: string;
  next?: string;
  showGoTodayButton?: boolean;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
  onGoTodayClick: () => void;
}
