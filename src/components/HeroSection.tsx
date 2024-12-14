import CircularProgressBar from '@/components/chart/circularProgressBar';
import BooksIcon from '@/components/icons/BooksIcon';
import ManLogo from '@/components/logos/ManLogo';
import { formatPersianDate } from '@/helpers/date';
import { replaceWithPersianNumbers } from '@/helpers/numbers';

import styles from './heroSection.module.scss';

type Props = {
  date: Date;
  evenOdd: string;
  percentage: number;
};

function HeroSection({ date, evenOdd, percentage }: Props) {
  return (
    <div className={styles.heroSection}>
      <BooksIcon className={styles.books} />
      <h1 className={styles.day}>{formatPersianDate(date)}</h1>
      <h1 className={styles.evenOdd}>{evenOdd}</h1>
      <ManLogo className={styles.man} />
      <CircularProgressBar
        containerClassName={styles.progressBar}
        value={percentage}
        text={replaceWithPersianNumbers(`${percentage}٪`)}
      />
    </div>
  );
}

export default HeroSection;
