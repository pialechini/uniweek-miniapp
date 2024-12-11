import router from '@/Router';
import GlobalProviders from '@/contexts/GlobalProviders';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <GlobalProviders>
      <RouterProvider router={router} />
    </GlobalProviders>
  );
}

export default App;
