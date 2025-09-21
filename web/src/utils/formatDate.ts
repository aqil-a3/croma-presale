/**
 * Format ISO date string atau objek Date menjadi string "YYYY-MM-DD".
 *
 * @param date - Waktu yang ingin diformat (string ISO atau objek Date).
 * @returns Tanggal dalam format "YYYY-MM-DD".
 *
 * @example
 * formatDate("2025-09-15T12:00:00Z"); // "2025-09-15"
 * formatDate(new Date("2025-09-15T12:00:00Z")); // "2025-09-15"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0];
}
