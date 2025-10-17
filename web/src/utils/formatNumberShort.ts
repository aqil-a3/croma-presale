interface Options {
  prefix?: string;
  suffix?: string;
}

export function formatNumberShort(
  num: number | null | undefined,
  config: Options = { prefix: "$", suffix: "+" }
): string {
  if (num == null || isNaN(num)) return `${config.prefix ?? ""}0${config.suffix ?? ""}`;

  const absNum = Math.abs(num);
  const { prefix = "$", suffix = "+" } = config;

  let formatted: string;

  if (absNum >= 1_000_000_000)
    formatted = (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  else if (absNum >= 1_000_000)
    formatted = (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  else if (absNum >= 1_000)
    formatted = (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  else formatted = num.toString();

  return `${prefix}${formatted}${suffix}`;
}
