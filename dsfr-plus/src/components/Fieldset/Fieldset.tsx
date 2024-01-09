import cn, { Argument } from 'classnames';
import { forwardProps } from '../../utils/props';
import { Children, forwardRef, useId } from 'react';
import { useDSFRConfig } from '../../hooks/useDSFRConfig';
import { Merge } from '../../types/polymophic';

interface FieldsetCss {
  legend?: Argument;
  legendHint?: Argument;
  element?: Argument;
  messageDiv?: Argument;
  messageP?: Argument;
}

type FieldsetBaseProps = {
  className?: Argument;
  css?: FieldsetCss;
  hint?: React.ReactNode;
  isInline?: boolean;
  legend?: React.ReactNode;
  message?: React.ReactNode;
  messageType?: 'valid' | 'error';
  required?: boolean;
}

export type FieldsetProps = Merge<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, FieldsetBaseProps>;

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(({
  children,
  className,
  css = {},
  hint,
  isInline = false,
  legend,
  message,
  messageType,
  required,
  ...props
}, ref) => {
  const id = useId();
  const { extendRequiredFieldsLabelsWith, extendOptionalFieldsLabelsWith } = useDSFRConfig();

  return (
    <fieldset
      ref={ref}
      className={cn('fr-fieldset', { [`fr-fieldset--${messageType}`]: messageType }, className)}
      {...forwardProps(props as React.HTMLAttributes<HTMLFieldSetElement>)}
      aria-labelledby={(message && messageType) ? `${id}-message` : undefined}
    >
      {legend && (
        <legend className={cn("fr-fieldset__legend fr-text--regular", css.legend)}>
          {legend}
          {required ? extendRequiredFieldsLabelsWith : extendOptionalFieldsLabelsWith}
          {hint && <span className={cn("fr-hint-text", css.legendHint)}>{hint}</span>}
        </legend>
      )}
      {Children.toArray(children).map((child, i) => (
        <div key={`${id}-${i}`} className={cn('fr-fieldset__element', { 'fr-fieldset__element--inline': isInline }, css.element)}>
          {child}
        </div>
      ))}
      {(message && messageType) && (
        <div id={`${id}-message`} className={cn("fr-messages-group", css.messageDiv)}>
          <p className={cn(`fr-message fr-message--${messageType}`, css.messageP)}>
            {message}
          </p>
        </div>)}
    </fieldset>
  );
});