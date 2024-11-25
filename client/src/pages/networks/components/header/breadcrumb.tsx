import { FormattedMessage, useIntl } from "react-intl"
import useIntegration from "../../hooks/useIntegration"
import { Breadcrumb, Link } from "@dataesr/dsfr-plus"

export default function NetworksBreadcrumb() {
  const intl = useIntl()
  const { integrationOptions } = useIntegration()

  if (integrationOptions?.showBreadcrumb === false) return null

  return (
    <Breadcrumb className="fr-mt-0 fr-mb-2w">
      <Link href="/">
        <FormattedMessage id="networks.top.breadcrumb.home" />
      </Link>
      <Link current>{intl.formatMessage({ id: "networks.top.breadcrumb.explore" })}</Link>
    </Breadcrumb>
  )
}
