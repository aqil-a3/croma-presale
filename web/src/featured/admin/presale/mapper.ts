import { toDatetimeLocalString } from "@/utils/toDatetimeLocalString";
import { PresaleDb } from "./interface";
import { PresaleFormValues } from "./schema";

export function mapDbDataToClienData(raw: PresaleDb): PresaleFormValues {
  return {
    current_price_usd: raw.current_price_usd,
    end_at: toDatetimeLocalString(raw.end_at),
    is_active: raw.is_active,
    next_price_usd: raw.next_price_usd,
    target_raised: raw.target_raised,
    title: raw.title,
    total_raised: raw.total_raised,
  };
}
