import { forwardRef } from 'react'
import cs from 'classnames';
import styles from './styles.module.scss'

export default forwardRef(({ children, className = "" }, ref) => {
  if (!children) return <hr ref={ref} className={cs(className)} />
  return (
    <span ref={ref} className={cs(styles.separator, className)}>{children}</span>
  )
});
