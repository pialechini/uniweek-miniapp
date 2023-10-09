import LoaderComponent from "react-js-loader";
import styled, { useTheme } from "styled-components";
import useWeekSchedule from "@/features/week-schedule/hooks/useWeekSchedule";
import WeekSchedule from "@/features/week-schedule/components/WeekSchedule";
import { themeColor } from "@/theme/Theme";

const Background = styled.div`
  width: 100vw;
  height: 100dvh;
  background-color: ${themeColor("pageBackground")};
`;

const StyledError = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 48px);
  line-height: 28px;
  font-size: 12px;
  text-align: center;
  color: ${themeColor("accent")};
`;

const StyledLoader = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

function Loader() {
  const theme = useTheme();

  return (
    <StyledLoader>
      <LoaderComponent
        type="spinner-circle"
        bgColor={theme.colors.primary}
        size={100}
      />
    </StyledLoader>
  );
}

function Error() {
  return (
    <StyledError>
      امممم. برنامه تون موجود نیست ... 😅
      <br />
      لطفا راهنمای ربات رو مطالعه کنین.
      <br />
      (البته شاید هم اینترنت مشکل پیدا کرده. نگی نگفتی :))
    </StyledError>
  );
}

function WeekSchedulePage() {
  const { weekSchedule, loading } = useWeekSchedule();

  return (
    <Background>
      {loading ? (
        <Loader />
      ) : weekSchedule ? (
        <WeekSchedule weekSchedule={weekSchedule} />
      ) : (
        <Error />
      )}
    </Background>
  );
}

export default WeekSchedulePage;
