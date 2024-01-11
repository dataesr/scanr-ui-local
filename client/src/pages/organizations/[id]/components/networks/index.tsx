import cs from "classnames";
import { useIntl } from "react-intl";
import { Text, Link, Row, Col, useDSFRConfig } from "@dataesr/dsfr-plus";
import getLangFieldValue from "../../../../../utils/lang";



export default function OrganizationNetworks({ data, title, icon }: { data: any, title: string, icon: string }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  if (!data?.length) return null;
  return (
    <>
      <Text bold>
        {title} ({data.length})
      </Text>
      <Row gutters className="fr-mb-3w">
        {data?.map((structure) => (
          <Col xs="12" md="6">
            <div style={{ display: "flex", borderRadius: "0.5rem" }} className={cs("fr-p-1w", { "fr-enlarge-link": !!structure.structure })}>
              <div className={cs("structure-avatar", "fr-mr-2w", { [`fr-icon-${icon}`]: icon })} />
              <div style={{ flexGrow: 1, display: "block" }}>
                <Text className="fr-m-0">
                  {
                    structure.structure ? (
                      <Link href={`/organizations/${structure.structure}`}>
                        {getLangFieldValue(locale)(structure.denormalized.label) || structure.label}
                      </Link>
                    ) : structure.label
                  }
                </Text>
                {structure.fromDate && <Text className="fr-card__detail" size="sm">
                  <i>
                    {intl.formatMessage({ id: "organizations.networks.since" })}
                    {' '}
                    {new Date(structure.fromDate).toLocaleDateString()}
                  </i>
                </Text>}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  )
}