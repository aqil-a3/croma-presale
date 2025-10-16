export function formatNumberShort(num: number | null | undefined): string {
  if (num == null || isNaN(num)) return "$0+";

  const absNum = Math.abs(num);

  if (absNum >= 1_000_000_000)
    return `$${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B+`;
  if (absNum >= 1_000_000)
    return `$${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  if (absNum >= 1_000)
    return `$${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K+`;

  return `$${num}+`;
}
