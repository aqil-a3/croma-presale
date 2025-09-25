import { PANEL_BG } from "@/config/variables";
import { cn } from "@/lib/utils";

interface PannelContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PannelContainer({
  children,
  className,
  ...props
}: PannelContainerProps) {
  return (
    <div
      style={{ background: PANEL_BG }}
      className={cn(
        "relative rounded-2xl border border-orange-500 p-4 lg:p-8 space-y-4 z-10 backdrop-blur-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
