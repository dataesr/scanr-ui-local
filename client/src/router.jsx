import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Layout from './layout';
import FAQ from './pages/faq';
import Team from './pages/team';
import Publication from './pages/publications/[id]';
import Author from './pages/authors/[id]';
import SearchLayout from './pages/search/layout';
import PublicationSearch from './pages/publications/search';
import AuthorsSearch from './pages/authors/search';
import { Container } from '@dataesr/react-dsfr';

function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);
}

export default function Router() {
  return (
    <>
      <ScrollToTopOnLocationChange />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/search/organizations" replace />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/team" element={<Team />} />
          <Route path="/publications/:id" element={<Publication />} />
          <Route path="/authors/:id" element={<Author />} />
          <Route path="/search" element={<SearchLayout />}>
            <Route path="" element={<Navigate to="/search/organizations" replace />} />
            <Route path="organizations" element={<Container className="fr-mt-5w">Organizations</Container>} />
            <Route path="authors" element={<AuthorsSearch />} />
            <Route path="projects" element={<Container className="fr-mt-5w">Projects</Container>} />
            <Route path="publications" element={<PublicationSearch />} />
            <Route path="patents" element={<Container className="fr-mt-5w">Patents</Container>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
