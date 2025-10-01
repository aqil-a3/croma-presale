import { PresaleDb } from "./interface";

export const presaleClientDummy: PresaleDb[] = [
  {
    id: 1,
    created_at: "2025-09-01T10:00:00Z",
    title: "Cromacoin Presale",
    end_at: "2025-10-16T23:59:00Z",
    current_price_usd: 0.04511,
    total_raised: 894723.98,
    target_raised: 2500000,
    is_active: true,
  },
  {
    id: 2,
    created_at: "2025-07-15T08:30:00Z",
    title: "Beta Token Presale",
    end_at: "2025-08-30T23:59:00Z",
    current_price_usd: 0.12,
    total_raised: 500000,
    target_raised: 1000000,
    is_active: false,
  },
];
