// import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// export type ListboxOption = {
//   value: string;
//   label: string;
//   [key: string]: any;
// };

// type UseListboxResult = {
//   selectedOptions: ListboxOption[];
//   highlightedIndex: number;
//   handleItemClick: (option: ListboxOption) => void;
//   handleItemHover: (option: ListboxOption) => void;
//   listboxProps: React.HTMLProps<HTMLUListElement>;
// };

// const useListbox = (options: ListboxOption[], onSelectionChange?: (selection: ListboxOption[]) => void, multipleSelection = false): UseListboxResult => {
//   const [selectedOptions, setSelectedOptions] = useState<ListboxOption[]>([]);
//   const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
//   const listboxRef = useRef<HTMLUListElement>(null);
//   // const [hasFocus, setHasFocus] = useState<boolean>(false);

//   const handleKeyDown = useCallback((event: KeyboardEvent) => {
//     // if (!hasFocus) return;
//     if (event.key === 'ArrowUp') {
//       event.preventDefault();
//       setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : options.length - 1));
//     } else if (event.key === 'ArrowDown') {
//       event.preventDefault();
//       setHighlightedIndex((prevIndex) => (prevIndex < options.length - 1 ? prevIndex + 1 : 0));
//     } else if (event.key === 'Home') {
//       event.preventDefault();
//       setHighlightedIndex(0);
//     } else if (event.key === 'End') {
//       event.preventDefault();
//       setHighlightedIndex(options.length - 1);
//     } else if (['Enter', 'Space'].includes(event.key)) {
//       event.preventDefault();
//       if (highlightedIndex !== -1) {
//         const selectedOption = options[highlightedIndex];
//         handleItemClick(selectedOption);
//       }
//     }
//   }, [highlightedIndex, options]);

//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown);
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [highlightedIndex, options]);

//   const handleItemClick = useCallback((option: ListboxOption) => {
//     let newSelectedOptions: ListboxOption[] = [];
//     if (multipleSelection) {
//       if (selectedOptions.includes(option)) {
//         newSelectedOptions = selectedOptions.filter((o) => o !== option);
//       } else {
//         newSelectedOptions = [...selectedOptions, option];
//       }
//     } else {
//       if (selectedOptions.includes(option)) {
//         newSelectedOptions = [];
//       } else {
//         newSelectedOptions = [option];
//       }
//     }
//     setSelectedOptions(newSelectedOptions);
//     if (onSelectionChange) {
//       onSelectionChange(newSelectedOptions);
//     }
//   }, [selectedOptions, multipleSelection]);

//   const handleItemHover = useCallback((option: ListboxOption) => {
//     setHighlightedIndex(options.map(opt => opt.value).indexOf(option.value));
//     }, []);

//   const listboxProps: React.HTMLProps<HTMLUListElement> = {
//     ref: listboxRef,
//     role: 'listbox',
//     tabIndex: -1,
//     'aria-activedescendant': highlightedIndex !== -1 ? options[highlightedIndex].value : undefined
//   };

//   const value = useMemo(() => {
//     return {
//       selectedOptions,
//       highlightedIndex,
//       handleItemClick,
//       handleItemHover,
//       listboxProps,
//     };
//   }, [selectedOptions, highlightedIndex, handleItemClick, handleItemHover, listboxProps]);


//   return value;
// };

// export default useListbox;
