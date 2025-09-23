import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { GRADIENT_MAIN_COLOR, PANEL_BG } from "@/config/variables";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const walletSettingSchema = z.object({
  maxInvest: z.string(),
});

type WalletSettingsType = z.infer<typeof walletSettingSchema>;

interface Props {
  defaultValues?: WalletSettingsType;
  onSubmit: (values: WalletSettingsType) => void | Promise<void>;
}

export function WalletSettingsForm({ onSubmit, defaultValues }: Props) {
  const form = useForm<WalletSettingsType>({
    resolver: zodResolver(walletSettingSchema),
    defaultValues: defaultValues ?? { maxInvest: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="maxInvest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Investation</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g 5000"
                  type="number"
                  style={{ background: PANEL_BG }}
                  className={`${fontPoppins.className} font-semibold text-white border-gray-600 selection:bg-white selection:text-gray-600`}
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
      </form>
    </Form>
  );
}
