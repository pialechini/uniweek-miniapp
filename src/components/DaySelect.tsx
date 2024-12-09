import { Weekday } from '@/types';
import { mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';

import styles from './daySelect.module.scss';

type Props = {
  day: Weekday;
  className?: string;
  onClick: () => void;
};

function DaySelect({ day, className, onClick }: Props) {
  return (
    <div className={classNames(styles.daySelect, className)} onClick={onClick}>
      <span className={styles.day}>{day}</span>
      <Icon
        className={styles.icon}
        color={'#FFB700'}
        path={mdiPencil}
        size={'24px'}
      />
    </div>
  );
}

export default DaySelect;
