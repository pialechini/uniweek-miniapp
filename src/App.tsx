import GlobalStyles from '@/theme/GlobalStyles.tsx';
import Theme from '@/theme/Theme.tsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Theme>
      <GlobalStyles />
      <Outlet />
    </Theme>
  );
}

export default App;
