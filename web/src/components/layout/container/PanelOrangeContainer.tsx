import { GRADIENT_ORANGE } from "@/config/variables";
import { cn } from "@/lib/utils";

interface PannelOrangeContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PannelOrangeContainer({
  children,
  className,
  ...props
}: PannelOrangeContainerProps) {
  return (
    <div
      style={{ background: GRADIENT_ORANGE }}
      className={cn(
        `border border-orange-500 rounded-2xl backdrop-blur-lg flex flex-col items-center justify-center p-4`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
