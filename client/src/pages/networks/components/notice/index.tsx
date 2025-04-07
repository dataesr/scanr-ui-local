import { useState, useEffect } from "react"
import { Notice } from "@dataesr/dsfr-plus"
import useSearchData from "../../hooks/useSearchData"
import { useIntl } from "react-intl"
import useOptions from "../../hooks/useOptions"

export default function NetworkNotice() {
  const intl = useIntl()
  const {
    search: { data, isFetching },
  } = useSearchData()
  const { parameters } = useOptions()
  const [display, setDisplay] = useState<string>("inherit")

  useEffect(() => {
    if (parameters.sample === true) {
      setDisplay("inherit")
    }
  }, [data])

  if (isFetching) return null
  if (!data?.count || data.count < 10000) return null

  return (
    <Notice
      className="fr-mb-1w"
      type="info"
      closeMode="controlled"
      style={{ display: display }}
      onClose={() => setDisplay("none")}
    >
      {intl.formatMessage({ id: "networks.parameters.toggle-sample.label" })}
      {": "}
      {intl.formatMessage({ id: "networks.notice.quick-search" })}
    </Notice>
  )
}
