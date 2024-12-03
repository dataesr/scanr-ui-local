import { useIntl } from "react-intl"
import { useTrendsContext } from "../../../context"
import { trendsViewFromLabel, trendsViewGetConfig } from "../../../config/views"
import { Button } from "@dataesr/dsfr-plus"

export default function TrendsViewButton({ label }) {
  const intl = useIntl()
  const { view, setView, setFocus } = useTrendsContext()
  const viewConfig = trendsViewGetConfig(view)
  const defaultView = trendsViewFromLabel(label)

  const isSelected = Boolean(label === viewConfig.label)
  const onButtonClick = () => {
    isSelected ? viewConfig?.nextView && setView(viewConfig.nextView) : setView(defaultView)
    setFocus("")
  }

  return (
    <Button
      id={label}
      icon={isSelected ? (viewConfig.order == "top" ? "arrow-up-line" : "arrow-down-line") : ""}
      iconPosition="right"
      variant={isSelected ? "tertiary" : "text"}
      onClick={onButtonClick}
    >
      {intl.formatMessage({ id: `trends.views.header.${label}` })}
    </Button>
  )
}
