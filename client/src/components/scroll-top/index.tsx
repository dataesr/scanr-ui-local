import { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

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
    <a
      className={classnames("fr-link", styles['scroll-top'])}
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      href="#top"
    >
      <span className="fr-pb-1v fr-icon-arrow-up-fill" />
      Haut de page
    </a>
  );
}
