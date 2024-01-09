import cn, { Argument } from "classnames";
import { forwardRef, useId } from "react";
import { useDSFRConfig } from "../../hooks/useDSFRConfig";
import { Merge } from "../../types/polymophic";

type FileUploadCss = {
  label?: Argument;
  input?: Argument;
  errorParagraph?: Argument;
}

type FileUploadBaseProps = {
  className?: Argument;
  css?: FileUploadCss;
  errorMessage?: React.ReactNode;
  hint?: React.ReactNode;
  label?: React.ReactNode;
}

export type FileUploadProps = Merge<React.InputHTMLAttributes<HTMLInputElement>, FileUploadBaseProps>;

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(({
  id,
  className,
  css = {},
  errorMessage,
  hint,
  label = "Ajouter des fichiers",
  ...props
}, ref) => {
  const _id = useId();
  const fileUploadId = id || _id;
  const { extendOptionalFieldsLabelsWith, extendRequiredFieldsLabelsWith } = useDSFRConfig();
  return (
    <div className={cn('fr-upload-group', { 'fr-input-group--error': errorMessage, 'fr-input-group--disabled': props.disabled }, className)}>
      <label className={cn("fr-label", css.label)} htmlFor={fileUploadId}>
        {label}
        {props.required ? extendRequiredFieldsLabelsWith : extendOptionalFieldsLabelsWith}
        {hint && <span className="fr-hint-text">{hint}</span>}
      </label>
      <input
        ref={ref}
        id={fileUploadId}
        className={cn("fr-upload", css.input)}
        type="file"
        aria-describedby={errorMessage ? `${fileUploadId}-message` : undefined}
        {...props}
      />
      {errorMessage && (
        <p id={`${fileUploadId}-message`} className={cn("fr-error-text", css.errorParagraph)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
});