import { cn } from "@/lib/utils";

export function HorizontalFireImage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute bg-[url('/images/background/dashboard/bg-02.png')] bg-contain bg-no-repeat bg-center",
        className
      )}
      {...props}
    />
  );
}
