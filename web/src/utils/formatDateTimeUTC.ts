/**
 * Format date ke bentuk "MMM DD, YYYY HH:mm:ss UTC"
 *
 * @param date - ISO string atau objek Date
 * @returns string dengan format contoh: "Oct 16, 2025 23:59:00 UTC"
 *
 * @example
 * formatDateTimeUTC("2025-10-16T23:59:00Z");
 * // "Oct 16, 2025 23:59:00 UTC"
 */
export function formatDateTimeUTC(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short", // Jan, Feb, Mar...
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }) + " UTC";
}
