import { useIntl } from "react-intl";
import { Button, Row } from "@dataesr/dsfr-plus";
import Modal from "../../../../../components/modal";
import PublicationItem from "../../../../search/components/publications/publication-item";

export default function ProjectsPublications({ data, titleKey }) {
  const intl = useIntl();
  if (!data?.length) return null;
  const publications = data?.sort((a, b) => b.year - a.year);
  return (
    <>
      <div className="result-list">
        {publications?.slice(0, 3)?.map((publi) => (
          <PublicationItem data={publi} key={`preview-${publi.id}`} />
        ))}
      </div>
      {(publications?.length > 3) ? (
        <Row horizontalAlign="right">

          <Button
            variant="secondary"
            icon="arrow-right-s-line"
            iconPosition="right"
            aria-controls={titleKey}
            data-fr-opened="false"
          >
            {intl.formatMessage({ id: "projects.section.publications.open-modal-button" })}
          </Button>
        </Row>
      ) : null}
      {(publications?.length > 3) ? (<Modal id={titleKey} size="lg" title={intl.formatMessage(
        { id: titleKey },
        { count: data.length }
      )}>
        <div className="result-list">
          {data?.map((publi) => (
            <PublicationItem data={publi} key={`list-${publi.id}`} />
          ))}
        </div>
      </Modal>) : null}
    </>
  )
}