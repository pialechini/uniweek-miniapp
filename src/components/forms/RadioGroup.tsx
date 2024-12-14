import classNames from 'classnames';
import { ReactNode, useState } from 'react';

import styles from './radioGroup.module.scss';

type SingleChoiceProps = {
  multipleChoice?: false;
  intialSelectedItemIndex?: number;
  onChange: (selectedIndex: number) => void;
};

type MultipleChoiceProps = {
  multipleChoice: true;
  intialSelectedItemIndex?: number[];
  onChange: (selectedIndices: number[]) => void;
};

type Props = {
  items: ReactNode[];
  className?: string;
} & (SingleChoiceProps | MultipleChoiceProps);

type RadioItemProps = {
  selected: boolean;
  content: ReactNode;
  onClick: () => void;
};

function RadioItem({ content, selected, onClick }: RadioItemProps) {
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={classNames(styles.circle, selected && styles.filled)} />
      <div className={styles.weekday}>{content}</div>
    </div>
  );
}

function RadioGroup(props: Props) {
  const { items, className, multipleChoice, onChange } = props;

  const initialSelection =
    multipleChoice && Array.isArray(props.intialSelectedItemIndex)
      ? props.intialSelectedItemIndex
      : !multipleChoice && typeof props.intialSelectedItemIndex === 'number'
        ? [props.intialSelectedItemIndex]
        : [];

  const [selectedItems, setSelectedItems] =
    useState<number[]>(initialSelection);

  const handleClickOnItem = (index: number) => {
    if (multipleChoice) {
      const newSelectedItems = selectedItems.includes(index)
        ? selectedItems.filter((i) => i !== index) // Remove if already selected
        : [...selectedItems, index]; // Add if not selected

      setSelectedItems(newSelectedItems);
      onChange(newSelectedItems);
    } else {
      setSelectedItems([index]);
      onChange(index);
    }
  };

  return (
    <div className={classNames(styles.radioGroup, className)}>
      {items.map((item, i) => (
        <RadioItem
          key={i}
          selected={selectedItems.includes(i)}
          content={item}
          onClick={() => handleClickOnItem(i)}
        />
      ))}
    </div>
  );
}

export default RadioGroup;
