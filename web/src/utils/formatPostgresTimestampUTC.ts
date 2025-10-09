export function formatPostgresTimestampUTC(timestamp: string, locale: string = "en-US") {
  const dateObj = new Date(timestamp);

  const date = dateObj.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  // Format waktu: "08:09"
  const time = dateObj.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  return { date, time };
}
