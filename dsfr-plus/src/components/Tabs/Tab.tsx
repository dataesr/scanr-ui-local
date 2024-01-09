import cn, { Argument } from 'classnames';
import { Merge } from '../../types/polymophic';

export type TabProps = Merge<React.HTMLAttributes<HTMLDivElement>, {
  className?: Argument;
  index: string;
  icon?: string;
  label?: string;
}>

export const Tab = ({
  className,
  index,
  ...props
}: TabProps) => (
  <div
    id={`${index}-panel`}
    className={cn("fr-tabs__panel", className)}
    role="tabpanel"
    aria-labelledby={`${index}-button`}
    tabIndex={0}
    {...props}
  />
);