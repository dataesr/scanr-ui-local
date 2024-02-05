import cn, { Argument } from "classnames";
import styles from './styles.module.scss'
import { useId } from "react";
import { ColorFamily, Link } from "../..";
import useListbox from "./useListbox";
import { ListboxItemProps } from "./types";

export type ListboxCss = {
  base?: Argument;
  list?: Argument;
}
export type ListboxSectionCss = {
  base?: Argument;
  list?: Argument;
  title?: Argument;
}

export type ListboxProps = {
  className?: Argument;
  css?: ListboxCss;
  color?: ColorFamily;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
  selectionMode?: "none" | "single" | "multiple";
  onSelectionChange?(value: (string | number)[]): void;
  onAction?(value: string | number): void;
};


export function Listbox({
  topContent,
  bottomContent,
  className,
  color,
  css = {},
  onAction,
  selectionMode = "none",
  onSelectionChange,
  children,
  ...props
}: ListboxProps) {
  const { listboxProps, items } = useListbox({ children, onSelectionChange, selectionMode, onAction, color })


  return (
    <div tabIndex={-1} className={cn(styles.listbox, className, css.base)}>
      <span className={styles["listbox-top"]}>
        {topContent && topContent}
      </span>
      <ul role="listbox" className={cn(styles["listbox-content"], css.list)} {...props} {...listboxProps}>
        {items.map((item) => <ListboxItem {...item} />)}
      </ul>
      <span className={styles["listbox-bottom"]}>
        {bottomContent && bottomContent}
      </span>
    </div>
  )
}

// export function ListboxSection({ children, title, items, className, css = {}, showDivider }: ListboxSectionProps) {
//   return (
//     <li role="presentation" tabIndex={-1} className={cn(styles['flexbox-section'], className, css.base, { [styles.divider]: showDivider })}>
//       <span className={cn("fr-text-mention--grey fr-text--sm", 'fr-py-1w', css.title)}>
//         {title}
//       </span>
//       <ul role="group" tabIndex={-1} className={cn(css.list)}>
//         {(typeof children === 'function')
//           ? items.map(item => children(item))
//           : children
//         }
//       </ul>
//     </li>
//   )
// }

export const ListboxItem = ({
  children,
  description,
  textValue,
  startContent,
  highlighted,
  endContent,
  selected,
  color,
  showDivider,
  tabIndex,
  onClick,
  onMouseEnter,
  href
}: ListboxItemProps) => {
  const describedById = useId();
  const labeledById = useId();
  const Component = href ? Link : 'span';

  return (
    <li
      tabIndex={tabIndex === 0 ? 0 : -1}
      role="option"
      aria-selected={selected}
      aria-labelledby={labeledById}
      aria-describedby={description ? describedById : undefined}
      onClick={href ? undefined : onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        styles['listbox-item'],
        {
          [styles[`listbox-item--${color}`]]: color,
          [styles.divider]: showDivider,
          "fr-enlarge-link": href,
          [styles['listbox-item--highlighted']]: highlighted,
        }
      )}>
      {startContent && startContent}
      <span className={styles.content}>
        <Component tabIndex={-1} id={labeledById} href={href}>
          {children || textValue}
        </Component>
        {description && <span id={describedById} className={styles.description}>{description}</span>}
      </span>
      {endContent && endContent}
    </li>
  );
};