import React, { useLayoutEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DSFRConfig } from '@dataesr/dsfr-plus';
import "./styles.scss";

import Router from './router';
import './styles/index.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

type RouterLinkProps = {
  href: string;
  replace?: boolean;
  target?: string;
  children?: ReactNode;
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
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Router />
        </QueryClientProvider>
      </DSFRConfig>
    </BrowserRouter>
  </React.StrictMode>,
);
