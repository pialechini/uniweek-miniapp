import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode, useState } from 'react';

import styles from './dropdown.module.scss';

type Props = {
  header: ReactNode;
  children?: ReactNode | ((close: () => void) => ReactNode);
  className?: string;
};

function Dropdown({ className, header, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={classNames(styles.dropdown, className)}>
      {/* Header */}
      <div className={styles.header} onClick={toggle}>
        {header}
        <span className={styles.arrow}>
          {isOpen ? (
            <Icon
              className={classNames(styles.collapseIcon, styles.icon)}
              path={mdiChevronUp}
              size={'24px'}
              color="#F8BB5A"
            />
          ) : (
            <Icon
              className={styles.icon}
              path={mdiChevronDown}
              size={'24px'}
              color="#F8BB5A"
            />
          )}
        </span>
      </div>

      {/* Inline Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.options}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeIn' }}
          >
            {typeof children === 'function' ? children(close) : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
