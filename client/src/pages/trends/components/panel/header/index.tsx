import { Button, Col, Row, Text } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"
import { useTrendsContext } from "../../../context"
import { trendsViewFromLabel, trendsViewGetConfig } from "../../../config/views"

function TrendsViewButton({ label }) {
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
      style={{ width: "100%" }}
      icon={isSelected ? (viewConfig.order == "top" ? "arrow-up-line" : "arrow-down-line") : ""}
      iconPosition="right"
      variant={isSelected ? "tertiary" : "text"}
      onClick={onButtonClick}
    >
      {intl.formatMessage({ id: `trends.views.header.${label}` })}
    </Button>
  )
}

export default function TrendsViewHeader() {
  const intl = useIntl()

  return (
    <Row verticalAlign="middle" horizontalAlign="center">
      <Col lg="4">
        <Text style={{ justifySelf: "center" }} className="fr-mb-0">
          {intl.formatMessage({ id: `trends.views.header.domains` })}
        </Text>
      </Col>
      <Col lg="2">
        <TrendsViewButton label="count" />
      </Col>
      <Col lg="3">
        <TrendsViewButton label="diff" />
      </Col>
      <Col lg="3">
        <TrendsViewButton label="trend" />
      </Col>
    </Row>
  )
}
