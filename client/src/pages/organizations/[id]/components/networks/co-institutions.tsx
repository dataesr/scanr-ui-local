import { useIntl } from "react-intl";
import {
  Button,
  Col,
  Row,
  Text,
} from "@dataesr/dsfr-plus";
import { RelatedOrganizationData } from "../../../../../types/organization";
import BarLink from "../../../../../components/bar-link";
import Modal from "../../../../../components/modal";

type TutelleCountsType = {
  structure: string,
  count: number,
  label: string,
  relationType: string,
  normalizedCount: number
}

type ForType = "participant" | "tutelle";

// Extracted groupByInstitutions function
const groupByInstitutions = (orgId: string, data: RelatedOrganizationData[], forWho: ForType) => {
  const filterCallback = (element: RelatedOrganizationData) => {
    if (forWho === "participant") return !["établissement tutelle", "primary"].includes(element.relationType);
    if (forWho === "tutelle") return ["établissement tutelle", "primary"].includes(element.relationType);
    return !!element;
  };

  const count = data
    ?.filter((element) => filterCallback(element))
    ?.flatMap(({ denormalized }) => denormalized.institutions)
    ?.filter((institution) => institution.structure !== orgId)
    ?.reduce((acc, current) => {
      if (!["établissement tutelle", "primary"].includes(current.relationType)) return acc;
      const existing = acc.find(item => item.structure === current.structure);

      if (existing) {
        existing.count += 1;
      } else {
        acc.push({
          structure: current.structure,
          count: 1,
          label: current.label,
          relationType: current.relationType,
          normalizedCount: null,
        });
      }

      return acc;
    }, [] as TutelleCountsType[]);

  const maxCount = count?.length ? Math.max(...count.map(i => i.count)) : 0;
  const res = count?.map((item) => ({
    ...item,
    normalizedCount: maxCount > 0 ? (item.count / maxCount) * 100 : 0
  })).sort((a, b) => b.count - a.count);

  return res ?? [];
};

interface CoInstitutionsProps {
  orgId: string;
  institutionOfData: RelatedOrganizationData[];
  forType: ForType
}

export default function CoInstitutions({
  orgId,
  institutionOfData,
  forType,
}: CoInstitutionsProps) {
  const intl = useIntl();
  const coInstitutionOf = groupByInstitutions(orgId, institutionOfData, forType);


  if (!institutionOfData?.length || !coInstitutionOf?.length) {
    return null;
  }

  const graphTitleId = `organizations.section.networks.co-${forType}.graph-title`;
  const buttonId = "organizations.section.networks.co-institutions.open-modal-button"

  return (
    <div
      className="fr-ml-4w fr-pl-4w fr-mb-3w"
      style={{ marginTop: "-1rem", borderLeft: "2px solid var(--border-default-grey)" }}
    >
      <Row>
        <Col xs="12">
          <Text bold size="sm" className="fr-mb-1w">
            <i>{intl.formatMessage({ id: graphTitleId })}</i>
          </Text>
        </Col>
        <Col xs="12">
          {coInstitutionOf?.slice(0, 5)?.map((institution) => (
            <BarLink
              key={institution.structure}
              name={institution.label}
              count={institution.count}
              width={institution.normalizedCount}
              color="var(--artwork-minor-yellow-tournesol)"
              height={8}
            // href={`/organizations/${institution.structure}`}
            />
          ))}
        </Col>
        {(coInstitutionOf?.length > 5) && <Col xs="12">
          <Row className="fr-mt-1w" horizontalAlign="left">
            <Button
              size="sm"
              variant="text"
              icon="arrow-right-s-line"
              iconPosition="right"
              aria-controls={`${forType}-coInstitutions`}
              data-fr-opened="false"
            >
              {intl.formatMessage({ id: buttonId })}
            </Button>
          </Row>
        </Col>}

        <Modal
          id={`${forType}-coInstitutions`}
          size="lg"
          title={intl.formatMessage({ id: graphTitleId })}
        >
          <Row>
            <Col xs="12">
              {coInstitutionOf?.map((institution) => (
                <BarLink
                  key={institution.structure}
                  name={institution.label}
                  count={institution.count}
                  width={institution.normalizedCount}
                  color="var(--artwork-minor-yellow-tournesol)"
                  height={8}
                // href={`/organizations/${institution.structure}`}
                />
              ))}
            </Col>
          </Row>
        </Modal>
      </Row>
    </div>
  );
}
