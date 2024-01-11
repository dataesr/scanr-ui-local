import cn, { Argument } from "classnames";
import { useRef } from "react";
import { ColorType } from "../../types";
import { Merge } from "../../types/polymophic";

interface NoticeCss {
  "fr-container"?: Argument;
  "fr-notice__body"?: Argument;
  "fr-notice__title"?: Argument;
  "fr-btn--close"?: Argument;
}

export type NoticeBaseProps = {
  closeMode: "disallow" | "uncontrolled" | "controlled";
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: string | React.ReactNode[] | React.ReactNode;
  className?: Argument;
  css?: NoticeCss;
  type: ColorType;
}

export type NoticeProps = Merge<React.HTMLAttributes<HTMLDivElement>, NoticeBaseProps>;

export const Notice = ({
  children,
  closeMode = 'disallow',
  type = 'info',
  className,
  css = {},
  onClose,
  ...props
}: NoticeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = (e: any) => {
    e.preventDefault();
    ref.current?.remove();
    if (onClose) onClose(e);
  }
  const _cn = cn('fr-notice', {
    "fr-notice--info": type === 'info',
    [`react-dsfr-notice--${type}`]: type !== 'info',
  }, className)
  return (
    <div ref={ref} className={_cn} {...props}>
      <div className={cn("fr-container", css["fr-container"])}>
        <div className={cn("fr-notice__body", css["fr-notice__body"])}>
          <p className={cn("fr-notice__title", css["fr-notice__title"])}>{children}</p>
          {closeMode !== "disallow" && (<button
            onClick={(closeMode === "uncontrolled") ? handleClose : onClose}
            className={cn("fr-btn--close", "fr-btn", css["fr-btn--close"])}
          >
            Masquer le message
          </button>)}
        </div>
      </div>
    </div>
  )
}