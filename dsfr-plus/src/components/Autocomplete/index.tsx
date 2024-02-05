// import { useState, useId, forwardRef, RefObject } from 'react';
// import cn, { Argument } from 'classnames';
// import { Merge } from '../../types/polymophic';
// import styles from './styles.module.scss';
// import { createPortal } from 'react-dom';
// import mergeRefs from '../../utils/refs';
// import { Listbox, ListboxItem } from '../ListBox';

// import { usePopover } from "./usePopover"
// import { ItemProps } from '../ListBox/index copy';

// type AutocompleteCss = {
//   'fr-label'?: Argument;
//   'fr-hint-text'?: Argument;
//   'fr-input'?: Argument;
//   'fr-input-wrap'?: Argument;
// }

// type AutocompleteBaseItemsProps = {
//   startContent?: React.ReactNode;
//   endContent?: React.ReactNode;
// }

// export type AutocompleteBaseProps = {
//   className?: Argument;
//   css?: AutocompleteCss;
//   message?: React.ReactNode;
//   messageType?: 'error' | 'valid' | '' | null;
//   label?: React.ReactNode;
//   hint?: React.ReactNode;
//   icon?: string;
//   items: ItemProps[];
//   onInputChange?: (value: string | number) => void;
//   onValueChange?: (value: (string | number)[]) => void;
//   isLoading?: boolean;
//   children: (props: AutocompleteItemsProps) => React.ReactNode;
// };

// export type AutocompleteProps = Merge<React.InputHTMLAttributes<HTMLInputElement>, AutocompleteBaseProps>;
// export type AutocompleteItemsProps = Merge<React.HTMLAttributes<HTMLSpanElement>, AutocompleteBaseItemsProps & ItemProps>;

// const items3 = [
//   { label: 'David', value: 'David' },
//   { label: 'Sam', value: 'Sam' },
//   { label: 'Jane', value: 'Jane' },
//   { label: 'Aardvark', value: 'Aardvark' },
//   { label: 'Kangaroo', value: 'Kangaroo' },
//   { label: 'Snake', value: 'Snake' }
// ]


// export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(({
//   className,
//   css = {},
//   hint,
//   icon,
//   id,
//   label,
//   message,
//   messageType,
//   onInputChange,
//   onValueChange,
//   onBlur,
//   disabled,
//   required,
//   isLoading,
//   items,
//   children,
//   ...props
// }, ref) => {
//   const { open, close, trigger, content } = usePopover<HTMLInputElement, HTMLDivElement>(false);
//   const { ref: triggerRef, ...triggerRest } = trigger;
//   const [inputValue, setInputValue] = useState<string>("");
//   const inputId = useId();
//   const _icon = icon
//     ? icon
//     : open
//       ? 'arrow-up-s-line'
//       : 'arrow-down-s-line';


//   const inputClass = cn('fr-input', css['fr-input']);
//   const inputGroupClass = cn('fr-input-group', { 'fr-input-group--disabled': disabled }, className);

//   return (
//     <div className={inputGroupClass}>
//       <label className={cn("fr-label", css['fr-label'])} htmlFor={inputId}>
//         {label}
//         {hint && <span className={cn("fr-hint-text", css['fr-hint-text'])}>{hint}</span>}
//       </label>
//       <div className={cn('fr-input-wrap', `fr-icon-${_icon}`, css['fr-input-wrap'])}>
//         <input
//           autoComplete='off'
//           type="text"
//           role="combobox"
//           className={inputClass}
//           onChange={(e) => setInputValue(e.target.value)}
//           ref={(node) => mergeRefs(node, [ref, triggerRef])}
//           aria-describedby={`${inputId}-message`}
//           value={inputValue}
//           {...props}
//           {...triggerRest}
//         />
//       </div>
//       {open && createPortal((
//         <div {...content}>
//           <Listbox
//             color="blue-ecume"
//             items={items3}
//             css={{ list: styles.listbox }}
//             onSelectionChange={(value) => {
//               onValueChange?.(value);
//               // TODO not working properly
//               (triggerRef as RefObject<HTMLInputElement>)?.current?.focus();
//               close();
//             }}
//           >
//             {(item: any) => (
//               <ListboxItem
//                 startContent={<span className="fr-icon-building-line" />}
//                 endContent={<span className="fr-icon-arrow-right-line" />}
//                 description={item.value}
//               >
//                 {item.value}
//               </ListboxItem>
//             )}
//           </Listbox>
//         </div>
//       ), document.body)}
//     </div>
//   );
// });

// // const items2 = [
// //   {
// //     name: 'People',
// //     items: [
// //       { name: 'David' },
// //       { name: 'Sam' },
// //       { name: 'Jane' }
// //     ]
// //   },
// //   {
// //     name: 'Animals',
// //     items: [
// //       { name: 'Aardvark' },
// //       { name: 'Kangaroo' },
// //       { name: 'Snake' }
// //     ]
// //   }
// // ]


// // export const Autocomplete = () => {
// //   const [open, trigger, content] = usePopover<HTMLButtonElement, HTMLDivElement>(true)
// //   return (
// //     <div>
// //       <button {...trigger}>Trigger</button>
// //       {open && createPortal((
// //         <div {...content}>
// //           <Listbox color="blue-ecume" items={items3}>
// //             {(item: any) => (
// //               <ListboxItem
// //                 key={item.name}
// //                 startContent={<span className="fr-icon-building-line" />}
// //                 endContent={<span className="fr-icon-arrow-right-line" />}
// //                 description={item.name}
// //               >
// //                 {item.name}
// //               </ListboxItem>
// //             )}
// //           </Listbox>
// //         </div>
// //       ), document.body)}
// //     </div >
// //   )
// // }
