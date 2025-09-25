import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR, PANEL_BG } from "@/config/variables";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const emailSchema = z.object({
  email: z.email(),
});

type EmailSchemaType = z.infer<typeof emailSchema>;

interface Props {
  defaultValues?: EmailSchemaType;
  onSubmit: (values: EmailSchemaType) => void | Promise<void>;
}

export function EmailVerificationForm({ onSubmit, defaultValues }: Props) {
  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    defaultValues: defaultValues ?? { email: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-[80%_auto] gap-2 items-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Your Email..."
                    {...field}
                    style={{ background: PANEL_BG }}
                    className={`${fontPoppins.className} text-sm lg:text-base font-semibold text-white border-gray-600 selection:bg-white selection:text-gray-600`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            style={{ background: GRADIENT_MAIN_COLOR }}
            className={`${fontOrbitron.className} text-base font-semibold px-8`}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
