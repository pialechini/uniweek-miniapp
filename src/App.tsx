import Routes from '@/Routes';
import Providers from '@/contexts/Providers';
import Layout from '@/pages/Layout';

function App() {
  return (
    <Providers>
      <Layout>
        <Routes />
      </Layout>
    </Providers>
  );
}

export default App;
