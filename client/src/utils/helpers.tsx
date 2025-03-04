export function isInProduction() {
  return import.meta.env.VITE_APP_ENV === "production";
}
export function isInStaging() {
  return import.meta.env.VITE_APP_ENV === "staging";
}

export const rangeArray = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, i) => min + i)