import packageJson from '@/../package.json';
import UniweekSvg from '@/components/logos/UniweekLogo';

import styles from './loadingPage.module.scss';

function LoadingPage() {
  return (
    <div className={styles.bg}>
      <div className={styles.upBlur}></div>
      <div className={styles.downBlur}></div>

      <div className={styles.column}>
        <UniweekSvg size="280px" />
        <h1 className={styles.text}>Uniweek</h1>
        <span className={styles.version}>v{packageJson.version}</span>
      </div>
    </div>
  );
}
export default LoadingPage;
