import { forwardRef } from 'react'
import cs, { Argument } from 'classnames';
import styles from './styles.module.scss';

type SeparatorProps = {
  children?: React.ReactNode;
  className?: Argument;
}

const Separator = forwardRef<HTMLSpanElement, SeparatorProps>(({ children, className = "" }, ref) => {
  return (
    <span ref={ref} className={cs(styles.separator, className)}>{children}</span>
  )
});

export default Separator;
