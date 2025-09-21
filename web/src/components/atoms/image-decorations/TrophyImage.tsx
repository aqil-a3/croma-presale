import { cn } from "@/lib/utils";

export function TrophyImage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute bg-[url('/images/leaderboard/trophy.png')] bg-contain bg-no-repeat bg-center",
        className
      )}
      {...props}
    />
  );
}
