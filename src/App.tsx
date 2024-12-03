import { useGet } from '@/hooks/useApi';
import { useEffect } from 'react';

function App() {
  const [health, fetch] = useGet('/health');

  useEffect(() => {
    fetch();
  }, []);

  return <div>{JSON.stringify(health)}</div>;
}

export default App;
