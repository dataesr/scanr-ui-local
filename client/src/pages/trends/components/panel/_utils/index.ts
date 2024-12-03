import { DSFRColors } from "@dataesr/dsfr-plus"
import { useIntl } from "react-intl"

const DEFAULT_COLOR = "beige-gris-galet"
const DIFF_THRESHOLD = 0.15 // 15%
const SLOPE_THRESHOLD = (normalized: boolean): number => {
  return normalized ? 0.000000005 : 0.5
}

export function itemGetColor(item: any, field: "diff" | "slope", normalized: boolean): DSFRColors {
  const threshold = field === "slope" ? SLOPE_THRESHOLD(normalized) : DIFF_THRESHOLD
  const value = item?.[field] || 0

  if (value > threshold) return "success"
  if (value < -threshold) return "warning"

  return DEFAULT_COLOR
}

export function itemGetTrendState(slope: number, normalized: boolean) {
  const intl = useIntl()
  const threshold = SLOPE_THRESHOLD(normalized)

  if (slope > threshold) return intl.formatMessage({ id: "trends.trending" })
  if (slope < -threshold) return intl.formatMessage({ id: "trends.fading" })

  return intl.formatMessage({ id: "trends.stable" })
}
