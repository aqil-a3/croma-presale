import { cn } from "@/lib/utils";

export function BalloonImage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute bg-[url('/images/background/dashboard/faq-bg.png')] bg-contain bg-no-repeat bg-center",
        className
      )}
      {...props}
    />
  );
}
