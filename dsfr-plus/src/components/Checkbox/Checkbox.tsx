import { forwardRef, useId } from 'react';
import cn, { Argument } from 'classnames';
import { Merge } from '../../types/polymophic';

type CheckboxCss = {
  label?: Argument;
  labelHint?: Argument;
  input?: Argument;
}

type CheckboxBaseProps = {
  className?: Argument;
  css?: CheckboxCss;
  hint?: string;
  id?: string;
  label?: string;
  size?: 'sm' | 'md';
}

export type CheckboxProps = Merge<React.InputHTMLAttributes<HTMLInputElement>, CheckboxBaseProps>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  css = {},
  hint,
  id,
  label,
  size,
  ...props
}, ref) => {
  const _id = useId();
  const checkboxId = id || _id;
  return (
    <div className={cn('fr-checkbox-group', { 'fr-checkbox-group--sm': (size === 'sm') }, className)}>
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        className={cn(css.input)}
        {...props}
      />
      <label className={cn("fr-label", css.label)} htmlFor={checkboxId}>
        {label}
        {hint && <span className={cn("fr-hint-text", css.labelHint)}>{hint}</span>}
      </label>
    </div>
  );
});