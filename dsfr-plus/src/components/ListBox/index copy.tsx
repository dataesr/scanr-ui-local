// import cn, { Argument } from "classnames";
// import styles from './styles.module.scss'
// import { cloneElement, isValidElement, useId, useMemo } from "react";
// import { ColorFamily, Link } from "../..";
// import useListbox, { ListboxOption } from "./useListbox";

// export type ListboxCss = {
//   base?: Argument;
//   list?: Argument;
// }
// export type ListboxSectionCss = {
//   base?: Argument;
//   list?: Argument;
//   title?: Argument;
// }

// export type ItemProps = ListboxOption

// export type ListboxItem = {
//   children?: React.ReactNode;
//   href?: string;
//   description?: React.ReactNode;
//   startContent?: React.ReactNode;
//   endContent?: React.ReactNode;
//   textValue?: string;
//   selected?: boolean;
//   highlighted?: boolean;
//   color?: ColorFamily;
//   showDivider?: boolean;
//   readonly onClick?: () => void;
//   readonly onMouseEnter?: () => void;
// } & React.HTMLAttributes<HTMLLIElement>;


// export type ListboxProps = {
//   className?: Argument;
//   css?: ListboxCss;
//   color?: ColorFamily;
//   items: ItemProps[];
//   topContent?: React.ReactNode;
//   bottomContent?: React.ReactNode;
//   onAction?: (selection: ItemProps) => void;
//   onSelectionChange?: (selection: ItemProps[]) => void;
//   multipleSelection?: boolean;
//   children: React.ReactNode | React.ReactNode[] | ((props: ItemProps) => React.ReactNode);
// };

// export type ListboxInnerProps = {
//   className?: Argument;
//   color?: ColorFamily;
//   css?: ListboxCss;
//   items: ItemProps[];
//   onAction?: (selection: ItemProps) => void;
//   onSelectionChange?: (selection: ItemProps[]) => void;
//   multipleSelection?: boolean;
//   children: React.ReactNode | React.ReactNode[] | ((props: ItemProps) => React.ReactNode);
// };
// export type ListboxSectionProps = {
//   className?: Argument;
//   css?: ListboxSectionCss;
//   items: ItemProps[];
//   title?: React.ReactNode;
//   showDivider?: boolean;
//   children: React.ReactNode | React.ReactNode[] | ((props: ItemProps) => React.ReactNode);
// };

// function ListboxInner({ items, color, css = {}, onAction, multipleSelection, onSelectionChange, children }: ListboxInnerProps) {
//   const { listboxProps, highlightedIndex, handleItemClick, handleItemHover, selectedOptions } = useListbox(items, onSelectionChange, multipleSelection)
//   const _list = useMemo(() => (typeof children === 'function')
//     ? items.map((item, i) => {
//       const listboxItem = children(item);
//       if (isValidElement<ListboxItem>(listboxItem)) {
//         return cloneElement(listboxItem, {
//           color,
//           ...item,
//           key: i,
//           highlighted: highlightedIndex === i,
//           selected: selectedOptions.includes(item),
//           onClick: () => {
//             onAction?.(item)
//             handleItemClick(item)
//           },
//           onMouseEnter: () => handleItemHover(item)
//         })
//       }
//     }) : children, [children, items, highlightedIndex, selectedOptions, color, onAction, handleItemClick, handleItemHover])

//   return (
//     <ul role="listbox" className={cn(css.list)} {...listboxProps}>
//       {_list}
//     </ul>
//   )
// }


// export function Listbox({
//   topContent,
//   bottomContent,
//   className,
//   color,
//   css = {},
//   ...rest
// }: ListboxProps) {


//   return (
//     <div tabIndex={-1} className={cn(styles.listbox, className, css.base, { [styles[`listbox--${color}`]]: color })}>
//       {topContent && topContent}
//       <ListboxInner {...rest} css={css} color={color} />
//       {bottomContent && bottomContent}
//     </div>
//   )
// }

// // export function ListboxSection({ children, title, items, className, css = {}, showDivider }: ListboxSectionProps) {
// //   return (
// //     <li role="presentation" tabIndex={-1} className={cn(styles['flexbox-section'], className, css.base, { [styles.divider]: showDivider })}>
// //       <span className={cn("fr-text-mention--grey fr-text--sm", 'fr-py-1w', css.title)}>
// //         {title}
// //       </span>
// //       <ul role="group" tabIndex={-1} className={cn(css.list)}>
// //         {(typeof children === 'function')
// //           ? items.map(item => children(item))
// //           : children
// //         }
// //       </ul>
// //     </li>
// //   )
// // }

// export const ListboxItem = ({
//   children,
//   description,
//   textValue,
//   startContent,
//   highlighted,
//   endContent,
//   selected,
//   color,
//   showDivider,
//   tabIndex,
//   onClick,
//   onMouseEnter,
//   href
// }: ListboxItem) => {
//   const describedById = useId();
//   const labeledById = useId();
//   const Component = href ? Link : 'span';

//   return (
//     <li
//       tabIndex={tabIndex || -1}
//       role="option"
//       aria-selected={selected}
//       aria-labelledby={labeledById}
//       aria-describedby={description ? describedById : undefined}
//       onClick={href ? undefined : onClick}
//       onMouseEnter={onMouseEnter}
//       className={cn(
//         styles['listbox-item'],
//         {
//           [styles[`listbox-item--${color}`]]: color,
//           [styles.divider]: showDivider,
//           "fr-enlarge-link": href,
//           [styles['listbox-item--highlighted']]: highlighted,
//         }
//       )}>
//       {startContent && startContent}
//       <span className={styles.content}>
//         <Component id={labeledById} href={href}>
//           {children || textValue}
//         </Component>
//         {description && <span id={describedById} className={styles.description}>{description}</span>}
//       </span>
//       {endContent && endContent}
//     </li>
//   );
// };