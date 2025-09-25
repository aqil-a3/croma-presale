import { Decor } from "@/components/atoms/Decor";
import { HorizontalFireImage } from "@/components/atoms/image-decorations/HorizontalFireImage";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <ScrollArea className="h-screen overflow-x-hidden">
      <div
        className={cn(
          "relative px-2 lg:px-12 py-24 h-full bg-black text-white overflow-hidden",
          className
        )}
        {...props}
      >
        <Decor
          width={812}
          height={812}
          className="top-0 right-0 translate-x-[40%] -translate-y-[40%]"
        />
        <HorizontalFireImage className="inset-0 bg-cover bg-top bg-fixed opacity-50" />
        {children}
      </div>
    </ScrollArea>
  );
}
