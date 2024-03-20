import cn from 'classnames';
import { FormEvent, KeyboardEvent, useId, useRef, useState } from 'react';
import styles from './styles.module.scss';


export type TagsInputBaseProps = {
  hint?: string;
  label: string;
  onChange(value: string[]): void;
  value?: string[];
  separator?: string;
  allowDuplicates?: boolean;
  clearable?: boolean;
  data: string[];
};

export type TagsInputProps = React.InputHTMLAttributes<HTMLInputElement> & TagsInputBaseProps;

export const TagInput = ({
  hint,
  label,
  onChange,
  separator = ',',
  allowDuplicates = false,
  clearable = false,
  value,
  ...props
}: TagsInputProps) => {
  const [input, setInput] = useState('');
  const [values, setValues] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (values?.includes(input.trim()) && !allowDuplicates) return;
      const newValues = [...(values ?? []), input.trim()];
      setValues(newValues);
      setInput('');
      onChange(newValues);
    }
    if (e.key === 'Backspace' && !input) {
      e.preventDefault();
      const newValues = [...(values ?? [])];
      newValues.pop();
      setValues(newValues);
      onChange(newValues);
    }
  };

  const handleDeleteClick = (tag: string) => {
    const newValues = [...(values ?? []).filter((el) => el !== tag)];
    setValues(newValues);
    onChange(newValues);
  };

  const handleClear = () => {
    setInput('');
    setValues([]);
    onChange([]);
  };



  return (
    <div className="fr-input-group">
      <label className={cn("fr-label")} htmlFor={id}>
        {label}
        {hint && <span className={cn("fr-hint-text")}>{hint}</span>}
      </label>
      <div
        className={cn('fr-input', styles['taginput-wrapper'])}
        onClick={() => document.activeElement !== inputRef.current && inputRef?.current?.focus()}>
        <span className="fr-badge-group">
          {values?.map((tag) => (
            <span
              key={tag}
              className={cn('fr-badge fr-my-1v fr-badge--sm fr-badge--green-menthe')}
            >
              {tag}
              <button
                tabIndex={-1}
                aria-hidden="true"
                className={cn(styles["taginput-badge-close"], "fr-icon-close-line", "fr-icon--sm")}
                onClick={() => handleDeleteClick(tag)} />
            </span>
          ))}
        </span>
        <input
          ref={inputRef}
          id={id}
          type="text"
          className={styles["taginput-input"]}
          value={input}
          autoComplete='off'
          onChange={(event: FormEvent<HTMLInputElement>) => setInput((event?.target as HTMLTextAreaElement)?.value)}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => handleKeyDown(event)}
          {...props}
        />
        {clearable && <button tabIndex={-1} aria-hidden="true" className={cn(styles["taginput-close"], "fr-icon-close-line", "fr-icon--sm", "fr-ml-1w")} onClick={handleClear} />}
      </div>
      <input type="hidden" value={value.join(separator)} />
    </div>
  );
};