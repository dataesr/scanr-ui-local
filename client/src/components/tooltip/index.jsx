import { useId } from 'react';
import cs from classNames;
import styles from './styles.module.scss'

export default function Tooltip({ children, text, className }) {
  const id = useId();
  return (
    <div id={id} className={cs(styles.tooltip, className)}>
      {children}
      <span className={cs(styles.tooltiptext, className)}>{text}</span>
    </div>
  );
}

