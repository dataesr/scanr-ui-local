import { Notice } from "@dataesr/dsfr-plus"
import useSearchData from "../../hooks/useSearchData"
import { useIntl } from "react-intl"

export default function NetworkNotice() {
  const intl = useIntl()
  const {
    search: { data, isFetching },
  } = useSearchData()

  if (isFetching) return null
  if (!data?.count || data.count < 10000) return null

  return (
    <Notice className="fr-mb-1w" type="info" closeMode="uncontrolled">
      {intl.formatMessage({ id: "networks.parameters.toggle-sample.label" })}
      {": "}
      {intl.formatMessage({ id: "networks.notice.quick-search" })}
    </Notice>
  )
}
