import { useEffect, useState } from 'react';
import { Icon } from '@dataesr/react-dsfr';
import cs from 'classnames';
import styles from './styles.module.scss';

export default function ScrollToTop({ className }) {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => ((window.pageYOffset > 600)
      ? setIsVisible(true)
      : setIsVisible(false)
    );

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;
  return (
    <span className={styles['scroll-top']}>

      <a
        className={cs("fr-link", className)}
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
        href="#top"
      >
        <Icon className="fr-pb-1v" size="1x" name="ri-arrow-up-fill" iconPosition="left" />
        Haut de page
      </a>
    </span>

  );
}
