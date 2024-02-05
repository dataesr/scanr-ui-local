import React, { useState, useEffect, useRef, useCallback, useMemo, useId } from 'react';
import { ColorFamily } from '../../types/colors';
import { ListboxItemProps } from './types';


type UseListboxResult = {
  items: ListboxItemProps[];
  listboxProps: React.HTMLProps<HTMLUListElement>;
};
type UseListboxProps = {
  children: React.ReactNode | React.ReactNode[];
  selectionMode: "none" | "single" | "multiple";
  onSelectionChange?(value: ListboxItemProps["value"][]): void;
  onAction?(value: string | number): void;
  color?: ColorFamily;
};

const useListbox = ({children, onSelectionChange, selectionMode, onAction, color}: UseListboxProps): UseListboxResult => {
  const id = useId();
  const [selectedOptions, setSelectedOptions] = useState<ListboxItemProps["value"][]>([]);
  const [highlightedValue, setHighlightedValue] = useState<number>(-1);
  const listboxRef = useRef<HTMLUListElement>(null);
  
  const items = React.Children.map(children, (child, i) => {
    const { value, label, ...rest } = (child as React.ReactElement).props;
    const tabIndex = highlightedValue !== -1 ? (highlightedValue === i ? 0 : -1) : (i === 0 ? 0 : -1);
    console.log("tabIndex", tabIndex);
    return {
      id: `listbox-item-${id}-${i}`,
      key: value,
      value,
      label,
      color,
      tabIndex,
      highlighted: highlightedValue === i,
      selected: (selectionMode !== "none") && !!selectedOptions.includes(value),
      onMouseEnter: () => handleItemHover(value),
      ...rest,
      onClick: () => {
        rest.onAction?.(value)
        onAction?.(value)
        handleItemClick(value)
      },
    };
  }) as ListboxItemProps[];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedValue((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedValue((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setHighlightedValue(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setHighlightedValue(items.length - 1);
    } else if (['Enter', 'Space'].includes(event.key)) {
      event.preventDefault();
      if (highlightedValue !== -1) {
        const selectedOption = items[highlightedValue];
        handleItemClick(selectedOption.value);
      }
    }
  }, [highlightedValue, items]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [highlightedValue, items]);

  const handleItemClick = useCallback((value: ListboxItemProps["value"]) => {
    let newSelectedOptions: ListboxItemProps["value"][] = [];
    if (selectionMode === "multiple") {
      if (selectedOptions.includes(value)) {
        newSelectedOptions = selectedOptions.filter((o) => o !== value);
      } else {
        newSelectedOptions = [...selectedOptions, value];
      }
    } else if (selectionMode === "single") {
      if (selectedOptions.includes(value)) {
        newSelectedOptions = [];
      } else {
        newSelectedOptions = [value];
      }
    }
    setSelectedOptions(newSelectedOptions);
    if (onSelectionChange) {
      onSelectionChange(newSelectedOptions);
    }
  }, [selectedOptions, selectionMode]);

  const handleItemHover = useCallback((value: ListboxItemProps["value"]) => {
    setHighlightedValue(items.map(item => item.value).indexOf(value));
    }, []);

  const handleMouseLeave = useCallback(() => {    
    setHighlightedValue(-1);
    }, []);

  const listboxProps: React.HTMLProps<HTMLUListElement> = {
    id: `listbox-${id}`,
    ref: listboxRef,
    role: 'listbox',
    tabIndex: -1,
    "aria-multiselectable": selectionMode === "multiple" ? true : undefined,
    'aria-activedescendant': highlightedValue !== -1 ? `listbox-item-${id}-${highlightedValue}` : undefined,
    onMouseLeave: handleMouseLeave,
  };


  const value = useMemo(() => ({ items, listboxProps }),
    [items, listboxProps]
  );

  return value;
};

export default useListbox;
