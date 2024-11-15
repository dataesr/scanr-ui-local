import { Button } from "@dataesr/dsfr-plus"

export default function Options({ showOptions, setShowOptions }) {
  const variant = showOptions ? "secondary" : "text"
  return <Button icon="filter-line" iconPosition="right" variant={variant} onClick={() => setShowOptions(!showOptions)} />
}
