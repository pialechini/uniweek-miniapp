import type { Weekday as WeekdayType } from '@/types';
import classNames from 'classnames';
import { useState } from 'react';

import styles from './daySelectModal.module.scss';

type WeekdayProps = {
  name: WeekdayType;
  filled?: boolean;
  onClick: () => void;
};

type DaySelectModalProps = {
  initialSelectedDay: WeekdayType;
  onClose: (selectedDay: WeekdayType) => void;
};

function Weekday({ name, filled, onClick }: WeekdayProps) {
  return (
    <div className={styles.weekday} onClick={onClick}>
      <div className={styles.rounded}>
        <div className={classNames(styles.circle, filled && styles.filled)} />
      </div>
      <div className={styles.weekday}>{name}</div>
    </div>
  );
}

function DaySelectModal({ initialSelectedDay, onClose }: DaySelectModalProps) {
  const weekdays: WeekdayType[] = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه‌شنبه',
    'چهارشنبه',
    'پنجشنبه',
    'جمعه',
  ];

  const [selectedDay, setSelectedDay] =
    useState<WeekdayType>(initialSelectedDay);

  return (
    <div>
      <p className={styles.title}>روز هفته را مشخص کنید</p>

      <div className={styles.weekdaysWrapper}>
        {weekdays.map((weekday) => (
          <Weekday
            key={weekday}
            name={weekday}
            filled={selectedDay === weekday}
            onClick={() => setSelectedDay(weekday)}
          />
        ))}
      </div>

      <div className={styles.submitWrapper}>
        <button className={styles.submit} onClick={() => onClose(selectedDay)}>
          ثبت
        </button>
      </div>
    </div>
  );
}

export default DaySelectModal;
