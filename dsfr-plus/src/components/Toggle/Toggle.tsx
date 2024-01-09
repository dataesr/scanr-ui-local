import { forwardRef, useId } from 'react';
import cn, { Argument } from 'classnames';
import { forwardProps } from '../../utils/props';
import { Merge } from '../../types/polymophic';

type ToggleCss = {
  "fr-toggle__input"?: Argument;
  "fr-toggle__label"?: Argument;
  "fr-hint-text"?: Argument;
}

export type ToggleProps = Merge<React.InputHTMLAttributes<HTMLInputElement>, {
  className?: Argument;
  css?: ToggleCss;
  hasSeparator?: string;
  hasLabelLeft?: string;
  label?: string;
  id?: string;
  hint?: string;
}>;

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({
  className,
  css = {},
  hasSeparator,
  hasLabelLeft,
  label,
  hint,
  ...props
}, ref) => {
  const _id = useId();
  const id = props.id || _id;
  const _className = cn('fr-toggle', {
    'fr-toggle--border-bottom': hasSeparator,
    'fr-toggle--label-left': hasLabelLeft,
  }, className);

  return (
    <div
      className={_className}
    >
      <input
        ref={ref}
        type="checkbox"
        className={cn("fr-toggle__input", css["fr-toggle__input"])}
        id={id}
        {...forwardProps(props as React.InputHTMLAttributes<HTMLInputElement>, { exclude: ['type'] })}
      />
      <label
        className={cn("fr-toggle__label", css["fr-toggle__label"])}
        htmlFor={id}
        data-fr-checked-label="Activé"
        data-fr-unchecked-label="Désactivé"
      >
        {label}
      </label>
      {(hint) && <p className={cn("fr-hint-text", css["fr-hint-text"])}>{hint}</p>}
    </div>
  );
});