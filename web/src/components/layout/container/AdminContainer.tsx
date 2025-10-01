import { cn } from "@/lib/utils";

interface AdminContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AdminContainer({
  children,
  className,
  ...props
}: AdminContainerProps) {
  return (
    <div
      className={cn(
        "relative px-2 lg:px-12 py-12 min-h-screen bg-black text-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
