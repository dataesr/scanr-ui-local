import { useIntl } from "react-intl";
import { Button, Row, Col, Text } from "@dataesr/dsfr-plus";
import Histogram from "../../../../../components/YearRangeSlider/histogram";
import { OrganizationPatentsData } from "../../../../../api/types/organization";
import useScreenSize from "../../../../../hooks/useScreenSize";



export default function OrganizationPatents({ data: patents, id }: { data: OrganizationPatentsData, id: string }) {
  const { screen } = useScreenSize();
  const intl = useIntl();
  const searchFilters = [{ field: 'affiliations.id', value: [id], type: 'terms' }]
  const patentsFilterUrl = `/search/patents?filters=${encodeURIComponent(JSON.stringify(searchFilters))}`;

  if (!patents.patentsCount || patents.patentsCount === 0) {
    return null;
  }
  if (patents.patentsCount < 5 || ["xs", "sm"].includes(screen)) {
    return (
      <>
        <div className="fr-mb-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Text className="fr-m-0" bold>
              {patents.patentsCount}
              {' '}
              {intl.formatMessage({ id: "organizations.patents.count" })}
            </Text>
          </div>
          <Button as="a" variant="text" icon="arrow-right-s-line" iconPosition="right" href={patentsFilterUrl}>
            {intl.formatMessage({ id: "organizations.patents.search" })}
          </Button>
        </div>
        <hr />
      </>
    );
  }

  return (
    <>
      <div className="fr-mb-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <Text className="fr-m-0" bold>
            {patents.patentsCount}
            {' '}
            {intl.formatMessage({ id: "organizations.patents.count" })}
          </Text>
        </div>
        <Button as="a" variant="text" icon="arrow-right-s-line" iconPosition="right" href={patentsFilterUrl}>
          {intl.formatMessage({ id: "organizations.patents.search" })}
        </Button>
      </div>
      <Row gutters>
        <Col xs="4">
          <fieldset id="publication-graph-selector" className="fr-segmented">
            <div style={{ flexDirection: "column" }} className="fr-segmented__elements">
              <div className="fr-segmented__element">
                <input checked type="radio" id="segmented-patents" />
                <label className="fr-label" htmlFor="segmented-patents">
                  {intl.formatMessage({ id: "organizations.patents.nav.year" })}
                </label>
              </div>
            </div>
          </fieldset>
        </Col>
        <Col xs="8" className="fr-pb-6w">
          <Text>{intl.formatMessage({ id: "organizations.patents.graph.year.label" })}</Text>
          <Histogram data={patents.byYear.map((year) => year.count)} />
        </Col>
      </Row>
      <hr />
    </>
  );
}