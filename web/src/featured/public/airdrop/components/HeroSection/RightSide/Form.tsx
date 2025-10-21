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
import { motion } from "motion/react";
import { fadeUp } from "@/lib/variants";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import axios, { isAxiosError } from "axios";
import { MigrationPresaleDb } from "@/@types/migration";
import { SourceSelect } from "./SourceSelect";
import { EligData } from "./EligData";

const formSchema = z.object({
  source: z.enum([
    "airdrop",
    "brand-ambassador",
    "croma-army",
    "give-away",
    "croma-visionary",
    "croma-og",
    "moderator",
    "all",
  ]),
  ethAddress: z.custom<string>(isAddress, "Invalid Address"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const saveData = async (data: MigrationPresaleDb) => {
  try {
    await axios.post("/api/airdrop/create", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function FormCheckAirdrop() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "all",
      ethAddress: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<MigrationPresaleDb | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setData(null);
      const { data } = await axios.get(
        `/api/airdrop/address/${values.ethAddress}?source=${values.source}`
      );
      toast.success(`Your account found!`);
      setData(data);

      const isHaventBoughtCrm = data.source === "airdrop" && !data.is_valid;
      if (!isHaventBoughtCrm) return;
      await saveData(data);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const data = error.response?.data;

        toast.error(data.message ?? "Something error");
        throw error;
      }
      toast.error("Something error");
      throw error;
    } finally {
      setIsLoading(false);
    }
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
                  <SourceSelect value={field.value} setValue={field.onChange} />
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
                    disabled={isLoading}
                    className={`${fontPoppins.className} text-[#A8A8A8] font-medium text-base lg:text-lg border border-gray-500 outline-none`}
                    placeholder="Enter Your Address..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {data && <EligData data={data} />}
          <Button
            className={`w-full ${fontOrbitron.className} ${GRADIENT_MAIN_COLOR_TW} text-white font-bold text-base py-6`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner /> Checking...
              </>
            ) : (
              "Check Eligibility"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
