import { useLocation, useSearchParams, Outlet } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row, SearchBar } from "@dataesr/react-dsfr";
import { IntlProvider } from "react-intl";

const apiMapping = {
  publications: ['publications', 'Rechercher des publications'],
  authors: ['authors', 'Rechercher des auteurs'],
  projects: ['projects', 'Rechercher des financements'],
  patents: ['patents', 'Rechercher des brevets'],
  organizations: ['organizations', 'Rechercher des structures'],
}

export default function SearchLayout() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || "";
  const api = pathname.split('/')?.[2];
  const [apiPath, apiLabel] = apiMapping[api] || [];


  return (
    <IntlProvider messages={{}} locale="fr" defaultLocale="fr">
      <Container className="bg-grey" fluid>
        <Container>
          <Breadcrumb className="fr-pt-2w fr-mt-0 fr-mb-2w">
            <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
            <BreadcrumbItem href={`/search/${apiPath}`}>{apiLabel}</BreadcrumbItem>
          </Breadcrumb>
          <Row>
            <Col n="12 lg-10">
              <SearchBar
                className="fr-mb-2w"
                size="lg"
                buttonLabel="Rechercher"
                hint="Rechercher"
                defaultValue={currentQuery || ""}
                placeholder="Rechercher"
                onSearch={(event, value) => {
                  event.preventDefault();
                  searchParams.set('q', value);
                  setSearchParams(searchParams)
                }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Outlet />
    </IntlProvider >
  );
}