/**
 * Format angka dengan pemisah ribuan dan jumlah desimal tertentu.
 * @param value Angka yang ingin diformat
 * @param decimals Jumlah angka di belakang koma (default: 2)
 * @param locale Locale untuk pemformatan (default: 'en-US')
 * @returns String hasil format
 */
export function formatNumberWithDecimal(
  value: number | string,
  decimals: number = 2,
  locale: string = "en-US"
): string {
  const num = Number(value);

  if (isNaN(num)) return "0";

  return num.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
