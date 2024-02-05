import { useEffect, useId } from 'react';
import PropTypes from 'prop-types';
import styles from './spinner.module.scss';



export function Spinner({ size }: { size: number }) {
  const id = useId();
  useEffect(() => {
    document?.getElementById(id)?.style.setProperty('width', `${size}px`);
    document?.getElementById(id)?.style.setProperty('height', `${size}px`);
  }, [size, id]);

  return (
    <svg id={id} className={styles.spinner} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle className="internal-circle" cx="60" cy="60" r="30" />
      <circle className="external-circle" cx="60" cy="60" r="50" />
    </svg>
  );
}
Spinner.propTypes = {
  size: PropTypes.number,
};
Spinner.defaultProps = {
  size: 48,
};