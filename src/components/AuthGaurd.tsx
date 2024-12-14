import { useAuthContext } from '@/contexts/AuthContext';
import { PropsWithChildren } from 'react';

function AuthGaurd({ children }: PropsWithChildren) {
  const { loggedIn } = useAuthContext();

  return loggedIn ? children : null;
}

export default AuthGaurd;
