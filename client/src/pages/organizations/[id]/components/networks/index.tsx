import cs from "classnames";
import { useIntl } from "react-intl";
import { Text, Link, Row, Col, useDSFRConfig, Button } from "@dataesr/dsfr-plus";
import getLangFieldValue from "../../../../../utils/lang";
import Modal from "../../../../../components/modal";



export function OrganizationNetworksBadges({ data, titleKey, icon }: { data: any, titleKey: string, icon: string }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  if (!data?.length) return null;
  return (
    <>
      <Text bold>
        {intl.formatMessage(
          { id: titleKey },
          { count: data.length }
        )}
      </Text>
      <Row gutters className="fr-mb-3w">
        {data?.map((badge) => (
          <Col xs="12" md="6">
            <div style={{ display: "flex", borderRadius: "0.5rem", alignItems: "center", justifyContent: "center" }} className="fr-p-1w">
              <div className={cs("structure-avatar", "fr-mr-2w", { [`fr-icon-${icon}`]: icon })} />
              <div style={{ flexGrow: 1, display: "block" }}>
                <Text className="fr-m-0">
                  {getLangFieldValue(locale)(badge.label)}
                </Text>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  )
}

export function OrganizationNetworks({ data, titleKey, icon }: { data: any, titleKey: string, icon: string }) {
  const { locale } = useDSFRConfig();
  const intl = useIntl();
  if (!data?.length) return null;
  if (data.length > 10) {
    return (
      <>
        <div className="fr-mb-3w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Text bold className="fr-m-0">
              {intl.formatMessage(
                { id: titleKey },
                { count: data.length }
              )}
            </Text>
          </div>
          <Button
            variant="text"
            icon="arrow-right-s-line"
            iconPosition="right"
            aria-controls={titleKey}
            data-fr-opened="false"
          >
            {intl.formatMessage({ id: "organizations.section.networks.open-modal-button" })}
          </Button>
        </div>
        <Modal id={titleKey} size="lg" title={intl.formatMessage(
          { id: titleKey },
          { count: data.length }
        )}>
          <Row gutters className="fr-mb-3w">
            {data?.map((structure) => (
              <Col xs="12" md="6">
                <div style={{ display: "flex", borderRadius: "0.5rem" }} className={cs("fr-p-1w", { "fr-enlarge-link": !!structure.structure })}>
                  <div className={cs("structure-avatar", "fr-mr-2w", { [`fr-icon-${icon}`]: icon })} />
                  <div style={{ flexGrow: 1, display: "block" }}>
                    <Text className="fr-m-0">
                      {
                        structure.structure ? (
                          <>
                            <Link className="fr-icon-arrow-right-line fr-link--icon-right" href={`/organizations/${structure.structure}`}>
                              {getLangFieldValue(locale)(structure.denormalized.label) || structure.label}
                            </Link>
                          </>
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

        </Modal>
      </>
    )
  }
  return (
    <>
      <Text bold>
        {intl.formatMessage(
          { id: titleKey },
          { count: data.length }
        )}
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
                      <>
                        <Link className="fr-icon-arrow-right-line fr-link--icon-right" href={`/organizations/${structure.structure}`}>
                          {getLangFieldValue(locale)(structure.denormalized.label) || structure.label}
                        </Link>
                      </>
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