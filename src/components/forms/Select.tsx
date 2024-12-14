import classNames from 'classnames';
import { ReactNode, useState } from 'react';

import styles from './select.module.scss';

type ItemProps = {
  selected: boolean;
  content: ReactNode;
  onSelect: () => void;
};

type Props = {
  items: ReactNode[];
  intialSelectedItemIndex: number;
  onChange: (selectedItemIndex: number) => void;
};

function Item({ content, selected, onSelect }: ItemProps) {
  return (
    <div className={styles.select} onClick={onSelect}>
      <div className={styles.item}>
        <div className={classNames(styles.circle, selected && styles.filled)} />
      </div>
      <div className={styles.weekday}>{content}</div>
    </div>
  );
}

function Select({ items, intialSelectedItemIndex, onChange }: Props) {
  const [selectedItem, setSelectedItem] = useState(intialSelectedItemIndex);

  return (
    <div className={styles.itemsWrapper}>
      {items.map((item, i) => (
        <Item
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

export default Select;
