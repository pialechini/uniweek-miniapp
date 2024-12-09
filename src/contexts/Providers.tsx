import { ModalProvider } from '@/contexts/ModalContext';
import { PropsWithChildren } from 'react';

function Providers({ children }: PropsWithChildren) {
  return <ModalProvider>{children}</ModalProvider>;
}

export default Providers;
