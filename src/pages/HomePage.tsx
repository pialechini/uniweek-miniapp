import Card from '@/components/Card';
import DaySelect from '@/components/DaySelect';
import DaySelectModal from '@/components/DaySelectModal';
import HeroSection from '@/components/HeroSection';
import { useModal } from '@/contexts/ModalContext';
import { replaceWithPersianNumbers } from '@/helpers';
import {
  getStartOfTerm,
  getWeekParity,
  parseTime,
  toWeekday,
  weekdayIndex,
} from '@/helpers/date';
import type { DaySchedule, WeekSchedule, Weekday } from '@/types';
import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import styles from './homePage.module.scss';

type Props = {
  today: Date;
};

function calculatePassedPercentage(
  now: Date,
  selectedWeekday: Weekday,
  daySchedule: DaySchedule,
) {
  const totalSessions = daySchedule.length;

  // Check if selectedWeekday is earlier in the week than today
  const todayIndex = weekdayIndex(toWeekday(now));
  const selectedIndex = weekdayIndex(selectedWeekday);
  if (selectedIndex < todayIndex) {
    return 100;
  }

  if (totalSessions === 0) {
    return 100;
  }

  const passedSessions = daySchedule.filter(({ time }) => {
    const [, endTime] = parseTime(time);
    return now > new Date(`${now.toDateString()} ${endTime}`);
  }).length;

  return (passedSessions / totalSessions) * 100;
}

function HomePage({ today }: Props) {
  const handleModal = useModal();
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>(
    toWeekday(today),
  );

  const fetchedWeekSchedule = useLoaderData() as WeekSchedule;

  const weekParity = getWeekParity(today, getStartOfTerm());

  const todaySchedule = useMemo(() => {
    const thisWeekSchedule =
      weekParity === 'even'
        ? fetchedWeekSchedule.even_weeks_schedule
        : fetchedWeekSchedule.odd_weeks_schedule;

    return thisWeekSchedule[weekdayIndex(selectedWeekday)];
  }, [fetchedWeekSchedule, selectedWeekday]);

  return (
    <div className={styles.homePage}>
      <HeroSection
        date={today}
        evenOdd={weekParity === 'even' ? 'زوج' : 'فرد'}
        percentage={calculatePassedPercentage(
          today,
          selectedWeekday,
          todaySchedule,
        )}
      />

      <DaySelect
        className={styles.day}
        selectedDay={selectedWeekday}
        onClick={() =>
          handleModal(
            <DaySelectModal
              initialSelectedDay={selectedWeekday}
              onClose={(selectedDay) => {
                setSelectedWeekday(selectedDay);
                handleModal();
              }}
            />,
          )
        }
      />

      {todaySchedule && todaySchedule.length !== 0 ? (
        <div className={styles.grid}>
          {todaySchedule.map((session) => (
            <Card
              key={session.time}
              className={styles.card}
              klass={session.klass}
              location={session.location}
              time={replaceWithPersianNumbers(session.time)}
            />
          ))}
          <div style={{ height: '10rem' }} />
          <div style={{ height: '10rem' }} />
        </div>
      ) : (
        <div className={styles.noKlass}>کلاس نداری : )</div>
      )}
    </div>
  );
}

export default HomePage;
