import { Link, Badge, BadgeGroup, Button, ButtonGroup, Col, Container, Row, Text } from "@dataesr/dsfr-plus";
import CopyBadgeButton from "../../../../components/copy/copy-badge-button";
import { useQuery } from "@tanstack/react-query";
import { getMorePublicationsLikeThis } from "../../../../api/publications";
import Share from "../../../../components/share";
import Skeleton from "../../../../components/skeleton/search-result-list-skeleton";
import PublicationItem from "../../../search/components/publications/publication-item";
import PublicationsHeader from "./header";
import { useIntl } from "react-intl";
import { PageContent, PageSection } from "../../../../components/page-content";
import useScreenSize from "../../../../hooks/useScreenSize";


export default function Publication({ data }) {
  const intl = useIntl();
  const { screen } = useScreenSize();

  const { data: moreLikeThis, isLoading, isError } = useQuery({
    queryKey: ["morePublicationLike", data._id],
    queryFn: () => getMorePublicationsLikeThis(data._id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const authors = data.authors?.filter((author) => author.role === "author") || [];
  // const keywords = data?.domains?.filter((domain) => domain.type === "keyword").map((domain) => domain.label?.default) || [];
  const wikis = data?.domains?.filter((domain) => domain.type === "wikidata").map((domain) => domain.label?.default) || [];
  const affiliations = data?.authors
    ?.flatMap(({ affiliations }) => affiliations?.filter((affiliation) => affiliation.name))
    .reduce((acc, cur) => {
      if (!cur) return acc;
      if (cur.rnsr) {
        return [...acc.filter(a => a.rnsr), cur];
      }
      if (acc.filter(a => a.rnsr).length > 0) {
        return acc;
      }
      return [...acc, cur];
    }, [])
    .reduce((acc, cur) => {
      if (acc.find(a => a.name === cur.name)) {
        return acc;
      }
      return [...acc, cur];
    }, [])
    .map((affiliation, index) => {
      const authors = data.authors
        ?.filter((author) => author.affiliations?.find((a) => a.name === affiliation.name))
        .map((author) => author.fullName);
      return { ...affiliation, index, authors }
    });

  return (
    <Container fluid>
      <Row gutters={!["sm", "xs"].includes(screen)}>
        <Col xs="12" md="8">
          <Container fluid className="fr-mb-6w">
            <PublicationsHeader data={data} authors={authors} affiliations={affiliations} />
          </Container>
          <Container fluid>
            <PageContent>
              <PageSection
                title={intl.formatMessage({ id: "publications.section.affiliations" })}
                icon="building-line"
                show={!!affiliations?.length}
              >
                <div className="fr-mb-6w">
                  {affiliations.map((affiliation, i) => (
                    <div style={{ display: 'inline-flex' }} key={i}>
                      <sup>{affiliation.index + 1}</sup>
                      {' '}
                      <div>
                        {affiliation?.rnsr ? <Link href={`/organizations/${affiliation.rnsr}`}>{affiliation.name}</Link> : affiliation.name}
                      </div>
                    </div>
                  )
                  )}
                </div>
              </PageSection>
              <PageSection
                title={intl.formatMessage({ id: "publications.section.fundings" })}
                icon="money-euro-circle-line"
                show={!!data?.projects?.length}
              >
                {data?.projects?.map((project) => (
                  <>
                    <Link className="fr-link fr-text--md" href={`/projects/${project?.id}`}>
                      {project?.label?.fr || project?.label?.en || project?.label?.default}
                    </Link>
                    <Text as='span' size="md" className="fr-card__detail">
                      <i>
                        {project?.id}
                        {(project?.type || project.year) && " — "}
                        {project.type && `${project.type}`}
                        {(project?.year && project.type) && " — "}
                        {project?.year && `${project.year}`}
                      </i>
                    </Text>
                    <br />
                  </>
                ))}
              </PageSection>
              <PageSection
                title={intl.formatMessage({ id: "publications.section.more-like-this" })}
                icon="shopping-cart-2-line"
                show
              >
                {isLoading && <Skeleton />}
                {isError && <div>Une erreur est survenue au chargement des données</div>}
                <div className="result-list">
                  {moreLikeThis?.map((like) => (
                    <PublicationItem data={like} key={like.id} />
                  ))}
                </div>
              </PageSection>
            </PageContent>
          </Container>
        </Col>
        <Col md="4" lg="3" offsetLg="1">
          <PageContent>
            <PageSection
              title={intl.formatMessage({ id: "publications.section.access" })}
              size="lg"
              show
            >
              <ButtonGroup size="sm">
                {data.isOa && <Button icon="file-download-line" iconPosition="right">Télécharger la publication</Button>}
                <Button variant="tertiary" icon="external-link-line" iconPosition="right">
                  Voir sur le site de l'éditeur
                </Button>
              </ButtonGroup>
            </PageSection>

            <PageSection
              title={intl.formatMessage({ id: "publications.section.identifiers" })}
              description={intl.formatMessage({ id: "publications.section.identifiers-description" })}
              size="lg"
              show
            >
              <div className="fr-badge-group">
                {data.externalIds
                  ?.filter((ext) => ext?.type !== 'scanr')
                  .map((ext) => <CopyBadgeButton key={ext.id} lowercase size="sm" text={ext.id} />)
                }
              </div>
            </PageSection>
            <PageSection
              title={intl.formatMessage({ id: "publications.section.wikis" })}
              show={!!data?.domains?.length}
              description={intl.formatMessage({ id: "publications.section.wikis-description" })}
              size="lg"
            >
              <BadgeGroup>
                {wikis?.map((keyword) => (
                  <Badge key={keyword} size="sm">{keyword}</Badge>
                ))}
              </BadgeGroup>
            </PageSection>
            <PageSection
              title={intl.formatMessage({ id: "publications.section.share" })}
              size="lg"
              show
            >
              <Share />
            </PageSection>
          </PageContent>
        </Col>
      </Row >
    </Container >
  )
}

