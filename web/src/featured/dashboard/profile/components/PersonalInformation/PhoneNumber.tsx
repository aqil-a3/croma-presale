"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PANEL_BG, PANEL_BG_TW } from "@/config/variables";
import { fontPoppins } from "@/config/fonts";
import { US, ID, SG, MY } from "country-flag-icons/react/3x2";

type Country = {
  code: string;
  dial: string;
  flag: React.ReactNode;
  label: string;
};

const COUNTRIES: Country[] = [
  { code: "us", dial: "+1", flag: <US />, label: "United States" },
  { code: "id", dial: "+62", flag: <ID />, label: "Indonesia" },
  { code: "sg", dial: "+65", flag: <SG />, label: "Singapore" },
  { code: "my", dial: "+60", flag: <MY />, label: "Malaysia" },
];

type PhoneNumberProps = {
  /** Nilai penuh, contoh: "+628123456789" */
  value?: string;
  /** Dipanggil saat nilai berubah (dengan dial code) */
  onChange?: (val: string) => void;
  className?: string;
  /** Country default saat value kosong */
  defaultCountry?: Country["code"];
  placeholder?: string;
};

export function PhoneNumber({
  value,
  onChange,
  className,
  defaultCountry = "id",
  placeholder = "8123456789",
}: PhoneNumberProps) {
  // tentukan country dari value (kalau sudah ada dial code)
  const initialCountry =
    COUNTRIES.find((c) => (value ?? "").startsWith(c.dial)) ??
    COUNTRIES.find((c) => c.code === defaultCountry) ??
    COUNTRIES[0];

  const [country, setCountry] = useState<Country>(initialCountry);

  // nomor lokal (tanpa dial)
  const localNumber = useMemo(() => {
    if (!value) return "";
    return value.startsWith(country.dial)
      ? value.slice(country.dial.length)
      : value.replace(/^\+?\d+/, ""); // fallback
  }, [value, country.dial]);

  // jika user ganti country, emit nilai baru dengan dial code
  useEffect(() => {
    if (onChange) {
      const digits = localNumber.replace(/\D/g, "");
      onChange(digits ? `${country.dial}${digits}` : country.dial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country.code]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-2xl border border-gray-600 px-2",
        "h-12",
        className
      )}
      style={{ background: PANEL_BG }}
    >
      {/* Select bendera + dial */}
      <Select
        value={country.code}
        onValueChange={(val) => {
          const next = COUNTRIES.find((c) => c.code === val)!;
          setCountry(next);
        }}
      >
        <SelectTrigger className="w-[110px] border-0 bg-transparent focus:ring-0 focus:outline-none">
          <SelectValue>
            <div
              className={cn(
                "flex items-center gap-2 text-white",
                fontPoppins.className
              )}
            >
              <span className="text-xl leading-none">{country.flag}</span>
              <span className="font-semibold">{country.dial}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className={cn(
            `rounded-2xl border border-gray-600 backdrop-blur-3xl ${PANEL_BG_TW}`,
            `${fontPoppins.className} text-white`
          )}
        >
          {COUNTRIES.map((c) => (
            <SelectItem key={c.code} value={c.code} className="text-white">
              <div className="flex items-center gap-2">
                <span className="text-lg">{c.flag}</span>
                <span className="w-28">{c.label}</span>
                <span className="opacity-80">{c.dial}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Input nomor lokal */}
      <Input
        type="tel"
        inputMode="numeric"
        placeholder={placeholder}
        value={localNumber}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "");
          onChange?.(`${country.dial}${digits}`);
        }}
        className={cn(
          "flex-1 border-0 bg-transparent focus-visible:ring-0 text-white font-semibold selection:bg-white selection:text-gray-600",
          fontPoppins.className
        )}
      />
    </div>
  );
}
