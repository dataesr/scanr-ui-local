import cn, { Argument } from "classnames";
import { forwardRef, isValidElement, useCallback, useId, useRef, useState } from "react";
import useMutationObservable from "./useMutationObserver";
import { HeadingTags } from "../../types/headings";
import mergeRefs from "../../utils/refs";
import { Merge } from "../../types/polymophic";

export type AccordionCss = {
  title?: Argument;
  button?: Argument;
}

export type AccordionBaseProps = {
  title: React.ReactNode | ((expended: boolean) => React.ReactNode);
  titleAs?: HeadingTags;
  className?: Argument;
  css?: AccordionCss
  defaultExpanded?: boolean;
}

export type AccordionProps = Merge<React.HTMLAttributes<HTMLButtonElement>, AccordionBaseProps>;

export const Accordion = forwardRef<HTMLButtonElement, AccordionProps>(({
  title,
  titleAs: TitleAs = 'h3',
  children,
  className,
  css = {},
  defaultExpanded = false,
  ...props
}, ref) => {
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(!!defaultExpanded);

  const onButtonMutation = useCallback(
    (mutationList: MutationRecord[]) => {
      const mutation: MutationRecord | undefined = mutationList.find((record: MutationRecord) => record.attributeName === 'aria-expanded');
      if (mutation && buttonRef?.current?.attributes) {
        const ariaExpanded = buttonRef.current.attributes.getNamedItem('aria-expanded');
        setExpanded(ariaExpanded ? ariaExpanded.value === "true" : false);
      }
    },
    [buttonRef]
  );

  useMutationObservable(buttonRef?.current, onButtonMutation);

  return (
    <section className={cn("fr-accordion", className)}>
      <TitleAs
        className={cn("fr-accordion__title", css.title)}
      >
        <button
          {...props}
          ref={(node) => mergeRefs(node, [ref, buttonRef])}
          className={cn("fr-accordion__btn", css.button)}
          aria-expanded={defaultExpanded}
          aria-controls={id}
        >
          {(isValidElement(title) || typeof title === 'string')
            ? title
            : (typeof title === 'function')
              ? title(expanded)
              : null}
        </button>
      </TitleAs>
      <div className="fr-collapse" id={id}>
        {children}
      </div>
    </section>
  )
});