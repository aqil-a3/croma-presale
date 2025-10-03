import z from "zod";

export const faqSchema = z.object({
  title: z.string().min(1, "Wajib diisi"),
  descripntion: z.string().min(1, "Wajib diisi")
});

export type FaqFormValues = z.infer<typeof faqSchema>;
