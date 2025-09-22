import { Decor } from "@/components/atoms/Decor";
import { HorizontalFireImage } from "@/components/atoms/image-decorations/HorizontalFireImage";
import { cn } from "@/lib/utils";

interface DashboardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DashboardContainer({
  children,
  className,
  ...props
}: DashboardContainerProps) {
  return (
    <div className={cn("relative px-40 py-4 min-h-screen bg-black overflow-hidden", className)} {...props}>
      <Decor width={812} height={812} className="top-0 right-0 translate-x-[40%] -translate-y-[40%]" />
        <HorizontalFireImage className="inset-0 bg-cover bg-top bg-fixed opacity-50" />
      {children}
    </div>
  );
}
