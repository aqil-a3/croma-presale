import { cn } from "@/lib/utils";

interface MainContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MainContainer({
  children,
  className,
  ...props
}: MainContainerProps) {
  return (
    <div className={cn("px-4 lg:px-40 py-4", className)} {...props}>
      {children}
    </div>
  );
}
