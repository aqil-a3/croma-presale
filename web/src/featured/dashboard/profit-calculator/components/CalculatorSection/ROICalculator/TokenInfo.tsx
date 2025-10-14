import { fontPoppins } from "@/config/fonts";
import { PANEL_BG } from "@/config/variables";
import { Input } from "@/components/ui/input"; // pastikan path sesuai struktur proyekmu

interface Props {
  title: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  currency: string;
}

export function TokenInfo({ title, value, setValue, currency }: Props) {
  return (
    <div className="space-y-2">
      <p
        className={`${fontPoppins.className} font-medium text-base lg:text-xl`}
      >
        {title}
      </p>

      <div
        style={{ background: PANEL_BG }}
        className="backdrop-blur-3xl border border-gray-600 rounded-2xl py-2 px-4 flex justify-between items-center"
      >
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={`
            ${fontPoppins.className}
            font-bold text-sm lg:text-base text-white
            bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0
            selection:bg-orange-600 
            w-full
          `}
        />

        <p
          className={`${fontPoppins.className} font-bold text-xs lg:text-sm px-4 py-2 bg-[#FFFFFF12] rounded-full border border-gray-600 ml-2`}
        >
          {currency}
        </p>
      </div>
    </div>
  );
}
