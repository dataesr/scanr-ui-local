import cn, { Argument } from "classnames";
import { Merge } from "../../types/polymophic";

interface OperatorCss {
  "fr-responsive-img"?: Argument;
}

export type OperatorBaseProps = {
  className?: Argument;
  css?: OperatorCss;
}

export type OperatorProps = Merge<React.HTMLAttributes<HTMLImageElement>, OperatorBaseProps>;

export const Operator = ({ className, css = {}, ...props }: OperatorProps) => {
  return (
    <div className={cn("fr-header__operator", className)}>
      <img className={cn("fr-responsive-img", css["fr-responsive-img"])} {...props} />
    </div>
  )
}