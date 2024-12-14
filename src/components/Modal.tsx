import { useModalContext } from '@/contexts/ModalContext';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useClickOutside, useKeyDown } from '@react-hooks-library/core';
import { AnimatePresence, motion } from 'motion/react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

function Modal() {
  const { isOpen, handleModal, modalContent } = useModalContext();
  const modalEl = useRef<HTMLDialogElement | null>(null);

  /** Add support for quick modal close when clicking outside
   * or pressing the ESC key.
   * It also handles clicking close button on the top right
   * as it is outside of the modalElement technically. */
  useClickOutside(modalEl, () => {
    handleModal();
  });

  useKeyDown(['Escape'], () => {
    handleModal();
  });

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
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
                ref={modalEl}
              >
                {modalContent}
              </motion.dialog>
            </div>

            <button className={styles.close}>
              <Icon path={mdiClose} size={'40px'} color={'#FFB700'} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.querySelector('#modal-root')!,
  );
}

export default Modal;
