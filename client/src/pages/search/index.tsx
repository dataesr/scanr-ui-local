import PublicationItem from "./components/publications/publication-item";
import AuthorItem from "./components/authors/author-item";
import SearchResultListSkeleton from "../../components/skeleton/search-result-list-skeleton";
import useSearchData from "./hooks/useSearchData";
import { Breadcrumb, Button, Col, Container, Link, Row, SearchBar, Text, useDSFRConfig } from "@dataesr/dsfr-plus";
import { FormattedMessage, createIntl, RawIntlProvider } from "react-intl";
import Separator from "../../components/separator";
import { useEffect } from "react";
import { MAX_RESULTS_BEFORE_USER_CLICK } from "../../config/app";
import { useInView } from "react-intersection-observer";
import PublicationAnalytics from "./components/publications/publication-analytics";
import OrganizationItem from "./components/organizations/organization-item";
import ProjectItem from "./components/projects/project-item";
import BaseSkeleton from "../../components/skeleton/base-skeleton";
import PublicationFilters from "./components/publications/publication-filters";

import OrganizationFilters from "./components/organizations/organization-filters";
import Error500 from "../../components/errors/error-500";
import ProjectFilters from "./components/projects/projects-filters";
import AuthorFilters from "./components/authors/author-filters";
import useUrl from "./hooks/useUrl";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

const API_MAPPING = {
  publications: {
    item: PublicationItem,
    analytics: PublicationAnalytics,
    filters: PublicationFilters,
  },
  authors: {
    item: AuthorItem,
    analytics: () => <></>,
    filters: AuthorFilters,
  },
  organizations: {
    item: OrganizationItem,
    analytics: () => <></>,
    filters: OrganizationFilters,
  },
  projects: {
    item: ProjectItem,
    analytics: () => <></>,
    filters: ProjectFilters,
  }
}

export default function Search() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })
  const [ref, inView] = useInView();
  const { api, currentQuery, handleQueryChange } = useUrl()
  const { search, total } = useSearchData();
  const { data, error, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } = search;
  const ItemComponent = API_MAPPING[api].item;
  const AnalyticsComponent = API_MAPPING[api].analytics;
  const FilterComponent = API_MAPPING[api].filters;


  const shouldClickToLoad = data?.length
    ? data.length >= MAX_RESULTS_BEFORE_USER_CLICK
    : false;

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (error) {
    return <Error500 />
  }

  return (
    <RawIntlProvider value={intl}>
      <Container className={`bg-${api}`} fluid>
        <Container>
          <Breadcrumb className="fr-pt-4w fr-mt-0 fr-mb-2w">
            <Link href="/"><FormattedMessage id="search.top.breadcrumb.home" /></Link>
            <Link current>{intl.formatMessage({ id: `search.top.breadcrumb.${api}` })}</Link>
          </Breadcrumb>
          <Row gutters>
            <Col xs="12" sm="8" lg="8">
              <SearchBar
                key={currentQuery}
                isLarge
                buttonLabel={intl.formatMessage({ id: "search.top.main-search-bar" })}
                defaultValue={currentQuery || ""}
                placeholder={intl.formatMessage({ id: "search.top.main-search-bar" })}
                onSearch={(value) => handleQueryChange(value)}
              />
            </Col>
            <Col xs="12" sm="4" lg="2">
              <FilterComponent />
            </Col>
          </Row>
          <Container fluid className="fr-py-3w">
            {(total && total === 10000) ? (<Text as="span" size="lg" bold className="fr-mb-1w">
              {intl.formatMessage({ id: "search.top.result-more-than" })}
            </Text>) : null
            }
            {(total && total > 0) ? (<Text as="span" size="lg" bold className="fr-mb-1w">
              {intl.formatMessage(
                { id: `search.top.${api}.result` },
                { count: total, query: currentQuery }
              )}
            </Text>) : isFetchingNextPage ? <BaseSkeleton height="1.5rem" width="40%" /> : null}
          </Container>
        </Container>
      </Container>
      <Container className="fr-mt-3w">
        <Row>
          <Col xs="12" lg="7">
            <Container fluid as="section">
              <div className="result-list">
                {data?.length
                  ? data.map(({ _source: data, highlight }) => (
                    <ItemComponent data={data} highlight={highlight} key={data.id} />))
                  : null
                }
              </div>
            </Container>
            {(isFetching || isFetchingNextPage) && (
              <>
                <hr />
                <div className="result-list">
                  <SearchResultListSkeleton />
                </div>
              </>
            )}
            {(hasNextPage && !shouldClickToLoad) && (
              <>
                <div ref={ref} />
                <hr />
              </>
            )}
            {(hasNextPage && shouldClickToLoad) && (
              <Separator className="fr-my-2w">
                <Button icon="arrow-down-s-line" variant="text" onClick={() => fetchNextPage()}>
                  <FormattedMessage id="search.results.pagination.next" />
                </Button>
              </Separator>
            )}
            {
              (!isFetchingNextPage && !hasNextPage)
                ? (<>
                  <Separator />
                  <Text size="md" className="fr-my-4w">
                    {intl.formatMessage(
                      { id: "search.results.pagination.end" },
                      { query: currentQuery }
                    )}
                  </Text>
                </>)
                : null
            }
          </Col>
          <Col xs="12" lg="4" offsetLg="1">
            <AnalyticsComponent />
          </Col>
        </Row>
      </Container>
    </RawIntlProvider>
  )
}

