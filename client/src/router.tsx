import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Layout from "./layout";
import Home from "./pages/home";
import Search from "./pages/search";
import Publication from "./pages/publications/[id]";
import Author from "./pages/authors/[id]";
import Team from "./pages/about/team";
import FAQ from "./pages/about/faq";
import Error404 from "./components/errors/error-404";
import Organization from "./pages/organizations/[id]";
import Project from "./pages/projects/[id]";
import Networks from "./pages/networks";
import Suggest from "./pages/suggest";
import HEPartners from "./pages/trouver-des-partenaires-pour-horizon-europe";
import Resources from "./pages/about/resources";
import ResourcesInformations from "./pages/about/resources/[id]";
import Tutorial from "./pages/about/tutorial";

function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
  return null;
}

export default function Router() {
  return (
    <>
      <ScrollToTopOnLocationChange />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about/faq" element={<FAQ />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/resources" element={<Resources />} />
          <Route
            path="/about/resources/:id"
            element={<ResourcesInformations />}
          />
          <Route path="/about/tutorial" element={<Tutorial />} />
          <Route path="/publications/:id" element={<Publication />} />
          <Route path="/authors/:id" element={<Author />} />
          <Route path="/organizations/:id" element={<Organization />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/suggest/:id" element={<Suggest />} />
          <Route path="/search">
            {/* <Route path="" element={<Navigate to="/search/organizations" replace />} /> */}
            <Route path="organizations" element={<Search />} />
            <Route path="authors" element={<Search />} />
            <Route path="projects" element={<Search />} />
            <Route path="publications" element={<Search />} />
            <Route
              path="patents"
              element={<h1 className="fr-mt-5w">Patents</h1>}
            />
          </Route>
          <Route path="/networks" element={<Networks />} />
          <Route
            path="/trouver-des-partenaires-pour-horizon-europe/:id"
            element={<HEPartners />}
          />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
}
