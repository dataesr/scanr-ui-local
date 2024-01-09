import { forwardRef, useId, useRef } from 'react';
import cn, { Argument } from 'classnames';
import { forwardProps } from '../../utils/props';
import mergeRefs from '../../utils/refs';
import { Merge } from '../../types/polymophic';

type SearchBarCss = {
  "fr-label"?: Argument;
  "fr-btn"?: Argument;
  "fr-input"?: Argument;
}
export type SearchBarBaseProps = {
  buttonLabel?: string;
  className?: Argument;
  css?: SearchBarCss;
  label?: string;
  onSearch: (text?: string) => void;
  isLarge?: boolean;
  id?: string;
}

export type SearchBarProps = Merge<React.HTMLAttributes<HTMLInputElement>, SearchBarBaseProps>;

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({
  className,
  css = {},
  buttonLabel,
  isLarge,
  label,
  onSearch,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const _id = useId()
  const id = props.id || _id;
  const onKeyDown = (e: React.KeyboardEvent) => (e.key === 'Enter') && onSearch(inputRef.current?.value);
  return (
    <div
      role="search"
      className={cn('fr-search-bar', { 'fr-search-bar--lg': isLarge }, className)}
    >
      {label && <label className={cn("fr-label", css["fr-label"])} htmlFor={id}>{label}</label>}
      <input
        ref={(node) => mergeRefs(node, [ref, inputRef])}
        className={cn("fr-input", css["fr-input"])}
        type="search"
        id={id}
        onKeyDown={onKeyDown}
        {...forwardProps(props as React.HTMLAttributes<HTMLInputElement>)}
      />
      <button
        type="button"
        onClick={() => onSearch(inputRef.current?.value)}
        className={cn('fr-btn', { 'fr-btn--lg': isLarge }, css['fr-btn'])}
        title={buttonLabel}
      >
        {buttonLabel}
      </button>
    </div>
  );
});


