import z from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GRADIENT_MAIN_COLOR, PANEL_BG } from "@/config/variables";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { PhoneNumber } from "./PhoneNumber";

const personalInformationSchema = z.object({
  fullName: z.string().min(1, "This field is required"),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  twitterUsername: z.string().min(1, "This field is required"),
  telegramUsername: z.string().min(1, "This field is required"),
});

type PersonalInformationType = z.infer<typeof personalInformationSchema>;

interface Props {
  defaultValues?: PersonalInformationType;
  onSubmit: (values: PersonalInformationType) => void | Promise<void>;
}
export function PersonalInformationForm({ onSubmit, defaultValues }: Props) {
  const form = useForm<PersonalInformationType>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: defaultValues ?? {
      fullName: "",
      phoneNumber: "",
      telegramUsername: "",
      twitterUsername: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Full Name..."
                  {...field}
                  style={{ background: PANEL_BG }}
                  className={`${fontPoppins.className} text-sm lg:text-base font-semibold text-white border-gray-600 selection:bg-white selection:text-gray-600`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneNumber value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="twitterUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X (Twitter) Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Twitter Username..."
                    {...field}
                    style={{ background: PANEL_BG }}
                    className={`${fontPoppins.className} text-sm lg:text-base font-semibold text-white border-gray-600 selection:bg-white selection:text-gray-600`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telegramUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telegram Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Telegram Username..."
                    {...field}
                    style={{ background: PANEL_BG }}
                    className={`${fontPoppins.className} text-sm lg:text-base font-semibold text-white border-gray-600 selection:bg-white selection:text-gray-600`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          style={{ background: GRADIENT_MAIN_COLOR }}
          className={`${fontOrbitron.className} text-base font-semibold px-8 py-6`}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
