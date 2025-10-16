import z from "zod";

export const presaleSchema = z.object({
  end_at: z.string().min(1, "Wajib diisi"),
  current_price_usd: z.number().nonnegative("Tidak boleh minus"),
  next_price_usd: z.number().nonnegative("Tidak boleh minus"),
  total_raised: z.number().min(0, "Minimal 0"),
  target_raised: z.number().positive("Harus lebih dari 0"),
  phase: z.number().positive(),
  stage: z.number().positive(),
  is_active: z.boolean(),
  global_stage: z.number().positive(),
  crm_sold: z.number().positive(),
  cmc_sold: z.number().positive(),
  potential_value: z.number().positive(),
  headers_count: z.number().positive(),
  crm_allocated: z.number().positive(),
  budget_estimation: z.number().positive(),
  cmc_bonus_per_stage: z.number().positive(),
  cmc_bonus_per_usd: z.number().positive(),
});

export type PresaleFormValues = z.infer<typeof presaleSchema>;
