import { Button, Container, Row } from "@dataesr/dsfr-plus"
import { useNetworkContext } from "../../context"

export default function NetworkFiltersBar() {
  const { openFilters } = useNetworkContext()

  if (!openFilters) return null

  return (
    <Container className="fr-my-2w">
      <Row horizontalAlign="right">
        <Button
          className="fr-mr-1w"
          icon="team-line"
          iconPosition="left"
          as="button"
          aria-controls="networks-filters-affiliations-modal"
          data-fr-opened="false"
          variant={"tertiary"}
        >
          {"Affiliations"}
        </Button>
        <Button
          className="fr-mr-1w"
          icon="earth-line"
          iconPosition="left"
          as="button"
          aria-controls="networks-filters-localization-modal"
          data-fr-opened="false"
          variant={"tertiary"}
        >
          {"Régions"}
        </Button>
        <Button
          className="fr-mr-1w"
          icon="success-line"
          iconPosition="left"
          as="button"
          aria-controls="networks-filters-open-access-modal"
          data-fr-opened="false"
          variant={"tertiary"}
        >
          {"Ouverture"}
        </Button>
        <Button
          className="fr-mr-1w"
          icon="calendar-2-line"
          iconPosition="left"
          as="button"
          aria-controls="networks-filters-years-modal"
          data-fr-opened="false"
          variant={"tertiary"}
        >
          {"Années"}
        </Button>
        <Button
          className="fr-mr-1w"
          icon="money-euro-circle-line"
          iconPosition="left"
          as="button"
          aria-controls="networks-filters-fundings-modal"
          data-fr-opened="false"
          variant={"tertiary"}
        >
          {"Financements"}
        </Button>
        <Button
          className="fr-mr-1w"
          icon="bookmark-line"
          iconPosition="left"
          as="button"
          aria-controls="networks-filters-tags-modal"
          data-fr-opened="false"
          variant={"tertiary"}
        >
          {"Tags"}
        </Button>
      </Row>
    </Container>
  )
}
