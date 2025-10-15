import { BasicItem } from "@/@types/general";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const items: BasicItem[] = [
  {
    value: "web",
    label: "Web",
  },
  {
    value: "brand-ambassador",
    label: "Brand Ambassador",
  },
  {
    value: "croma-army",
    label: "Croma Army",
  },
  {
    value: "give-away",
    label: "Give Away",
  },
];

export function SourceSelect({ setValue, value }: Props) {
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-full border-orange-500">
        <SelectValue defaultValue={value} />
      </SelectTrigger>
      <SelectContent className="bg-black border-orange-500">
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="focus:bg-orange-500 text-white">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
