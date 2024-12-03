import { SegmentedControl, SegmentedElement } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../context"
import { TRENDS_VIEWS } from "../../config/views"

export default function TrendsControlViews() {
  const intl = useIntl()
  const { view: currentView, setView, setFocus } = useTrendsContext()

  return (
    <SegmentedControl
      name="control-views"
      value={currentView}
      onChangeValue={(value) => {
        setView(value)
        setFocus(value)
      }}
    >
      {TRENDS_VIEWS.map((view) => (
        <SegmentedElement
          checked={view === currentView}
          value={view}
          label={intl.formatMessage({ id: `trends.control-views.${view}` })}
        />
      ))}
    </SegmentedControl>
  )
}
