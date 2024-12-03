import { useIntl } from "react-intl"

const DEFAULT_DIFF = 0.15
const DEFAULT_SLOPE = (): number => {
  const normalized = true
  return normalized ? 0.00005 : 0.5
}

export const diffColor = (diff: number) =>
  diff > DEFAULT_DIFF ? "success" : diff < -DEFAULT_DIFF ? "warning" : "beige-gris-galet"
export const slopeColor = (slope: number) =>
  slope > DEFAULT_SLOPE() ? "success" : slope < -DEFAULT_SLOPE() ? "warning" : "beige-gris-galet"
export const slopeMessage = (slope: number) => {
  const intl = useIntl()
  return slope > DEFAULT_SLOPE()
    ? intl.formatMessage({ id: "trends.trending" })
    : slope < -DEFAULT_SLOPE()
    ? intl.formatMessage({ id: "trends.fading" })
    : intl.formatMessage({ id: "trends.stable" })
}
