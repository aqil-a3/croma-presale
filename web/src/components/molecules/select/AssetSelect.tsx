"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { TokenIcon } from "@web3icons/react";

// type Option = {
//   name: string;
//   label: string;
//   icon?: string;
// };

type Option = {
  currency: string;
  name: string;
  icon: string;
};

type AssetSelectProps = {
  options: Option[];
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  className?: string;
};

export function AssetSelect({
  options,
  value,
  onChange,
  placeholder = "Select asset",
  className,
}: AssetSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selected = React.useMemo(() => {
    const result = options.find(
      (o) => o.currency.toLowerCase() === value?.toLowerCase()
    );
    return result;
  }, [options, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={cn(
            "bg-[#FFFFFF12] w-[134px] h-12 rounded-2xl gap-2",
            className
          )}
          aria-label="Select asset"
        >
          <TokenIcon
            symbol={selected!.currency.toLowerCase()}
            variant="background"
          />
          <span className="truncate">{selected?.name ?? placeholder}</span>
          <ChevronDown className="ml-auto h-4 w-4 opacity-80" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0 bg-[#FFFFFF12]" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.currency}
                  value={opt.currency}
                  onSelect={() => {
                    onChange?.(opt.currency);
                    setOpen(false);
                  }}
                  className="gap-2"
                >
                  <TokenIcon
                    symbol={opt.currency.toLowerCase()}
                    variant="background"
                  />
                  <span className="flex-1">{opt.name}</span>
                  <Check
                    className={cn(
                      "h-4 w-4",
                      opt.currency === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
