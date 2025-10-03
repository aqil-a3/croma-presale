"use client";

import * as React from "react";
import Image from "next/image";
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

type Option = {
  value: string;
  label: string;
  icon?: string;
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

  const selected = React.useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

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
          {selected?.icon ? (
            <Image
              width={24}
              height={24}
              alt={`${selected.label} Icon`}
              src={selected.icon}
            />
          ) : null}
          <span className="truncate">{selected?.label ?? placeholder}</span>
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
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                  className="gap-2"
                >
                  {opt.icon ? (
                    <Image
                      width={18}
                      height={18}
                      alt={`${opt.label} Icon`}
                      src={opt.icon}
                    />
                  ) : null}
                  <span className="flex-1">{opt.label}</span>
                  <Check
                    className={cn(
                      "h-4 w-4",
                      opt.value === value ? "opacity-100" : "opacity-0"
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
