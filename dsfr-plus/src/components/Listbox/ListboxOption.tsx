import { useRef } from "react";
import cn from 'classnames';
import { useOption, useFocusRing, mergeProps } from "react-aria";
import styles from './styles.module.scss';

export default function ListboxOption({ item, state }: { item: any, state: any }) {
  // Get props for the option element
  const ref = useRef(null);
  const { optionProps } = useOption({ key: item.key }, state, ref);

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      data-focus-visible={isFocusVisible}
      className={cn(
        styles['listbox-item'],
        {
          [styles[`listbox-item--${color}`]]: color,
          [styles.divider]: showDivider,
          "fr-enlarge-link": href,
          [styles['listbox-item--highlighted']]: highlighted,
        }
      )}
    >
      {item.rendered}
    </li>
  );
}