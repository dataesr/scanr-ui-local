import { Col, Container, Row } from "@dataesr/dsfr-plus"
import useIntegration from "../../hooks/useIntegration"
import NetworksBreadcrumb from "./breadcrumb"
import NetworksSearchBar from "./search"
import NetworksSelect from "./select"
import Options from "../options"
import { useState } from "react"
import useScreenSize from "../../../../hooks/useScreenSize"
import NetworkFilters from "../filters"

export default function NetworksHeader() {
  const { integrationOptions } = useIntegration()
  const { showHeader, showFilters } = integrationOptions
  const { screen } = useScreenSize()
  const [showOptions, setShowOptions] = useState(false)

  if (showHeader === false) return null

  const isScreenSmall = ["xs", "sm", "mg"].includes(screen)

  return (
    <Container className={"bg-network"} fluid>
      <Container className="fr-pt-4w">
        <NetworksBreadcrumb />
        <Row gutters className="fr-pb-4w fr-mb-2w">
          <Col xs="12" sm="8" lg="8">
            <NetworksSearchBar />
          </Col>
          <Col xs="10" sm="3" lg="4">
            <NetworksSelect />
          </Col>
          {isScreenSmall && showFilters && (
            <Col xs="2" sm="1">
              <Options showOptions={showOptions} setShowOptions={setShowOptions} />
            </Col>
          )}
        </Row>
        {isScreenSmall && showOptions && <NetworkFilters />}
      </Container>
    </Container>
  )
}
