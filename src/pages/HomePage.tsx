import Card from '@/components/Card';
import DaySelect from '@/components/DaySelect';
import DaySelectModal from '@/components/DaySelectModal';
import HeroSection from '@/components/HeroSection';
import { useModalContext } from '@/contexts/ModalContext';

import styles from './homePage.module.scss';

function HomePage() {
  const { handleModal } = useModalContext();

  return (
    <div className={styles.homePage}>
      <HeroSection date={new Date()} evenOdd="زوج" percentage={12} />
      <DaySelect
        className={styles.day}
        day="شنبه"
        onClick={() => handleModal(<DaySelectModal />)}
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
