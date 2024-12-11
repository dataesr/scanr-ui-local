export default function variation(count, max_year) {
  const startValue = count?.[max_year - 1] || 0
  const endValue = count?.[max_year] || 0

  if (!startValue && !endValue) return 0
  if (!startValue) return Infinity

  return (endValue - startValue) / startValue
}
