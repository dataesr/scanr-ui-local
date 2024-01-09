import cn, { Argument } from "classnames";
import { forwardProps } from "../../utils/props";
import { getChildrenOfType } from "../../utils/children";
import { useId } from "react";
import { Merge } from "../../types/polymophic";
import { Toggle } from ".";

type ToggleGroupProps = Merge<React.HTMLAttributes<HTMLUListElement>, {
  className?: Argument;
}>;

export const ToggleGroup = ({ children, className, ...props }: ToggleGroupProps) => {
  const id = useId();
  return (
    <ul className={cn('fr-toggle__list', className)} {...forwardProps(props as React.HTMLAttributes<HTMLUListElement>)}>
      {getChildrenOfType(children, Toggle).map((child, index) => <li key={`${id}-${index}`}>{child}</li>)}
    </ul>
  );
}