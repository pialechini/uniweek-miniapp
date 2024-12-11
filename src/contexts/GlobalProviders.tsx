import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import { PropsWithChildren } from 'react';

function GlobalProviders({ children }: PropsWithChildren) {
  return (
    <ModalProvider>
      <AuthProvider>{children}</AuthProvider>
    </ModalProvider>
  );
}

export default GlobalProviders;
