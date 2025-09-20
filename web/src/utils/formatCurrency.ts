/**
 * Format number ke bentuk mata uang
 * @param value angka yang akan diformat
 * @param currency kode mata uang ISO (contoh: "USD", "IDR", "JPY")
 * @param locale locale string (default: "en-US")
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0, // tanpa desimal
  }).format(value);
}
