import { FormattedMessage, useIntl } from "react-intl"
import useTab from "../../hooks/useTab"
import useIntegration from "../../hooks/useIntegration"
import { Breadcrumb, Link } from "@dataesr/dsfr-plus"

export default function NetworksBreadcrumb() {
  const intl = useIntl()
  const { currentTab } = useTab()
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.useBreadcrumb === false) return null

  return (
    <Breadcrumb className="fr-mt-0 fr-mb-2w">
      <Link href="/">
        <FormattedMessage id="networks.top.breadcrumb.home" />
      </Link>
      <Link>{intl.formatMessage({ id: "networks.top.breadcrumb.explore" })}</Link>
      <Link current>
        {intl.formatMessage(
          { id: "networks.header.select.label" },
          { tab: intl.formatMessage({ id: `networks.tab.of.${currentTab}` }) }
        )}
      </Link>
    </Breadcrumb>
  )
}
