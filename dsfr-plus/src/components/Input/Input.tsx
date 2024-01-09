import { useState, useRef, useId, forwardRef } from 'react';
import cn, { Argument } from 'classnames';
import mergeRefs from '../../utils/refs';
import { useDSFRConfig } from '../../hooks/useDSFRConfig';
import { Merge } from '../../types/polymophic';

type TextInputCss = {
  'fr-label'?: Argument;
  'fr-hint-text'?: Argument;
  'fr-input'?: Argument;
  'fr-input-wrap'?: Argument;
}

export type TextInputBaseProps = {
  className?: Argument;
  css?: TextInputCss;
  disableAutoValidation: boolean;
  message?: React.ReactNode;
  messageType?: 'error' | 'valid' | '' | null;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  icon?: string;
};

export type TextInputProps = Merge<React.InputHTMLAttributes<HTMLInputElement>, TextInputBaseProps>;
export type TextAreaProps = Merge<React.TextareaHTMLAttributes<HTMLTextAreaElement>, TextInputBaseProps>;


export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  className,
  css = {},
  disableAutoValidation = false,
  hint,
  icon,
  id,
  label,
  message,
  messageType,
  onBlur,
  onChange,
  disabled,
  required,
  ...props
}, ref) => {
  const { extendRequiredFieldsLabelsWith, extendOptionalFieldsLabelsWith } = useDSFRConfig();
  const [inputState, setInputState] = useState('');
  const inputId = id || useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const isInputStateControlled = message !== undefined || messageType !== undefined;

  const inputClass = cn('fr-input', {
    'fr-input--error': isInputStateControlled ? messageType === 'error' : inputState === 'error',
    'fr-input--valid': isInputStateControlled ? messageType === 'valid' : inputState === 'valid',
  }, css['fr-input']);
  const inputGroupClass = cn('fr-input-group', {
    'fr-input-group--error': isInputStateControlled ? messageType === 'error' : inputState === 'error',
    'fr-input-group--valid': isInputStateControlled ? messageType === 'valid' : inputState === 'valid',
    'fr-input-group--disabled': disabled,
  }, className);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputElement = inputRef.current;
    if (!disableAutoValidation && !isInputStateControlled && inputElement) {
      setInputState(inputElement.checkValidity() ? 'valid' : 'error');
    }
    if (onBlur) onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = inputRef.current;
    if (!disableAutoValidation && !isInputStateControlled && inputElement && inputState) {
      setInputState(inputElement.checkValidity() ? 'valid' : 'error');
    }
    if (onChange) onChange(e);
  };

  const stateMessage = (isInputStateControlled || disableAutoValidation)
    ? (messageType && (<p className={`fr-${messageType || 'error'}-text`} id={`${inputId}-message`}>{message}</p>))
    : ((inputState === 'error' && !disableAutoValidation) && (<p className={`fr-${inputState || 'error'}-text`} id={`${inputId}-message`}>{inputRef.current?.validationMessage}</p>))


  return (
    <div className={inputGroupClass}>
      <label className={cn("fr-label", css['fr-label'])} htmlFor={inputId}>
        {label}
        {required ? extendRequiredFieldsLabelsWith : extendOptionalFieldsLabelsWith}
        {hint && <span className={cn("fr-hint-text", css['fr-hint-text'])}>{hint}</span>}
      </label>
      <div className={cn('fr-input-wrap', { [`fr-icon-${icon}`]: icon }, css['fr-input-wrap'])}>
        <input
          id={inputId}
          className={inputClass}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={(node) => mergeRefs(node, [ref, inputRef])}
          aria-describedby={stateMessage ? `${inputId}-message` : undefined}
          {...props}
        />
      </div>
      {stateMessage && stateMessage}
    </div>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  className,
  css = {},
  disableAutoValidation = false,
  hint,
  icon,
  id,
  label,
  message,
  messageType,
  onBlur,
  onChange,
  disabled,
  required,
  ...props
}, ref) => {
  const { extendRequiredFieldsLabelsWith, extendOptionalFieldsLabelsWith } = useDSFRConfig();
  const [inputState, setInputState] = useState('');
  const inputId = id || useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isInputStateControlled = message !== undefined || messageType !== undefined;

  const inputClass = cn('fr-input', {
    'fr-input--error': isInputStateControlled ? messageType === 'error' : inputState === 'error',
    'fr-input--valid': isInputStateControlled ? messageType === 'valid' : inputState === 'valid',
  }, css['fr-input']);
  const inputGroupClass = cn('fr-input-group', {
    'fr-input-group--error': isInputStateControlled ? messageType === 'error' : inputState === 'error',
    'fr-input-group--valid': isInputStateControlled ? messageType === 'valid' : inputState === 'valid',
    'fr-input-group--disabled': disabled,
  }, className);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const inputElement = inputRef.current;
    if (!disableAutoValidation && !isInputStateControlled && inputElement) {
      setInputState(inputElement.checkValidity() ? 'valid' : 'error');
    }
    if (onBlur) onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputElement = inputRef.current;
    if (!disableAutoValidation && !isInputStateControlled && inputElement && inputState) {
      setInputState(inputElement.checkValidity() ? 'valid' : 'error');
    }
    if (onChange) onChange(e);
  };

  const stateMessage = (isInputStateControlled || disableAutoValidation)
    ? (messageType && (<p className={`fr-${messageType || 'error'}-text`} id={`${inputId}-message`}>{message}</p>))
    : ((inputState === 'error' && !disableAutoValidation) && (<p className={`fr-${inputState || 'error'}-text`} id={`${inputId}-message`}>{inputRef.current?.validationMessage}</p>))


  return (
    <div className={inputGroupClass}>
      <label className={cn("fr-label", css['fr-label'])} htmlFor={inputId}>
        {label}
        {required ? extendRequiredFieldsLabelsWith : extendOptionalFieldsLabelsWith}
        {hint && <span className={cn("fr-hint-text", css['fr-hint-text'])}>{hint}</span>}
      </label>
      <div className={cn('fr-input-wrap', { [`fr-icon-${icon}`]: icon }, css['fr-input-wrap'])}>
        <textarea
          id={inputId}
          className={inputClass}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={(node) => mergeRefs(node, [ref, inputRef])}
          aria-describedby={stateMessage ? `${inputId}-message` : undefined}
          {...props}
        />
      </div>
      {stateMessage && stateMessage}
    </div>
  );
});
