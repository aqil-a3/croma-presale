export function formatNumber(value: number, locale: string = "en-US") {
  return value.toLocaleString(locale);
}