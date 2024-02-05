import { Breadcrumb, Button, ButtonGroup, Col, Container, DissmissibleTag, Link, Row, Tag, TagGroup, Text, TextInput, Title, useDSFRConfig } from "@dataesr/dsfr-plus";
import useHeData from "./hooks/useHeData";
import { MAX_RESULTS_BEFORE_USER_CLICK } from "../../config/app";
import { createIntl, RawIntlProvider, FormattedMessage } from "react-intl";
import useSearchData from "./hooks/useSearchData";
import OrganizationItem from "../search/components/organizations/organization-item";
import Separator from "../../components/separator";
import SearchResultListSkeleton from "../../components/skeleton/search-result-list-skeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Error500 from "../../components/errors/error-500";
import Modal from "../../components/modal";


const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});



export default function HEPartners() {
  const { locale } = useDSFRConfig();
  const [ref, inView] = useInView();
  const intl = createIntl({ locale, messages: messages[locale] })
  const { data: heData, isFetching, isError } = useHeData();
  const { search, currentKeywords } = useSearchData();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching: isFetchingData, error: dataError } = search;
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])
  const shouldClickToLoad = data?.length
    ? data.length >= MAX_RESULTS_BEFORE_USER_CLICK
    : false;

  if (isError || dataError) return <Error500 />
  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">
            <FormattedMessage id="he.breadcrumb.home" />
          </Link>
          <Link href="/search/organizations">
            <FormattedMessage id="he.breadcrumb.find-partners" />
          </Link>
          <Link>
            {heData?.title}
          </Link>
        </Breadcrumb>
        <Container fluid>
          <Container fluid className="fr-mt-3w">
            <Row>
              <Col xs="12">
                <Title className="fr-mb-0" as="h1" look="h4">
                  {heData?.title} - {heData?.identifier}
                </Title>
                <Text className="fr-card__detail fr-mb-2w" size="sm">
                  <i>
                    {heData?.callTitle}
                    <br />
                    {heData?.callIdentifier}
                  </i>
                </Text>
                <Text bold className="fr-mb-1w">
                  Mots-clés
                </Text>
                <div className="fr-mb-6w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ flexGrow: 1 }}>
                    <TagGroup>
                      {heData?.keywords?.map((keyword) => (
                        <Tag key={keyword} color="green-emeraude">{keyword}</Tag>
                      ))}
                      <Tag
                        as="button"
                        data-fr-opened="false"
                        aria-controls="add-keywords"
                        icon="add-circle-line"
                        iconPosition="right"
                      >
                        Ajouter des mot-clés
                      </Tag>
                    </TagGroup>
                  </div>
                  <div>
                    <TagGroup>
                      <Tag
                        as="button"
                        data-fr-opened="false"
                        aria-controls="filter-org-results"
                        icon="equalizer-line"
                        iconPosition="right"
                      >
                        Filtrer les résultats
                      </Tag>
                    </TagGroup>
                  </div>
                </div>
                <Modal id="add-keywords" title="Ajouter des mot-clés">
                  <TextInput
                    disableAutoValidation
                    placeholder="Ajouter des mots-clés"
                    className="fr-mb-1w"
                  />
                  <TagGroup>
                    {heData?.keywords?.map((keyword) => (
                      <DissmissibleTag onClick={() => { }} key={keyword} color="green-emeraude">{keyword}</DissmissibleTag>
                    ))}
                  </TagGroup>
                  {(heData?.tags?.length > 0) ? (
                    <>
                      <Text bold className="fr-mb-1w">
                        Mot clés suggérés
                      </Text>
                      <Text size="sm" className="fr-card__detail fr-mb-1w">
                        Sélectionnez les mots-clés qui vous intéressent pour les ajouter à votre recherche
                      </Text>
                      <TagGroup>
                        {heData?.tags?.map((flag) => (
                          <Tag size="sm" as="button" onClick={() => { }} key={flag}>{flag}</Tag>
                        ))}
                      </TagGroup>
                    </>
                  ) : null}
                  <div className="fr-modal__footer fr-px-0">
                    <ButtonGroup>
                      <Button variant="primary">Relancer la recherche</Button>
                    </ButtonGroup>
                  </div>
                </Modal>
                <Modal id="filter-org-results" title="Ajouter des filtres">
                  <TextInput
                    disableAutoValidation
                    placeholder="Ajouter des mots-clés"
                    className="fr-mb-1w"
                  />
                  <ButtonGroup>
                    <Button variant="secondary">Annuler</Button>
                    <Button variant="primary">Ajouter</Button>
                  </ButtonGroup>
                </Modal>
                <Text bold size="lg" className="fr-mb-1w">
                  Résultats
                </Text>
                <Container fluid>
                  <Row>
                    <Col xs="12" md="8" lg="7">
                      <div className="result-list">
                        {data?.length
                          ? data.map(({ _source: data, highlight }) => (
                            <OrganizationItem data={data} highlight={highlight} key={data.id} />))
                          : null
                        }
                      </div>
                      {(isFetching || isFetchingData || isFetchingNextPage) && (
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
                                { query: currentKeywords }
                              )}
                            </Text>
                          </>)
                          : null
                      }
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </RawIntlProvider>
  );
}