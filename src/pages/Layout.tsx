import Nav from '@/components/Nav';
import { PropsWithChildren } from 'react';

import styles from './layout.module.scss';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.appContent}>
        {children}
        <Nav />
      </div>
    </div>
  );
}

export default Layout;
