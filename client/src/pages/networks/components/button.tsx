import { IntlShape } from "react-intl"
import { Button } from "@dataesr/dsfr-plus"
import useSearchData from "../hooks/useSearchData"

export default function ClustersButton({
  intlValue: intl,
  currentTab,
  enabled,
  handleChange,
}: {
  intlValue: IntlShape
  currentTab: string
  enabled: boolean
  handleChange: any
}) {
  const { search } = useSearchData(currentTab, enabled)

  if (search.isFetching || !search?.data?.network) return <></>

  return (
    <Button
      className="fr-m-3w"
      iconPosition="right"
      icon={enabled ? "arrow-up-line" : "arrow-down-line"}
      variant="tertiary"
      onClick={() => handleChange(currentTab)}
    >
      {intl.formatMessage({
        id: enabled ? "networks.clusters.button.rm" : "networks.clusters.button.add",
      })}
    </Button>
  )
}
