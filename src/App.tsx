import Providers from '@/contexts/Providers';
import AssignPage from '@/pages/AssignPage';
import HomePage from '@/pages/HomePage';
import Layout from '@/pages/Layout';
import LoadingPage from '@/pages/LoadingPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Providers>
      <Layout>
        <Routes>
          <Route path="/" element={<LoadingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/assign/:token/" element={<AssignPage />} />
        </Routes>
      </Layout>
    </Providers>
  );
}

export default App;
