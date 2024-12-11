import { Container } from "@dataesr/dsfr-plus"
import TrendsHeader from "../components/header"
import TrendsView from "../components/panel"
import TrendsOptionsBar from "../components/options-bar"
import TrendsOptionsModals from "../components/options-bar/modals"

export default function TrendsLayout() {
  return (
    <Container fluid>
      <TrendsHeader />
      <TrendsOptionsBar />
      <TrendsOptionsModals />
      <Container>
        <TrendsView />
      </Container>
    </Container>
  )
}
