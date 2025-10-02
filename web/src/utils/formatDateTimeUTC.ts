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

  const datePart = d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const timePart = d.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return `${datePart} ${timePart} UTC`;
}
