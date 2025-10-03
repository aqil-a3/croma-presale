import z from "zod";

export const faqSchema = z.object({
  title: z.string().min(1, "Wajib diisi"),
  description: z.string().min(1, "Wajib diisi")
});

export type FaqFormValues = z.infer<typeof faqSchema>;
