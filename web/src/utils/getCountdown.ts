import { CountdownType } from "@/featured/public/home/interface";

/**
 * Hitung countdown dari sekarang sampai target date
 * @param target ISO string atau Date
 * @returns array countdown [Days, Hours, Minutes, Seconds]
 */
export function getCountdown(target: string | Date): CountdownType[] {
  const targetDate = typeof target === "string" ? new Date(target) : target;
  const now = new Date();

  let diff = Math.max(0, targetDate.getTime() - now.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;

  const seconds = Math.floor(diff / 1000);

  return [
    { time: days, label: "Days" },
    { time: hours, label: "Hours" },
    { time: minutes, label: "Minutes" },
    { time: seconds, label: "Seconds" },
  ];
}
