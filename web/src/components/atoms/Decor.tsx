import { cn } from "@/lib/utils";

interface DecorProps extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
}

export function Decor({ height, width, className }: DecorProps) {
  return (
    <div
      style={{
        width,
        height,
        opacity: 1,
        background: `radial-gradient(35.9% 35.9% at 50% 50%, #E34C01 0%, rgba(16, 32, 43, 0) 100%)`,
      }}
      className={cn("absolute", className)}
    />
  );
}
