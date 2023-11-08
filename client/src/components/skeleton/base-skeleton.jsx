import styles from './styles.module.scss';
import cs from 'classnames';

export default function BaseSkeleton({ height = '2rem', width = '100%', borderRadius = "4px", className = '' }) {
  return (
    <div style={{ height, width, borderRadius }} className={cs(styles.skeleton, className)} />
  )
}