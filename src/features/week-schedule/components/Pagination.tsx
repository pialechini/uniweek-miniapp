import styled from 'styled-components';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { themeColor } from '@/theme/Theme';

const ButtonsWrapper = styled.div<{ previous?: string; next?: string }>`
  display: flex;

  ${(props) => {
    if (props.previous && props.next) {
      return "justify-content: space-between;";
    } else if (props.previous) {
      return "justify-content: start;";
    } else {
      return "justify-content: end;";
    }
  }}
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  background-color: transparent;
  color: ${themeColor("primary")};
`;

const Bar = styled.div`
  background-color: ${themeColor("primary")};
  height: 1px;
`;

const StyledPagination = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  width: 100%;
  min-height: 42px;
`;

function Pagination({
  previous,
  next,
  onPreviousButtonClick,
  onNextButtonClick,
}: PaginationProps) {
  return (
    <StyledPagination>
      <ButtonsWrapper {...{ previous, next }}>
        {previous && (
          <Button onClick={onPreviousButtonClick}>
            <MdNavigateNext size={24} />
            {previous}
          </Button>
        )}

        {next && (
          <Button onClick={onNextButtonClick}>
            {next}
            <MdNavigateBefore size={24} />
          </Button>
        )}
      </ButtonsWrapper>
      <Bar />
    </StyledPagination>
  );
}

export default Pagination;

interface PaginationProps {
  previous?: string;
  next?: string;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
}
