import Nav from '@/components/Nav';
import { ToastContainer } from '@/components/Toast';
import LoadingPage from '@/pages/LoadingPage';
import { useEffect } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';

import styles from './layout.module.scss';

function Layout() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    navigate('/home');
  }, []);

  return (
    <div className={styles.appWrapper}>
      <div className={styles.appContent}>
        <div className={styles.pageContent}>
          <ToastContainer />

          {/* Actual Page */}
          {isLoading ? <LoadingPage /> : <Outlet />}
        </div>
        <Nav />
      </div>
    </div>
  );
}

export default Layout;
