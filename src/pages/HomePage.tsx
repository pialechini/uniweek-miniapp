import Card from '@/components/Card';
import DaySelect from '@/components/DaySelect';
import DaySelectModal from '@/components/DaySelectModal';
import HeroSection from '@/components/HeroSection';
import { useModal } from '@/contexts/ModalContext';
import { toWeekday } from '@/helpers/date';
import type { WeekSchedule, Weekday } from '@/types';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import styles from './homePage.module.scss';

type Props = {
  today: Date;
};

function HomePage({ today }: Props) {
  const handleModal = useModal();
  const [weekday, setWeekday] = useState<Weekday>(toWeekday(today));

  const weekSchedule = useLoaderData() as WeekSchedule;

  return (
    <div className={styles.homePage}>
      <HeroSection date={new Date()} evenOdd="زوج" percentage={12} />

      <DaySelect
        className={styles.day}
        selectedDay={weekday}
        onClick={() =>
          handleModal(
            <DaySelectModal
              initialSelectedDay={weekday}
              onClose={(selectedDay) => {
                setWeekday(selectedDay);
                handleModal();
              }}
            />,
          )
        }
      />

      <div className={styles.grid}>
        <Card
          className={styles.card}
          klass="سیستم های اطلاعات مدیریت و فناوری"
          location="کلاس 2 کامپیوتر"
          time="8-10"
        />
        <Card
          className={styles.card}
          klass="سیگنال ها و سیستم ها"
          location="آز مدار منطقی و معماری دانشکده کامپیوتر"
          time="8-10"
        />
        <Card
          className={styles.card}
          klass="زبان تخصصی"
          location="کلاس 6"
          time="8-10"
        />
        <Card
          className={styles.card}
          klass="سیستم های اطلاعات مدیریت و فناوری"
          location="کلاس 2 کامپیوتر"
          time="8-10"
        />
        <Card
          className={styles.card}
          klass="سیگنال ها و سیستم ها"
          location="آز مدار منطقی و معماری دانشکده کامپیوتر"
          time="8-10"
        />
        <Card
          className={styles.card}
          klass="زبان تخصصی"
          location="کلاس 6"
          time="8-10"
        />
        <div style={{ height: '10rem' }} />
        <div style={{ height: '10rem' }} />
      </div>
    </div>
  );
}

export default HomePage;
