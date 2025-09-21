import { cn } from "@/lib/utils";

export function ShieldReferralImage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute bg-[url('/images/referral/shield-referral.png')] bg-contain bg-no-repeat bg-center",
        className
      )}
      {...props}
    />
  );
}
