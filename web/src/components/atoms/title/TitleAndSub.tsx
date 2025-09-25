import { fontOrbitron, fontPoppins } from "@/config/fonts";

interface Props {
  title: string;
  sub: string;
}

export function TitleAndSub({ sub, title }: Props) {
  return (
    <div className="space-y-4">
      <h3
        className={`${fontOrbitron.className} text-white font-semibold text-xl lg:text-3xl`}
      >
        {title}
      </h3>
      <p
        className={`${fontPoppins.className} text-[#E9E9E9CC] font-medium text-base lg:text-xl`}
      >
        {sub}
      </p>
    </div>
  );
}
