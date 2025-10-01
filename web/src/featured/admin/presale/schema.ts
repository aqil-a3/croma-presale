import z from "zod";

export const presaleSchema = z.object({
  title: z.string().min(3, "Minimal 3 karakter"),
  end_at: z.string().min(1, "Wajib diisi"),
  current_price_usd: z.number().nonnegative("Tidak boleh minus"),
  total_raised: z.number().min(0, "Minimal 0"),
  target_raised: z.number().positive("Harus lebih dari 0"),
  is_active: z.boolean(),
});

export type PresaleFormValues = z.infer<typeof presaleSchema>;
