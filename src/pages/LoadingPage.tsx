import UniweekSvg from '@/components/logos/UniweekLogo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './loadingPage.module.scss';

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/home'), 2000);
  }, []);

  return (
    <div className={styles.bg}>
      <div className={styles.upBlur}></div>
      <div className={styles.downBlur}></div>
      <div className={styles.wrapper}>
        <UniweekSvg className={styles.logo} svgClassName={styles.svgDrawing}>
          <h1 className={styles.text}>Uniweek</h1>
        </UniweekSvg>
      </div>
    </div>
  );
}
export default LoadingPage;
