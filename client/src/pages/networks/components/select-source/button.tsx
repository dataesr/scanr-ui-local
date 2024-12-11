import { Button } from "@dataesr/dsfr-plus"

export default function NetworkSelectSourceButton() {
  return (
    <Button
      className="fr-mt-1w fr-mr-1w"
      icon="article-line"
      iconPosition="left"
      as="button"
      aria-controls="networks-options-select-source-modal"
      data-fr-opened="false"
      variant="secondary"
    >
      {"Publications"}
    </Button>
  )
}
