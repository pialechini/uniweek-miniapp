import Routes from '@/Routes';
import GlobalProviders from '@/contexts/GlobalProviders';
import Layout from '@/pages/Layout';

function App() {
  return (
    <GlobalProviders>
      <Layout>
        <Routes />
      </Layout>
    </GlobalProviders>
  );
}

export default App;
