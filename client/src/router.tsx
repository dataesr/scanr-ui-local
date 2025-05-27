import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom"

import Layout from "./layout"
import Home from "./pages/home"
import Search from "./pages/search"
import Publication from "./pages/publications/[id]"
import Author from "./pages/authors/[id]"
import Team from "./pages/about/team"
import FAQ from "./pages/about/faq"
import Error404 from "./components/errors/error-404"
import Organization from "./pages/organizations/[id]"
import Patents from "./pages/patents/[id]"
import Project from "./pages/projects/[id]"
import Networks from "./pages/networks"
import Suggest from "./pages/suggest"
import HEPartners from "./pages/search/he"
import Resources from "./pages/about/resources"
import ResourcesInformations from "./pages/about/resources/[id]"
import Tutorial from "./pages/about/tutorial"
// import Glossary from "./pages/about/glossary";
import ContactPage from "./pages/about/contact"
import BugsReport from "./pages/bugs/[api]/[id]"
import PublicationIdParser from "./components/publication-id-parser"
import ScanrPublicationsDocs from "./pages/docs/objects/publications"
import { DocsLayout } from "./pages/docs/layout"
import ProjectsDocs from "./pages/docs/objects/projects"
import LegalNotices from "./pages/about/legal-notices"
import Accessibility from "./pages/about/accessibility"
import OrganizationsDocs from "./pages/docs/objects/organizations"
import PersonsDocs from "./pages/docs/objects/persons"
import Overview from "./pages/docs/objects/overview"
import NetworksIntegration from "./pages/networks/integration"
import Trends from "./pages/trends"
import NetworksGetStarted from "./pages/networks/components/get-started"
import TrendsIntegration from "./pages/trends/integration"
import Studio from "./pages/studio"

function ScrollToTopOnLocationChange() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
  }, [pathname])
  return null
}

export default function Router() {
  return (
    <>
      <ScrollToTopOnLocationChange />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:local_id">
            <Route path="" element={<Home />} />
            <Route path="docs" element={<DocsLayout />}>
              <Route path="objects/projects" element={<ProjectsDocs />} />
              <Route path="objects/publications" element={<ScanrPublicationsDocs />} />
              <Route path="objects/organizations" element={<OrganizationsDocs />} />
              <Route path="objects/persons" element={<PersonsDocs />} />
              <Route path="quick-start" element={<div>QuickStart</div>} />
              <Route path="overview" element={<Overview />} />
            </Route>
            <Route path="about">
              <Route path="legal-notices" element={<LegalNotices />} />
              <Route path="accessibility" element={<Accessibility />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="team" element={<Team />} />
              <Route path="resources" element={<Resources />} />
              <Route path="resources/:id" element={<ResourcesInformations />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="tutorials" element={<Tutorial />} />
            </Route>
            <Route path="bugs/:api/:id" element={<BugsReport />} />
            <Route path="publications/:id" element={<Publication />} />
            <Route path="publication/:id" element={<PublicationIdParser />} />
            <Route path="authors/:id" element={<Author />} />
            <Route path="person/:id" element={<Author />} />
            <Route path="organizations/:id" element={<Organization />} />
            <Route path="entite/:id" element={<Organization />} />
            <Route path="projects/:id" element={<Project />} />
            <Route path="project/:id" element={<Project />} />
            <Route path="patents/:id" element={<Patents />} />
            <Route path="suggest/:id" element={<Suggest />} />
            <Route path="search">
              <Route path="organizations" element={<Search />} />
              <Route path="authors" element={<Search />} />
              <Route path="projects" element={<Search />} />
              <Route path="publications" element={<Search />} />
              <Route path="patents" element={<Search />} />
            </Route>
            <Route path="networks" element={<Networks />} />
            <Route path="networks/get-started" element={<NetworksGetStarted />} />
            <Route path="trends" element={<Trends />} />
            <Route path="studio" element={<Studio />} />
            <Route path="trouver-des-partenaires-pour-horizon-europe/:id" element={<HEPartners />} />
            <Route path="*" element={<Error404 error={null} />} />
          </Route>
        </Route>
        <Route path="/:local_id/networks/integration" element={<NetworksIntegration />} />
        <Route path="/:local_id/trends/integration" element={<TrendsIntegration />} />
      </Routes>
    </>
  )
}
