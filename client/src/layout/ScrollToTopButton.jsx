import { useEffect, useState } from 'react';
import { Button, Icon } from '@dataesr/react-dsfr';
import classnames from 'classnames';
import styles from './scroll-top.module.scss';

export default function ScrollToTop() {
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
    // <Button
    //   className={styles['scroll-top']}
    //   title="Revenir en haut de la page"
    //   size="lg"
    //   rounded
    //   icon="ri-arrow-up-line"
    //   onClick={scrollToTop}
    // />
    <a
      className={classnames("fr-link", styles['scroll-top'])}
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      href="#top"
    >
      <Icon className="fr-pb-1v" size="1x" name="ri-arrow-up-fill" iconPosition="left" />
      Haut de page
    </a>

  );
}
