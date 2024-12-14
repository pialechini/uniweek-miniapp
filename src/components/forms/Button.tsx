import { type HTMLMotionProps, motion } from 'motion/react';
import { PropsWithChildren, forwardRef } from 'react';

import styles from './button.module.scss';

type ButtonProps = PropsWithChildren<HTMLMotionProps<'button'>>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <motion.button
        ref={ref}
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
        type="button"
        className={styles.button}
        {...rest}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
