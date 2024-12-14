import Modal from '@/components/Modal';
import { PropsWithChildren, ReactNode, createContext, useContext } from 'react';
import { useState } from 'react';

type ModalContextValue = {
  isOpen: boolean;
  handleModal: (content?: ReactNode) => void;
  modalContent: ReactNode;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

function ModalProvider({ children }: PropsWithChildren) {
  const [isOpen, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>();

  const handleModal = (content?: ReactNode) => {
    if (!content) {
      setOpen(false);
      return;
    }

    setOpen(true);
    setModalContent(content);
  };

  return (
    <ModalContext.Provider value={{ isOpen, handleModal, modalContent }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
}

function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Usage of ModalContext outside of its provider.');
  }

  return context;
}

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Usage of ModalContext outside of its provider.');
  }

  return context.handleModal;
}

export { ModalProvider, useModalContext, useModal };
