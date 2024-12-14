import Select from '@/components/forms/Select';
import { weekdays } from '@/helpers';
import type { Weekday as WeekdayType } from '@/types';
import { useState } from 'react';

import styles from './daySelectModal.module.scss';

type Props = {
  initialSelectedDay: WeekdayType;
  onClose: (selectedDay: WeekdayType) => void;
};

function DaySelectModal({ initialSelectedDay, onClose }: Props) {
  const [selectedDay, setSelectedDay] =
    useState<WeekdayType>(initialSelectedDay);

  return (
    <div>
      <p className={styles.title}>روز هفته را مشخص کنید</p>

      <Select
        items={weekdays}
        intialSelectedItemIndex={weekdays.indexOf(initialSelectedDay)}
        onChange={(selectedItemIndex) =>
          setSelectedDay(weekdays[selectedItemIndex])
        }
      />

      <div className={styles.submitWrapper}>
        <button className={styles.submit} onClick={() => onClose(selectedDay)}>
          ثبت
        </button>
      </div>
    </div>
  );
}

export default DaySelectModal;
