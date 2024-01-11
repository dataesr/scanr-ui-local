import { cloneElement, isValidElement, useId } from 'react';
import cn, { Argument } from 'classnames';
import { getChildrenOfType } from '../../utils/children';
import { TabProps, Tab } from './Tab';
import { Merge } from '../../types/polymophic';

type TabsCss = {
  ul?: Argument
  li?: Argument
  button?: Argument
}

export type TabsProps = Merge<React.HTMLAttributes<HTMLDivElement>, {
  children: React.ReactNode[] | React.ReactNode;
  className?: Argument;
  defaultActiveIndex?: number;
  css?: TabsCss;
  onTabChange?: (i: number) => void;
}>

export const Tabs = ({
  className,
  children,
  defaultActiveIndex = 0,
  css = {},
  onTabChange,
  ...props
}: TabsProps) => {
  const _id = useId();
  const id = props.id || _id;
  const tabsPanel = getChildrenOfType(children, Tab).filter((child) => isValidElement(child)).map(
    (child, index) => cloneElement(
      child as React.ReactElement<TabProps>,
      { index: `${id}-${index}` }
    )
  );

  return (
    <div
      id={id}
      className={cn('fr-tabs', className)}
      {...props}
    >
      <ul className={cn("fr-tabs__list", css.ul)} role="tablist">
        {tabsPanel.map((tab, index) => (
          <li key={`${id}-${index}`} className={cn(css.li)} role="presentation">
            <button
              onClick={(e) => {
                if (onTabChange) {
                  onTabChange(index);
                  e.preventDefault();
                }
              }}
              id={`${id}-${index}-button`}
              className={cn(
                "fr-tabs__tab",
                {
                  [`fr-icon-${tab.props.icon}`]: (isValidElement(tab) && tab.props.icon),
                  'fr-tabs__tab--icon-left': (isValidElement(tab) && tab.props.icon)
                },
                css.button
              )}
              tabIndex={(defaultActiveIndex === index) ? 0 : -1}
              role="tab"
              aria-selected={(defaultActiveIndex === index) ? "true" : "false"}
              aria-controls={`${id}-${index}-panel`}
            >
              {isValidElement(tab) && tab.props.label}
            </button>
          </li>
        ))}
      </ul>
      {tabsPanel}
    </div>
  );
};