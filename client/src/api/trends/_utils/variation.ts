import { MAX_YEAR } from "../config/years"

export default function variation(count) {
  const startValue = count?.[MAX_YEAR - 1] || 0
  const endValue = count?.[MAX_YEAR] || 0

  if (!startValue && !endValue) return 0
  if (!startValue) return Infinity

  return (endValue - startValue) / startValue
}
