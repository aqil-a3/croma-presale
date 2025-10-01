/**
 * Format number ke bentuk mata uang dengan beberapa angka di belakang koma
 * @param value angka yang akan diformat
 * @param currency kode mata uang ISO (contoh: "USD", "IDR", "JPY")
 * @param locale locale string (default: "en-US")
 * @param fractionDigits jumlah angka di belakang koma (default: 4)
 */
export function formatCurrencyWithDecimals(
  value: number,
  currency: string = "USD",
  locale: string = "en-US",
  fractionDigits: number = 4
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
