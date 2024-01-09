import React, { ReactNode, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './router.js'
import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import { DSFRConfig } from '@dataesr/react-dsfr';
import '@gouvfr/dsfr/dist/utility/utility.css';
import '@gouvfr/dsfr/dist/dsfr.css';
import '@gouvfr/dsfr/dist/dsfr/dsfr.module.min.js';

type RouterLinkProps = {
  href: string;
  replace?: boolean;
  target?: string;
  children?: React.ReactNode;
}

const RouterLink = ({ href, replace, target, ...props }: RouterLinkProps) => {
  if (target === "_blank") return <a href={href} target={target} {...props} />
  return <Link to={href} replace={replace} {...props} />
}

const ScrollToTop = (): ReactNode => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <DSFRConfig routerComponent={RouterLink}>
        <Routes />
      </DSFRConfig>
    </BrowserRouter>
  </React.StrictMode>,
)
