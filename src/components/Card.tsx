import classNames from 'classnames';

import styles from './card.module.scss';

interface Props {
  klass: string;
  location: string;
  time: string;
  className?: string;
}

function Card({ klass, location, time, className }: Props) {
  return (
    <div className={classNames(styles.card, className)}>
      <p className={styles.klass}>{klass}</p>
      <p className={styles.location}>{location}</p>
      <span className={styles.time}>{time}</span>
    </div>
  );
}

export default Card;
