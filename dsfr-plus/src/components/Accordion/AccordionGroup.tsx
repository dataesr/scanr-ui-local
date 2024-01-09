import { Fragment, useId } from "react";
import { getChildrenOfType } from "../../utils/children";
import cn, { Argument } from "classnames";
import { Accordion } from "./Accordion";
import { Merge } from "../../types/polymophic";

type AccordionGroupBaseProps = {
  className?: Argument;
}

export type AccordionGroupProps = Merge<React.HTMLAttributes<HTMLDivElement>, AccordionGroupBaseProps>;

export const AccordionGroup = ({ children, className, ...props }: AccordionGroupProps) => {
  const id = useId()
  return (
    <div className={cn("fr-accordions-group", className)} {...props}>
      {getChildrenOfType(children, Accordion).map((child, index) => <Fragment key={`${id}-d${index}`}>{child}</Fragment>)}
    </div>
  )
}