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
import { GRADIENT_MAIN_COLOR_TW } from "@/config/variables";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAddress } from "ethers";
import { useForm } from "react-hook-form";
import z from "zod";
import { ButtonSources } from "./ButtonSources";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/variants";

const formSchema = z.object({
  source: z.enum(["galxe", "web"]),
  ethAddress: z.custom<string>(isAddress, "Invalid Address"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function FormCheckAirdrop() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "web",
      ethAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: "easeInOut", delay: 1.6 }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-8"
        >
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ButtonSources
                    value={field.value}
                    setValue={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ethAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`${fontPoppins.className} text-white font-medium text-xl`}
                >
                  Your Address
                </FormLabel>
                <FormControl>
                  <Input
                    className={`${fontPoppins.className} text-[#A8A8A8] font-medium text-base lg:text-2xl border border-gray-500 outline-none`}
                    placeholder="Enter Your Address..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className={`w-full ${fontOrbitron.className} ${GRADIENT_MAIN_COLOR_TW} text-white font-bold text-base py-6`}
            type="submit"
          >
            Check Eligibility
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
