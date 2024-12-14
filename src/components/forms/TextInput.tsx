import React, { forwardRef } from 'react';

import styles from './textInput.module.scss';

type Props = React.ComponentProps<'input'> & {
  className?: string;
};

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className={`${styles.textInput} ${className || ''}`}>
        <input ref={ref} {...props} />
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
