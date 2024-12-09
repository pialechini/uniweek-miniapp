import { Weekday } from '@/types';

import styles from './daySelectModal.module.scss';

type WeekdayProps = { name: Weekday };

function Weekday({ name }: WeekdayProps) {
  return (
    <div>
      <div className={styles.circle} />
      <div className={styles.weekday}>{name}</div>
    </div>
  );
}

function DaySelectModal() {
  return (
    <div>
      <h1 className={styles.title}>روز هفته را مشخص کنید</h1>
    </div>
  );
}

export default DaySelectModal;
