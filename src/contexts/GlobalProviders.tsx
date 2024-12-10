import { ModalProvider } from '@/contexts/ModalContext';
import { PropsWithChildren } from 'react';

function GlobalProviders({ children }: PropsWithChildren) {
  return <ModalProvider>{children}</ModalProvider>;
}

export default GlobalProviders;
