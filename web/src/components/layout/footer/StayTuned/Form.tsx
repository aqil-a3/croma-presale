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
import { mainGradientFont, PANEL_BG } from "@/config/variables";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const stayTunedFormSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
});

type StayTunedFormSchemaType = z.infer<typeof stayTunedFormSchema>;

export function StayTunedForm() {
  const form = useForm<StayTunedFormSchemaType>({
    resolver: zodResolver(stayTunedFormSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  function onSubmit(values: StayTunedFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`${fontPoppins.className} text-white font-medium`}
                >
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    style={{
                      background: PANEL_BG,
                    }}
                    className={`border-none outline-none text-white ${fontPoppins.className}`}
                    placeholder="Your Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`${fontPoppins.className} text-white font-medium`}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    style={{
                      background: PANEL_BG,
                    }}
                    className={`border-none outline-none text-white ${fontPoppins.className}`}
                    placeholder="Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-bold stroke-1 stroke-white" />
              </FormItem>
            )}
          />
        </div>
        <Button variant={"outline"} className="w-full" type="submit">
          <span
            className={`${mainGradientFont} ${fontOrbitron.className} text-lg font-bold`}
          >
            GET UPDATES
          </span>
        </Button>
      </form>
    </Form>
  );
}
