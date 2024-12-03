export const CURRENT_YEAR = new Date().getFullYear()
export const MAX_YEAR = CURRENT_YEAR - 1
export const MIN_YEAR = MAX_YEAR - 5
export const YEARS = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i)
