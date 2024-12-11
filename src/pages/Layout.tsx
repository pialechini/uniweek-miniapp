import Nav from '@/components/Nav';
import LoadingPage from '@/pages/LoadingPage';
import { Outlet, useNavigation } from 'react-router-dom';

import styles from './layout.module.scss';

function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className={styles.appWrapper}>
      <div className={styles.appContent}>
        {isLoading ? <LoadingPage /> : <Outlet />}
        <Nav />
      </div>
    </div>
  );
}

export default Layout;
