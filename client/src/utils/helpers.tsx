export function isInProduction() {
  return import.meta.env.VITE_APP_ENV === "production";
}
