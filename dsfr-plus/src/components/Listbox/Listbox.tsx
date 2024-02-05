import cn from 'classnames';
import type { AriaListBoxProps } from 'react-aria';
import { useListState } from 'react-stately';
import { useListBox } from 'react-aria';
import { useRef } from 'react';
import ListBoxSection from './ListboxSection';
import ListboxOption from './ListboxOption';
import styles from './styles.module.scss'
import { Argument } from 'classnames';
import { ColorFamily } from '../../types/colors';

export type ListboxCss = {
  base?: Argument;
  list?: Argument;
}
export type ListboxItem = {
  id: string | number;
  label: string;
  description?: string;
}
export type ListboxSection = {
  id: string | number;
  label: string;
  items: ListboxItem[];
}

export type ListboxProps = {
  className?: Argument;
  css?: ListboxCss;
  color?: ColorFamily;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  items?: ListboxItem[] | ListboxSection[];
}



export default function Listbox<T extends object>(props: AriaListBoxProps<T> & ListboxProps) {
  const { topContent, bottomContent, className, css = {}, ...rest } = props;
  // Create state based on the incoming props
  const state = useListState(rest);

  // Get props for the listbox element
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxProps } = useListBox(props, state, ref);

  return (
    <div tabIndex={-1} className={cn(styles.listbox, className, css.base)}>
      <span className={styles["listbox-top"]}>
        {topContent && topContent}
      </span>
      <ul role="listbox" className={cn(styles["listbox-content"], css.list)} {...listBoxProps} ref={ref}>
        {[...state.collection].map((item) => (
          item.type === 'section'
            ? <ListBoxSection key={item.key} section={item} state={state} />
            : <ListboxOption key={item.key} item={item} state={state} />
        ))}
      </ul>
      <span className={styles["listbox-bottom"]}>
        {bottomContent && bottomContent}
      </span>
    </div>
  );
}