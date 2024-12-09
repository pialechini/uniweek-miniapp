import { useModalContext } from '@/contexts/ModalContext';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { motion } from 'motion/react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

function Modal() {
  const { isOpen, handleModal, modalContent } = useModalContext();

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.wrapper}>
        <div className={styles.rounded}>
          <motion.dialog
            className={styles.modal}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {modalContent}
          </motion.dialog>
        </div>

        <button className={styles.close} onClick={() => handleModal()}>
          <Icon path={mdiClose} size={'40px'} color={'#FFB700'} />
        </button>
      </div>
    </motion.div>,
    document.querySelector('#modal-root')!,
  );
}

export default Modal;
