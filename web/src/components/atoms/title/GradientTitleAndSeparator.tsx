import { Separator } from "@/components/ui/separator";
import { fontPoppins } from "@/config/fonts";
import { mainGradientFont } from "@/config/variables";

interface Props {
  title: string;
}

export function GradientTitleAndSeparator({ title }: Props) {
  return (
    <>
      <h3
        className={`${fontPoppins.className} ${mainGradientFont} text-xl lg:text-2xl font-bold text-center`}
      >
        {title}
      </h3>
      <Separator className="border-gray-600 bg-gray-600" />
    </>
  );
}
