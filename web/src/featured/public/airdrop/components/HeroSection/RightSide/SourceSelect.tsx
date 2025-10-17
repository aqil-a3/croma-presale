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
    value: "all",
    label: "All",
  },
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
  {
    value: "croma-visionary",
    label: "Croma Visionary",
  },
  {
    value: "croma-og",
    label: "Croma OG",
  },
  {
    value: "moderator",
    label: "Moderator",
  },
];

export function SourceSelect({ setValue, value }: Props) {
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-full border-orange-500" value={value}>
        <SelectValue placeholder="Select your source" />
      </SelectTrigger>
      <SelectContent className="bg-black border-orange-500">
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="focus:bg-orange-500 text-white"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
