import classNames from 'classnames';
import { ReactNode, useState } from 'react';

import styles from './radioGroup.module.scss';

type RadioItemProps = {
  selected: boolean;
  content: ReactNode;
  onSelect: () => void;
};

type Props = {
  items: ReactNode[];
  intialSelectedItemIndex: number;
  className?: string;
  onChange: (selectedItemIndex: number) => void;
};

function RadioItem({ content, selected, onSelect }: RadioItemProps) {
  return (
    <div className={styles.item} onClick={onSelect}>
      <div className={classNames(styles.circle, selected && styles.filled)} />
      <div className={styles.weekday}>{content}</div>
    </div>
  );
}

function RadioGroup({
  className,
  items,
  intialSelectedItemIndex,
  onChange,
}: Props) {
  const [selectedItem, setSelectedItem] = useState(intialSelectedItemIndex);

  return (
    <div className={classNames(styles.radioGroup, className)}>
      {items.map((item, i) => (
        <RadioItem
          key={i}
          selected={selectedItem === i}
          content={item}
          onSelect={() => {
            setSelectedItem(i);
            onChange(i);
          }}
        />
      ))}
    </div>
  );
}

export default RadioGroup;
