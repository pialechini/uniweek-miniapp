import UniweekSvg from '@/components/logos/UniweekLogo';

import styles from './loadingPage.module.scss';

function LoadingPage() {
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
