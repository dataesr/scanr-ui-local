import { Link, Button, ButtonGroup, Col, Container, Row } from "@dataesr/dsfr-plus";
import Share from "../../../../components/share";
import PublicationsHeader from "./header";
import { useIntl } from "react-intl";
import { PageContent, PageSection } from "../../../../components/page-content";
import useScreenSize from "../../../../hooks/useScreenSize";
import Wiki from "../../../../components/wiki";
import ProjectItem from "../../../search/components/projects/project-item";
import Identifiers from "../../../../components/identifiers";
import MoreLikeThis from "../../../../components/more-like-this";
import { Publication } from "../../../../types/publication";
import { encode } from "../../../../utils/string";

const { DEV } = import.meta.env;

export default function PublicationPage({ data }: { data: Publication }) {
  const intl = useIntl();
  const { screen } = useScreenSize();

  const authors = data.authors?.filter((author) => author.role === "author") || [];
  // const keywords = data?.domains?.filter((domain) => domain.type === "keyword").map((domain) => domain.label?.default) || [];
  const wikis = data?.domains?.filter((domain) => domain.type === "wikidata");

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
                size="lead"
                title={intl.formatMessage({ id: "publications.section.affiliations" })}
                icon="building-line"
                show={!!affiliations?.length}
              >
                <div className="fr-mb-6w">
                  {affiliations?.map((affiliation, i) => (
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
                size="lead"
                title={intl.formatMessage({ id: "publications.section.fundings" })}
                icon="money-euro-circle-line"
                show={!!data?.projects?.length}
              >
                <div className="result-list">
                  {data?.projects?.map((project) => (
                    <ProjectItem data={project} key={project.id} />
                  ))}
                </div>
              </PageSection>
              <PageSection
                size="lead"
                title={intl.formatMessage({ id: "publications.section.more-like-this" })}
                icon="shopping-cart-2-line"
                show
              >
                <MoreLikeThis id={data._id} api="publications" />
              </PageSection>
              <PageSection title="Data JSON" description="" show={DEV}>
                <div>
                  <pre>
                    {JSON.stringify(data || "", null, 2)}
                  </pre>
                </div>
              </PageSection>
            </PageContent>
          </Container>
        </Col>
        <Col md="4" lg="3" offsetLg="1">
          <PageContent>
            <PageSection
              title={intl.formatMessage({ id: "publications.section.access" })}
              show
            >
              <ButtonGroup size="sm">
                {data.isOa && <Button as="a" href={data.oaEvidence.url} target="_blank" icon="file-download-line" iconPosition="right">
                  {intl.formatMessage({ id: "publications.section.access.download" })}
                </Button>}
                <Button as="a" href={data.doiUrl} target="_blank" variant="tertiary" icon="external-link-line" iconPosition="right">
                  {intl.formatMessage({ id: "publications.section.access.visit" })}
                </Button>
              </ButtonGroup>
            </PageSection>
            <PageSection
              title={intl.formatMessage({ id: "publications.section.identifiers" })}
              description={intl.formatMessage({ id: "publications.section.identifiers-description" })}
              show
            >
              <Identifiers data={data?.externalIds} />
            </PageSection>
            <PageSection
              title={intl.formatMessage({ id: "publications.section.wikis" })}
              show={!!wikis?.length}
            >
              <Wiki wikis={wikis} />
            </PageSection>
            <PageSection
              title={intl.formatMessage({ id: "publications.section.share" })}
              show
            >
              <Share />
            </PageSection>
            <PageSection
              title={intl.formatMessage({ id: "publications.section.contribute" })}
              show
            >
              <ButtonGroup>
                {/* <Button data-fr-opened="false" aria-controls="funding-add" variant="tertiary" icon="links-line" iconPosition="left">
                  {intl.formatMessage({ id: "publications.signals.fundings" })}
                </Button> */}
                {/* <Button data-fr-opened="false" aria-controls="authors-identification" variant="tertiary" icon="links-line" iconPosition="left" >
                  {intl.formatMessage({ id: "publications.signals.author" })}
                </Button> */}
                <Button as="a" href={`/bugs/publications/${encode(data.id)}`} color="error" variant="tertiary" icon="bug-line" iconPosition="left" >
                  {intl.formatMessage({ id: "publications.signals.bug" })}
                </Button>
              </ButtonGroup>
            </PageSection>
          </PageContent>
          {/* <Modal id="authors-identification" title={intl.formatMessage({ id: "publications.signals.author" })}>
            {authors.map((author, i) => (
              <div className="fr-mb-3w" key={i}>
                <TextInput label={author.fullName} disableAutoValidation defaultValue={author.person || ""} />
              </div>
            ))}
          </Modal>
          <Modal id="fundings-add" title={intl.formatMessage({ id: "publications.signals.fundings" })}>
            <TextInput disableAutoValidation label="Rechercher un financement" />
          </Modal> */}
        </Col>
      </Row >
    </Container >
  )
}

